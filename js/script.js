document.addEventListener('DOMContentLoaded', function () {
    var imagen = document.querySelector('.portada__imagen');
    var portada = document.querySelector('.portada');
    function marcarLista() {
        if (portada) {
            portada.classList.add('portadaLista');
        }
    }
    if (!imagen) {
        marcarLista();
    } else if (imagen.complete && imagen.naturalWidth > 0) {
        marcarLista();
    } else {
        imagen.addEventListener('load', marcarLista);
        imagen.addEventListener('error', marcarLista);
    }

    // --------------- intro y musica --------------------------------------

    var intro = document.querySelector('[dataIntro]');
    var botonIngresar = document.querySelector('[dataIngresar]');
    var musica = document.querySelector('[dataMusica]');
    var botonMusica = document.querySelector('[dataMusicaBoton]');
    var iconoPausa = document.querySelector('[dataiconopausa]');
    var iconoPlay = document.querySelector('[dataiconoplay]');

    if (intro && !intro.classList.contains('introOculta') && intro.style.display !== 'none') {
        document.body.classList.add('introAbierta');
    }

    function mostrarIconoPausa() {
        if (iconoPausa) {
            iconoPausa.classList.remove('musica__oculto');
            iconoPausa.style.display = '';
        }
        if (iconoPlay) {
            iconoPlay.classList.add('musica__oculto');
            iconoPlay.style.display = 'none';
        }
        if (botonMusica) {
            botonMusica.setAttribute('aria-label', 'Pausar música');
        }
    }

    function mostrarIconoPlay() {
        if (iconoPausa) {
            iconoPausa.classList.add('musica__oculto');
            iconoPausa.style.display = 'none';
        }
        if (iconoPlay) {
            iconoPlay.classList.remove('musica__oculto');
            iconoPlay.style.display = '';
        }
        if (botonMusica) {
            botonMusica.setAttribute('aria-label', 'Reproducir música');
        }
    }

    function reproducir() {
        if (!musica) {
            return;
        }
        musica.currentTime = 0;
        var promesa = musica.play();
        if (promesa && typeof promesa.then === 'function') {
            promesa.then(mostrarIconoPausa, mostrarIconoPlay);
        } else {
            mostrarIconoPausa();
        }
    }

    if (botonIngresar) {
        botonIngresar.addEventListener('click', function () {
            if (intro) {
                intro.classList.add('introOculta');
            }
            document.body.classList.remove('introAbierta');
            if (botonMusica) {
                botonMusica.hidden = false;
            }
            reproducir();
        });
    }

    if (botonMusica) {
        botonMusica.addEventListener('click', function () {
            if (!musica) {
                return;
            }
            if (musica.paused || musica.ended) {
                reproducir();
            } else {
                musica.pause();
                mostrarIconoPlay();
            }
        });
    }

    if (musica) {
        musica.addEventListener('play', mostrarIconoPausa);
        musica.addEventListener('pause', mostrarIconoPlay);
        musica.addEventListener('ended', mostrarIconoPlay);
    }

    var elDias = document.querySelector('[dataDias]');
    var elHoras = document.querySelector('[dataHoras]');
    var elMinutos = document.querySelector('[dataMinutos]');
    if (!elDias || !elHoras || !elMinutos) {
        return;
    }
    var meta = new Date(2026, 10, 21, 21, 0, 0);
    function dosCifras(valor) {
        return String(valor).padStart(2, '0');
    }
    function actualizar() {
        var ahora = new Date();
        var diferencia = meta.getTime() - ahora.getTime();
        if (diferencia < 0) {
            diferencia = 0;
        }
        var totalMinutos = Math.floor(diferencia / 60000);
        var dias = Math.floor(totalMinutos / 1440);
        var horas = Math.floor((totalMinutos % 1440) / 60);
        var minutos = totalMinutos % 60;
        elDias.textContent = dosCifras(dias);
        elHoras.textContent = dosCifras(horas);
        elMinutos.textContent = dosCifras(minutos);
    }
    actualizar();
    setInterval(actualizar, 30000);

    var NUMERO = 541128999595;
    var formulario = document.querySelector('[dataPlaylist]');
    if (formulario) {
        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();
            var campoNombre = formulario.querySelector('#playlistNombre');
            var campoTema = formulario.querySelector('#playlistTema');
            var nombre = campoNombre ? campoNombre.value.trim() : '';
            var tema = campoTema ? campoTema.value.trim() : '';
            if (!nombre || !tema) {
                return;
            }
            var mensaje = 'Hola, mi nombre es *' + nombre + '* y mi tema recomendado es:\n' + tema;
            var enlace = 'https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(mensaje);
            window.open(enlace, '_blank', 'noopener');
        });
    }

    var botonCopiar = document.querySelector('[dataCopiar]');
    if (botonCopiar) {
        var textoBoton = botonCopiar.querySelector('[dataCopiarTexto]');
        var textoOriginal = textoBoton ? textoBoton.textContent : '';
        var temporizadorCopiado = null;
        botonCopiar.addEventListener('click', function () {
            var alias = botonCopiar.getAttribute('dataAlias') || '';
            function mostrarCopiado() {
                if (textoBoton) {
                    textoBoton.textContent = 'COPIADO!';
                }
                if (temporizadorCopiado) {
                    clearTimeout(temporizadorCopiado);
                }
                temporizadorCopiado = setTimeout(function () {
                    if (textoBoton) {
                        textoBoton.textContent = textoOriginal;
                    }
                }, 1500);
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(alias).then(mostrarCopiado, mostrarCopiado);
            } else {
                var auxiliar = document.createElement('textarea');
                auxiliar.value = alias;
                document.body.appendChild(auxiliar);
                auxiliar.select();
                try {
                    document.execCommand('copy');
                } catch (error) {}
                document.body.removeChild(auxiliar);
                mostrarCopiado();
            }
        });
    }

    // --------------- confirmacion --------------------------------------

    var NUMEROCONFIRMACION = '541128999595';
    var botonConfirmacion = document.getElementById('btnConfirmacion1');
    if (botonConfirmacion) {
        botonConfirmacion.addEventListener('click', function () {
            var campoNombre = document.getElementById('userFullName');
            var campoMensaje = document.getElementById('customMessage');
            var asistencia = document.querySelector('input[name="attendanceOption"]:checked');
            var userName = campoNombre ? campoNombre.value.trim() : '';
            var userMessage = campoMensaje ? campoMensaje.value.trim() : '';

            if (!asistencia) {
                alert('Por favor, selecciona si asistirás o no.');
                return;
            }

            if (userName === '') {
                alert('Por favor, completa todos los campos antes de enviar.');
                return;
            }

            var alimenticioSeleccionado = document.querySelector('input[name="alimenticioOption"]:checked');
            var restriccionAlimenticia = 'Ninguna';
            if (alimenticioSeleccionado) {
                switch (alimenticioSeleccionado.id) {
                    case 'celiaca':
                        restriccionAlimenticia = 'Celíac@';
                        break;
                    case 'vegetariana':
                        restriccionAlimenticia = 'Vegetarian@';
                        break;
                    case 'hipertesion':
                        restriccionAlimenticia = 'Hipertensión';
                        break;
                    case 'diabetica':
                        restriccionAlimenticia = 'Diabétic@';
                        break;
                    case 'ninguna':
                        restriccionAlimenticia = 'Ninguna';
                        break;
                }
            }

            var mensajeFinal = '*Presencia:* ' + asistencia.value +
                '\n*Nombre y Apellido:* ' + userName +
                '\n*Restricción alimenticia:* ' + restriccionAlimenticia;
            if (userMessage) {
                mensajeFinal += '\n*Mensaje:* ' + userMessage;
            }
            var whatsappLink = 'https://wa.me/' + NUMEROCONFIRMACION + '?text=' + encodeURIComponent(mensajeFinal);

            window.open(whatsappLink, '_blank', 'noopener');

            alert('Mensaje enviado');

            if (campoNombre) {
                campoNombre.value = '';
            }
            if (campoMensaje) {
                campoMensaje.value = '';
            }
            document.querySelectorAll('input[name="attendanceOption"]').forEach(function (radio) {
                radio.checked = false;
            });
            document.querySelectorAll('input[name="alimenticioOption"]').forEach(function (radio) {
                radio.checked = false;
            });
        });
    }
});

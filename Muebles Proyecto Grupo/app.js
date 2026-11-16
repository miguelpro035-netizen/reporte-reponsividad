(function ($) {
  'use strict';

  var S = ' fill="rgba(255,255,255,.7)"';
  var DIBUJO = {
    silla: '<path d="M62 52Q100 40 138 52M66 136L62 52M134 136L138 52M66 148L60 208M134 148L140 208M44 208H156"/><rect x="58" y="136" width="84" height="12"' + S + '/>',
    mesa: '<path d="M58 117V208M142 117V208M58 160H142M44 208H156"/><rect x="24" y="108" width="152" height="9"' + S + '/>',
    sofa: '<path d="M34 174V186M166 174V186"/><rect x="38" y="96" width="124" height="38" rx="3"' + S + '/><rect x="22" y="118" width="26" height="56" rx="3"' + S + '/><rect x="152" y="118" width="26" height="56" rx="3"' + S + '/><rect x="48" y="134" width="104" height="40" rx="2"' + S + '/>',
    escritorio: '<path d="M40 112V208M160 112V208M32 208H48M152 208H168"/><rect x="22" y="106" width="156" height="6"' + S + '/><rect x="108" y="112" width="52" height="34"/>',
    cama: '<path d="M52 158V166M148 158V166M24 176H176"/><rect x="30" y="84" width="140" height="34" rx="2"' + S + '/><rect x="30" y="126" width="140" height="26" rx="2"' + S + '/><rect x="38" y="152" width="124" height="6"/>',
    estante: '<rect x="52" y="36" width="96" height="172"/><path d="M52 82H148M52 128H148M52 168H148M42 208H158"/><rect x="66" y="58" width="16" height="24"' + S + '/><circle cx="116" cy="70" r="12"' + S + '/><rect x="100" y="108" width="34" height="20"' + S + '/><rect x="64" y="146" width="12" height="22"' + S + '/>'
  };

  var MATERIALES = {
    madera: 'Madera certificada FSC',
    metal: 'Metal reciclado',
    fibra: 'Fibra natural',
    piedra: 'Piedra recuperada'
  };
  var CATEGORIAS = ['Sala', 'Comedor', 'Oficina', 'Dormitorio', 'Almacenamiento'];

  var PRODUCTOS = [
    { id: 'silla-kora', nombre: 'Silla Kora', cat: ['Sala', 'Comedor'], mat: 'madera', dibujo: 'silla', tinte: '#DDE6D6', precio: 280,
      materialTxt: 'Roble macizo FSC y lino natural', cert: 'FSC 100 %', co2: 38, ref: 62, rec: 15, reparable: true, fin: 'Desmontable y reparable',
      desc: 'Trazo orgánico esculpido en madera de roble macizo con asiento tapizado en lino natural. Diseñada para integrarse en el espacio sin interrumpir la luz.' },
    { id: 'mesa-voxel', nombre: 'Mesa Voxel', cat: ['Comedor'], mat: 'piedra', dibujo: 'mesa', tinte: '#D6E3EC', precio: 850,
      materialTxt: 'Mármol recuperado y acero reciclado', cert: 'Mármol recuperado de obra', co2: 96, ref: 160, rec: 85, reparable: true, fin: 'Tablero reutilizable; acero reciclable',
      desc: 'Tablero de mármol pulido sostenido por una estructura geométrica de acero mate. Equilibrio puro entre solidez y ligereza visual.' },
    { id: 'sofa-neutra', nombre: 'Sofá Neutra', cat: ['Sala'], mat: 'fibra', dibujo: 'sofa', tinte: '#F2DCC8', precio: 1200,
      materialTxt: 'Algodón orgánico y relleno de fibra reciclada', cert: 'Algodón orgánico GOTS', co2: 140, ref: 215, rec: 45, reparable: false, fin: 'Reciclable por componentes',
      desc: 'Volúmenes bajos y proporciones generosas envueltas en textil boucle texturizado. Confort de perfil arquitectónico para interiores serenos.' },
    { id: 'escritorio-linea', nombre: 'Escritorio Linea', cat: ['Oficina'], mat: 'madera', dibujo: 'escritorio', tinte: '#F0E4BF', precio: 490,
      materialTxt: 'Nogal satinado FSC', cert: 'FSC mixto', co2: 52, ref: 80, rec: 10, reparable: true, fin: 'Desmontable y reparable',
      desc: 'Plano de trabajo en nogal satinado con pasacables oculto y patas de trazo fino. Reducción formal orientada a la concentración diaria.' },
    { id: 'cama-aura', nombre: 'Cama Aura', cat: ['Dormitorio'], mat: 'madera', dibujo: 'cama', tinte: '#EBD6DC', precio: 980,
      materialTxt: 'Madera clara FSC y cabezal de lino', cert: 'FSC 100 %', co2: 85, ref: 130, rec: 20, reparable: true, fin: 'Desmontable y reparable',
      desc: 'Estructura flotante de madera clara con cabezal acolchado de perfil ultradelgado. Calidez táctil y descanso sin artificios.' },
    { id: 'estanteria-vertice', nombre: 'Estantería Vértice', cat: ['Almacenamiento', 'Oficina'], mat: 'metal', dibujo: 'estante', tinte: '#CFE5DD', precio: 620,
      materialTxt: 'Aluminio cepillado con 90 % reciclado', cert: 'Aluminio con 90 % reciclado', co2: 41, ref: 120, rec: 90, reparable: true, fin: 'Modular y reciclable',
      desc: 'Módulo abierto de repisas enrejadas en aluminio cepillado. Estructura modular diseñada para exhibir objetos esenciales con sutileza.' }
  ];

  var POR_ID = Object.create(null);
  $.each(PRODUCTOS, function (_, p) {
    POR_ID[p.id] = p;
    p.indice = norm([p.nombre, p.cat.join(' '), MATERIALES[p.mat], p.materialTxt, p.desc].join(' '));
  });

  var estado = { cat: 'Todas', mat: 'todos', q: '' };
  var tocado = {};
  var reducir = window.matchMedia('(prefers-reduced-motion: reduce)');

  function norm(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function precio(n) {
    return 'Bs ' + n.toLocaleString('en-US');
  }

  function ilustracion(tipo, fondo) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240"><rect width="320" height="240" fill="' + fondo + '"/>' +
      '<g transform="translate(68 5) scale(.92)" fill="none" stroke="#3A3A38" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' + DIBUJO[tipo] + '</g></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function tarjeta(p) {
    var filas = [
      ['Material', p.materialTxt],
      ['Certificación', p.cert],
      ['Huella', p.co2 + ' kg CO₂e (convencional: ' + p.ref + ')'],
      ['Contenido reciclado', p.rec + ' %'],
      ['Fin de vida', p.fin]
    ];
    var $dl = $('<dl>', { 'class': 'ksi-ficha-lista' });
    $.each(filas, function (_, f) {
      $dl.append($('<dt>').text(f[0]), $('<dd>').text(f[1]));
    });

    var fichaId = 'ficha-' + p.id;
    var $media = $('<figure>', { 'class': 'ksi-card-media' }).append($('<img>', {
      src: ilustracion(p.dibujo, p.tinte),
      alt: 'Ilustración de ' + p.nombre,
      width: 320,
      height: 240,
      loading: 'lazy',
      decoding: 'async'
    }));

    var $body = $('<div>', { 'class': 'ksi-card-body' }).append(
      $('<p>', { 'class': 'ksi-card-cat' }).text(p.cat.join(' / ')),
      $('<h3>', { 'class': 'ksi-card-name', title: p.nombre }).text(p.nombre),
      $('<p>', { 'class': 'ksi-card-mat', title: p.materialTxt }).text(p.materialTxt),
      $('<p>', { 'class': 'ksi-card-desc' }).text(p.desc),
      $('<p>', { 'class': 'ksi-card-price' }).text(precio(p.precio)),
      $('<div>', { 'class': 'ksi-card-actions' }).append(
        $('<button>', { type: 'button', 'class': 'ksi-btn ksi-btn-line ksi-btn-sm ksi-ficha-btn', 'aria-expanded': 'false', 'aria-controls': fichaId }).text('Ver ficha'),
        $('<button>', { type: 'button', 'class': 'ksi-btn ksi-btn-sm ksi-cotizar-btn' }).text('Cotizar')
      ),
      $('<div>', { 'class': 'ksi-ficha', id: fichaId }).append($('<div>', { 'class': 'ksi-ficha-in' }).append($dl))
    );

    return $('<li>', { 'class': 'ksi-card', 'data-id': p.id }).append($media, $body);
  }

  function filtrar() {
    var visibles = 0;
    $('#catalogo-grid > li').each(function () {
      var p = POR_ID[$(this).attr('data-id')];
      var ok = (estado.cat === 'Todas' || p.cat.indexOf(estado.cat) > -1) &&
        (estado.mat === 'todos' || p.mat === estado.mat) &&
        (!estado.q || p.indice.indexOf(estado.q) > -1);
      $(this).prop('hidden', !ok);
      if (ok) { visibles++; }
    });
    $('#catalogo-cuenta').text(visibles + (visibles === 1 ? ' pieza' : ' piezas'));
    $('#catalogo-vacio').prop('hidden', visibles > 0);
  }

  function impacto() {
    var co2 = 0, ref = 0, rec = 0, rep = 0;
    $.each(PRODUCTOS, function (_, p) {
      co2 += p.co2;
      ref += p.ref;
      rec += p.rec;
      if (p.reparable) { rep++; }
    });
    var datos = {
      huella: Math.round((1 - co2 / ref) * 100),
      reciclado: Math.round(rec / PRODUCTOS.length),
      reparable: Math.round(rep / PRODUCTOS.length * 100)
    };
    $.each(datos, function (clave, v) {
      var $m = $('[data-meter="' + clave + '"]');
      $m.find('.ksi-meter-value').text(v + ' %');
      $m.find('.ksi-meter-fill').css('width', v + '%');
    });
  }

  var CAMPOS = {
    nombre: function (v) {
      v = v.trim();
      if (!v) { return 'Escribe tu nombre completo.'; }
      if (!/^[\p{L}' -]+$/u.test(v)) { return 'Usa solo letras.'; }
      if (v.split(/\s+/).length < 2) { return 'Falta el apellido. Ej.: María Quispe'; }
      return '';
    },
    correo: function (v) {
      v = v.trim();
      if (!v) { return 'Escribe tu correo electrónico.'; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { return 'Revisa el formato. Ej.: maria@correo.com'; }
      return '';
    },
    pieza: function (v) {
      return POR_ID[v] ? '' : 'Elige una pieza del catálogo.';
    },
    cantidad: function (v) {
      var n = Number(v);
      if (String(v).trim() === '') { return 'Indica la cantidad. Ej.: 2'; }
      if (!Number.isInteger(n) || n < 1 || n > 50) { return 'Debe ser un número entero entre 1 y 50.'; }
      return '';
    },
    mensaje: function (v) {
      var n = v.trim().length;
      if (n < 10) { return 'Escribe al menos 10 caracteres (llevas ' + n + ').'; }
      if (n > 200) { return 'Máximo 200 caracteres (llevas ' + n + ').'; }
      return '';
    }
  };

  function refrescar() {
    var validos = 0;
    var total = Object.keys(CAMPOS).length;
    $.each(CAMPOS, function (clave, validar) {
      var $c = $('[data-campo="' + clave + '"]');
      var $i = $c.find('input, select, textarea');
      var $a = $c.find('.ksi-ayuda');
      var msg = validar($i.val());
      var est = !msg ? 'valido' : (tocado[clave] ? 'invalido' : 'neutro');
      $c.attr('data-estado', est);
      $i.attr('aria-invalid', est === 'invalido' ? 'true' : 'false');
      $a.text(est === 'valido' ? 'Correcto.' : (est === 'invalido' ? msg : $a.data('base')));
      if (!msg) { validos++; }
    });
    $('#cuenta-mensaje').text($('#c-mensaje').val().trim().length + '/200');

    var p = POR_ID[$('#c-pieza').val()];
    var n = Number($('#c-cantidad').val());
    var okCant = !CAMPOS.cantidad($('#c-cantidad').val());
    $('#cot-total').text(p && okCant ? precio(p.precio * n) + ' · ' + (p.co2 * n) + ' kg CO₂e' : '—');
    $('#cot-enviar').prop('disabled', validos < total);
  }

  function irA(id) {
    document.getElementById(id).scrollIntoView({ behavior: reducir.matches ? 'auto' : 'smooth', block: 'start' });
  }

  function menu(abrir) {
    $('#menu').toggleClass('is-open', abrir);
    $('#menu-btn').attr({ 'aria-expanded': String(abrir), 'aria-label': abrir ? 'Cerrar menú' : 'Abrir menú' });
  }

  $(function () {
    var $chips = $('#filtros-cat');
    $.each(['Todas'].concat(CATEGORIAS), function (_, c) {
      $chips.append($('<button>', { type: 'button', 'class': 'ksi-chip', 'data-cat': c, 'aria-pressed': String(c === 'Todas') }).text(c));
    });

    var $mat = $('#filtro-material').append($('<option>', { value: 'todos' }).text('Todos los materiales'));
    $.each(MATERIALES, function (clave, nombre) {
      $mat.append($('<option>', { value: clave }).text(nombre));
    });

    var $grid = $('#catalogo-grid');
    var $pieza = $('#c-pieza').append($('<option>', { value: '' }).text('Elige una pieza'));
    $.each(PRODUCTOS, function (_, p) {
      $grid.append(tarjeta(p));
      $pieza.append($('<option>', { value: p.id }).text(p.nombre));
    });

    $('.ksi-ayuda').each(function () { $(this).data('base', $(this).text()); });

    $grid
      .off('click')
      .on('click', '.ksi-ficha-btn', function () {
        var $c = $(this).closest('.ksi-card');
        var abierto = !$c.hasClass('is-open');
        $c.toggleClass('is-open', abierto);
        $(this).attr('aria-expanded', String(abierto)).text(abierto ? 'Ocultar ficha' : 'Ver ficha');
      })
      .on('click', '.ksi-cotizar-btn', function () {
        $('#c-pieza').val($(this).closest('.ksi-card').attr('data-id'));
        tocado.pieza = true;
        refrescar();
        irA('consulta');
      });

    $chips.off('click').on('click', '.ksi-chip', function () {
      estado.cat = $(this).attr('data-cat');
      $chips.find('.ksi-chip').attr('aria-pressed', 'false');
      $(this).attr('aria-pressed', 'true');
      filtrar();
    });

    $mat.off('change').on('change', function () {
      estado.mat = $(this).val();
      filtrar();
    });

    $('#buscar').off('input').on('input', function () {
      estado.q = norm($(this).val().trim().slice(0, 60));
      filtrar();
    });

    $('#cotizador')
      .off('input change focusout')
      .on('input change focusout', 'input, select, textarea', function () {
        tocado[$(this).attr('name')] = true;
        refrescar();
      });

    $('#cotizador').off('submit').on('submit', function (e) {
      e.preventDefault();
      var primero = null;
      $.each(CAMPOS, function (clave, validar) {
        tocado[clave] = true;
        if (!primero && validar($('#c-' + clave).val())) { primero = clave; }
      });
      refrescar();
      if (primero) {
        $('#c-' + primero).trigger('focus');
        return;
      }
      var p = POR_ID[$('#c-pieza').val()];
      var n = Number($('#c-cantidad').val());
      $('#cot-resultado').prop('hidden', false).text(
        'Solicitud validada de ' + $('#c-nombre').val().trim() + ': ' + n + ' × ' + p.nombre +
        ', total estimado ' + precio(p.precio * n) + '. Contacto: ' + $('#c-correo').val().trim() + '.'
      );
    });

    $('#menu-btn').off('click').on('click', function () {
      menu(!$('#menu').hasClass('is-open'));
    });
    $('#menu').off('click').on('click', 'a', function () {
      menu(false);
    });
    $(document).off('keydown.ksi').on('keydown.ksi', function (e) {
      if (e.key === 'Escape') { menu(false); }
    });

    impacto();
    filtrar();
    refrescar();
  });

  if ('serviceWorker' in navigator) {
    $(window).off('load.ksi').on('load.ksi', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})(jQuery);

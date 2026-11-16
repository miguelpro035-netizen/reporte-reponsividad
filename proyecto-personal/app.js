/* =========================================================
   DATA.JS  ->  TODO lo que vas a personalizar está aquí
   ========================================================= */
window.CONFIG = {

    intervaloMs: 6000,               // tiempo entre fondos del carrusel

    // Si pones un endpoint (Formspree, Apps Script, etc.) el formulario lo usa.
    // Si lo dejas vacío, se abre tu app de correo con el mensaje listo.
    correo: "",
    formEndpoint: "",

    // 4 IMÁGENES DE FONDO (carrusel) + el texto de cada una
    fondos: [
        { img: "panter0.jpeg", titulo: "¡Hola! Soy Miguel Angel",        sub: "Conocido como //Panteras// | Ingeniería en Sistemas - UPDS" },
        { img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=85", titulo: "Tecnología & Creatividad",  sub: "Aprender, crear y superar nuevos desafíos" },
        { img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1800&q=85", titulo: "Pasión por el Fútbol", sub: "Disciplina, estrategia y trabajo en equipo" },
        { img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1800&q=85", titulo: "Música para cada momento",            sub: "Ritmos, canciones y buena energía" }
    ],

    // REDES
    redes: {
        instagram: { user: "@miguelpanteras",     url: "https://www.instagram.com/miguelpanteras?rpxt=bXBjbjlhcGVmOGkx" },
        github:    { user: "miguelpro035-netizen", url: "https://github.com/miguelpro035-netizen" },
        // Google Sheets: url = link para abrir | embed = link de "Publicar en la web" (modo insertar)
        sheets:    { user: "Horario semanal · plantilla",     url: "Horario_Miguel_Angel.xlsx",  embed: "" }
    },

    // VIDEOJUEGOS (cat debe coincidir: Battle Royale, Shooter, MOBA, Sandbox)
    juegos: [
        { n: "EA SPORTS FC 26", cat: "Deportes", img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80", d: "Fútbol, clubes, selecciones y competencia." },
        { n: "eFootball", cat: "Deportes", img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80", d: "Partidos de fútbol y estrategia en cada jugada." },
        { n: "Rocket League", cat: "Deportes", img: "https://images.unsplash.com/photo-1540741711-7e3b1f6b6b2b?auto=format&fit=crop&w=900&q=80", d: "Fútbol arcade con autos y mucha velocidad." },
        { n: "Free Fire", cat: "Battle Royale", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80", d: "Supervivencia, estrategia y partidas rápidas." },
        { n: "Fortnite", cat: "Battle Royale", img: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=900&q=80", d: "Construcción, creatividad y partidas competitivas." },
        { n: "Call of Duty: Warzone", cat: "Shooter", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80", d: "Acción táctica y juego en escuadrones." },
        { n: "Valorant", cat: "Shooter", img: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=900&q=80", d: "Shooter táctico 5 contra 5." },
        { n: "Minecraft", cat: "Sandbox", img: "https://images.unsplash.com/photo-1607513746994-51f730a44832?auto=format&fit=crop&w=900&q=80", d: "Construcción, exploración y creatividad." },
        { n: "GTA V", cat: "Mundo abierto", img: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80", d: "Mundo abierto, conducción y aventuras." },
        { n: "Mobile Legends", cat: "MOBA", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80", d: "Estrategia, roles y batallas por equipos." },
        { n: "League of Legends", cat: "MOBA", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80", d: "Coordinación y estrategia competitiva." }
    ],

    generos: ["Balada", "Pop", "Jazz", "Synth", "Urbano", "Indie", "Rock"]
};

/* ---------- MÚSICA ----------
   S("Título", "link")  ->  link puede ser:
     - un mp3 tuyo:       "musica/blinding-lights.mp3"  (se reproduce dentro de la app)
     - YouTube/Spotify:   "https://..."                 (se abre en pestaña nueva)
     - vacío "":          avisa que falta el link
*/
const S = (t, u = "") => ({ t, u: u || (t ? "https://www.youtube.com/results?search_query=" + encodeURIComponent(t + " official audio") : "") });

// TOP 10 PRINCIPAL  (b = color del badge: azul, gris, cian, negro, rojo, amarillo)
window.TOP10 = [
    { t: "Blinding Lights", a: "The Weeknd", g: "Synthwave 80s", b: "azul", u: "https://www.youtube.com/results?search_query=Blinding%20Lights%20The%20Weeknd%20official%20audio" },
    { t: "El Triste", a: "José José", g: "Balada", b: "gris", u: "https://www.youtube.com/results?search_query=El%20Triste%20Jos%C3%A9%20Jos%C3%A9%20official%20audio" },
    { t: "La Incondicional", a: "Luis Miguel", g: "Pop Latino", b: "gris", u: "https://www.youtube.com/results?search_query=La%20Incondicional%20Luis%20Miguel%20official%20audio" },
    { t: "Billie Jean", a: "Michael Jackson", g: "Pop 80s", b: "azul", u: "https://www.youtube.com/results?search_query=Billie%20Jean%20Michael%20Jackson%20official%20audio" },
    { t: "Treasure", a: "Bruno Mars", g: "Funk / Pop", b: "cian", u: "https://www.youtube.com/results?search_query=Treasure%20Bruno%20Mars%20official%20audio" },
    { t: "Fly Me to the Moon", a: "Frank Sinatra", g: "Jazz", b: "negro", u: "https://www.youtube.com/results?search_query=Fly%20Me%20to%20the%20Moon%20Frank%20Sinatra%20official%20audio" },
    { t: "MEMORIAS", a: "Mora", g: "Urbano", b: "rojo", u: "https://www.youtube.com/results?search_query=MEMORIAS%20Mora%20official%20audio" },
    { t: "San Lucas", a: "Kevin Kaarl", g: "Folk", b: "amarillo", u: "https://www.youtube.com/results?search_query=San%20Lucas%20Kevin%20Kaarl%20official%20audio" },
    { t: "Chachachá", a: "Josean Log", g: "Indie", b: "amarillo", u: "https://www.youtube.com/results?search_query=Chachach%C3%A1%20Josean%20Log%20official%20audio" },
    { t: "Fuentes de Ortiz", a: "Ed Maverick", g: "Folk Rock", b: "amarillo", u: "https://www.youtube.com/results?search_query=Fuentes%20de%20Ortiz%20Ed%20Maverick%20official%20audio" }
];

// ARTISTAS (gen = uno de CONFIG.generos). top = hasta 10 canciones con su link.
window.ARTISTAS = [
    { id: "josejose",   n: "José José",       gen: "Balada", tag: "Balada Romántica", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80",
      top: [S("El Triste"), S("")] },
    { id: "luismiguel", n: "Luis Miguel",     gen: "Balada", tag: "Bolero & Pop",     img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80",
      top: [S("La Incondicional")] },
    { id: "sinatra",    n: "Frank Sinatra",   gen: "Jazz",   tag: "Classic Jazz",     img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80",
      top: [S("Fly Me to the Moon")] },
    { id: "brunomars",  n: "Bruno Mars",      gen: "Pop",    tag: "Pop / Funk",       img: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=700&q=80",
      top: [S("Treasure")] },
    { id: "mjackson",   n: "Michael Jackson", gen: "Pop",    tag: "Rey del Pop",      img: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=700&q=80",
      top: [S("Billie Jean")] },
    { id: "weeknd",     n: "The Weeknd",      gen: "Synth",  tag: "Synthwave",        img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=700&q=80",
      top: [S("Blinding Lights")] },
    { id: "ahadepeche", n: "A-ha & Depeche Mode", gen: "Synth", tag: "Synthpop 80s",  img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=700&q=80",
      top: [S("")] },
    { id: "mora",       n: "Mora",            gen: "Urbano", tag: "Melodic Trap",     img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=700&q=80",
      top: [S("MEMORIAS")] },
    { id: "yanblock",   n: "Yan Block",       gen: "Urbano", tag: "Trap Latino",      img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=700&q=80",
      top: [S("")] },
    { id: "badbunny",   n: "Bad Bunny",       gen: "Urbano", tag: "Urbano",           img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=700&q=80",
      top: [S("")] },
    { id: "kevinkaarl", n: "Kevin Kaarl",     gen: "Indie",  tag: "Folk",             img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80",
      top: [S("San Lucas")] },
    { id: "joseanlog",  n: "Josean Log",      gen: "Indie",  tag: "Indie",            img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80",
      top: [S("Chachachá")] },
    { id: "edmaverick", n: "Ed Maverick",     gen: "Indie",  tag: "Folk Rock",        img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80",
      top: [S("Fuentes de Ortiz")] },
    { id: "queen",      n: "Queen",           gen: "Rock",   tag: "Rock Legendario",  img: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=700&q=80",
      top: [S("")] },
    { id: "soda",       n: "Soda Stereo",     gen: "Rock",   tag: "Rock en Español",  img: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=700&q=80",
      top: [S("")] }
];

/* ===================== LÓGICA DE LA PÁGINA PRINCIPAL ===================== */
/* =========================================================
   SCRIPT.JS  |  jQuery + Delegación de eventos + Hidratación GLOBAL
   Reglas: delegación en document, .off() antes de .on(),
   y NINGÚN botón funciona hasta estar hidratado.
   ========================================================= */
(function ($) {
    "use strict";

    const C = window.CONFIG;
    const $d = $(document);
    const audio = new Audio();
    audio.preload = "none";

    const est = { slide: 0, timer: null, colaId: null, idx: -1, installEv: null, tx: 0, ty: 0, obs: null };

    /* ---------- Selectores de hidratación ---------- */
    // Todo lo "clicable" de la app
    const HID_SEL = 'button, a.btn, a.red-btn, [data-abrir], .lista-top li[data-cola]';
    const conAttr = v => HID_SEL.split(", ").map(s => s + '[data-hidratado="' + v + '"]').join(", ");
    const NO = conAttr("false");                       // aún estáticos
    const ok = s => s + '[data-hidratado="true"]';     // solo hidratados
    const okVarios = arr => arr.map(ok).join(", ");

    const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g,
        m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

    /* ---------- Utilidades ---------- */
    function toast(msg) {
        const $t = $("#toast");
        $t.text(msg).addClass("ver");
        clearTimeout(toast.t);
        toast.t = setTimeout(() => $t.removeClass("ver"), 2400);
    }
    const esAudio = u => /\.(mp3|ogg|wav|m4a|aac|opus)(\?.*)?$/i.test(u);

    // Imágenes que no existen: se ocultan en vez de verse rotas
    document.addEventListener("error", e => {
        if (e.target && e.target.tagName === "IMG") e.target.style.visibility = "hidden";
    }, true);

    /* =========================================================
       HIDRATACIÓN GLOBAL
       ========================================================= */
    function progresoHidratacion() {
        const total = $(HID_SEL).length;
        const hechos = $(HID_SEL).filter('[data-hidratado="true"]').length;
        $("#estadoHidr").text(hechos + "/" + total);
        $("#barraNivel").css("width", total ? Math.round((hechos / total) * 100) + "%" : "0%");
        return { total, hechos };
    }

    // Paso 1: todo nace estático
    function prepararEstatico() {
        $(HID_SEL).not("[data-hidratado]").attr({ "data-hidratado": "false", "aria-busy": "true" });
    }

    // Paso 2: hidratar un elemento (los 2 botones especiales tienen su propia función)
    function hidratarEl(el) {
        if (el.id === "btnPWA" || el.id === "btnPlayer") return;
        const $e = $(el);
        if ($e.attr("data-hidratado") === "true") return;      // ya hidratado
        $e.attr("data-hidratado", "true").removeAttr("aria-busy").addClass("recien-hid");
        if (el.tagName === "LI") $e.attr({ tabindex: 0, role: "button" });
        setTimeout(() => $e.removeClass("recien-hid"), 650);
    }

    function hidratarZona(sel) {
        $(sel).find(HID_SEL).addBack(HID_SEL).each(function () { hidratarEl(this); });
        progresoHidratacion();
    }

    function hidratarPendientes() {
        $(NO).each(function () { hidratarEl(this); });
        progresoHidratacion();
    }

    // Botón especial 1: Menú rápido
    function hidratarMenu() {
        const $box = $("#contenedorMenu");
        if ($box.attr("data-hidratado") === "true") return;
        $("#navRapido").removeAttr("hidden").hide();           // para que slideToggle funcione
        $("#btnPWA").text("☰ Menú Interactivo (Hidratado)")
            .removeClass("btn-estatico").addClass("btn-hidratado")
            .attr("data-hidratado", "true").removeAttr("aria-busy");
        $box.attr("data-hidratado", "true");
        progresoHidratacion();
    }

    // Botón especial 2: Reproductor
    function hidratarReproductor() {
        const $box = $("#contenedorPlayer");
        if ($box.attr("data-hidratado") === "true") return;
        $("#miniPlayer").removeAttr("hidden").hide();
        $("#btnPlayer").text("🎧 Reproductor (Hidratado)")
            .removeClass("btn-estatico").addClass("btn-hidratado")
            .attr("data-hidratado", "true").removeAttr("aria-busy");
        enlazarAudio();
        $box.attr("data-hidratado", "true");
        progresoHidratacion();
    }

    // Contenido creado después (chips, tarjetas, canciones...) se hidrata solo
    function observarDOM() {
        if (!("MutationObserver" in window) || est.obs) return;
        let t = null;
        est.obs = new MutationObserver(muts => {
            let hay = false;
            muts.forEach(m => m.addedNodes.forEach(n => {
                if (n.nodeType !== 1) return;
                const $n = $(n);
                const $h = $n.find(HID_SEL).addBack(HID_SEL).not("[data-hidratado]");
                if ($h.length) { hay = true; $h.attr({ "data-hidratado": "false", "aria-busy": "true" }); }
            }));
            if (!hay) return;
            clearTimeout(t);
            t = setTimeout(hidratarPendientes, 80);
        });
        est.obs.observe(document.body, { childList: true, subtree: true });
    }

    // Hidratación escalonada por zonas
    function iniciarHidratacion() {
        const zonas = [".topbar", ".rail", ".hero-texto, .btn-contacto", ".bottom-nav", ".dock", ".drawer", ".modal"];
        zonas.forEach((z, i) => setTimeout(() => {
            hidratarZona(z);
            if (z === ".dock") { hidratarMenu(); setTimeout(hidratarReproductor, 120); }
            if (i === zonas.length - 1) {
                setTimeout(() => {
                    hidratarPendientes();
                    observarDOM();
                    const p = progresoHidratacion();
                    toast("💧 Hidratación completa: " + p.hechos + "/" + p.total + " botones");
                }, 250);
            }
        }, 250 + i * 120));
    }

    /* ---------- Carrusel de fondo ---------- */
    function construirCarrusel() {
        const $c = $("#carrusel").empty();
        const $dots = $("#dots").empty();
        C.fondos.forEach((f, i) => {
            $("<div>", { class: "bg-slide" })
                .css("background-image", f.img ? 'url("' + f.img + '")' : "none").appendTo($c);
            $("<button>", { class: "dot", type: "button", "data-slide": i, "aria-label": "Imagen " + (i + 1) }).appendTo($dots);
        });
        mostrarSlide(0, true);
        iniciarAuto();
    }

    function mostrarSlide(i, directo) {
        const n = C.fondos.length;
        est.slide = (i + n) % n;
        const f = C.fondos[est.slide];
        $(".bg-slide").removeClass("activo").eq(est.slide).addClass("activo");
        $(".dot").removeClass("activo").eq(est.slide).addClass("activo");
        const $t = $("#hero-texto");
        const poner = () => { $("#capTitulo").text(f.titulo); $("#capSub").text(f.sub); $t.removeClass("cambia"); };
        if (directo) return poner();
        $t.addClass("cambia");
        setTimeout(poner, 250);
    }

    function iniciarAuto() { detenerAuto(); est.timer = setInterval(() => mostrarSlide(est.slide + 1), C.intervaloMs); }
    function detenerAuto() { clearInterval(est.timer); }

    /* ---------- Modales y menú ---------- */
    function marcarNav(id) {
        $(".bottom-nav button").removeClass("activo");
        if (id) $('.bottom-nav [data-nav="' + id + '"]').addClass("activo");
    }

    function abrirModal(id, apilar) {
        if (!apilar) { $(".modal.abierto").removeClass("abierto").attr("aria-hidden", "true"); }
        cerrarDrawer();
        if (id === "modal-horario") cargarHorario();
        $("#" + id).addClass("abierto").attr("aria-hidden", "false");
        marcarNav(id);
        if (!apilar) toggleDock(false);
    }

    function cerrarModal($m) {
        $m.removeClass("abierto").attr("aria-hidden", "true");
        if (!$(".modal.abierto").length) marcarNav(null);
    }

    function abrirDrawer() { $("#drawer, #drawerFondo").addClass("abierto"); $("#drawer").attr("aria-hidden", "false"); }
    function cerrarDrawer() { $("#drawer, #drawerFondo").removeClass("abierto"); $("#drawer").attr("aria-hidden", "true"); }

    function toggleDock(forzar) {
        const abrir = typeof forzar === "boolean" ? forzar : !$("#dock").hasClass("abierto");
        $("#dock").toggleClass("abierto", abrir);
        $("#dockToggle").attr("aria-expanded", abrir);
        $('[data-nav="redes"]').toggleClass("activo", abrir);
    }

    /* ---------- Tema ---------- */
    function aplicarTema(t) {
        $("html").attr("data-tema", t);
        $('meta[name="theme-color"]').attr("content", t === "claro" ? "#eef2fa" : "#0a1020");
    }
    function cargarTema() {
        let t = "oscuro";
        try { t = localStorage.getItem("tema") || "oscuro"; } catch (e) {}
        aplicarTema(t);
    }
    function cambiarTema() {
        const t = $("html").attr("data-tema") === "claro" ? "oscuro" : "claro";
        aplicarTema(t);
        try { localStorage.setItem("tema", t); } catch (e) {}
        toast("Tema " + t);
    }

    /* ---------- Redes y horario ---------- */
    function cargarRedes() {
        ["instagram", "github", "sheets"].forEach(k => {
            const r = C.redes[k];
            $('[data-red="' + k + '"]').attr("href", r.url || "#");
            $('[data-red-user="' + k + '"]').text(r.user);
        });
        $("#avatarImg, #perfilImg").attr("src", C.avatar || "panter0.jpeg");
    }

    function cargarHorario() {
        const $f = $("#frameHorario");
        if ($f.attr("src") || $(".aviso-sheet").length) return;
        if (C.redes.sheets.embed) { $f.attr("src", C.redes.sheets.embed); }
        else {
            $f.hide().after('<div class="aviso-sheet"><h4>Mi semana · UPDS y tiempo personal</h4><p>Plantilla inicial editable. Descarga el Excel y súbelo a Google Drive para abrirlo como Google Sheets.</p><a class="btn azul" href="Horario_Miguel_Angel.xlsx" download><i class="fa-solid fa-file-excel"></i> Descargar horario editable</a><div class="tabla-horario"><table><thead><tr><th>Día</th><th>Mañana</th><th>Tarde</th><th>Noche</th></tr></thead><tbody><tr><td>Lunes a viernes</td><td>Clases / estudio</td><td>Universidad y tareas</td><td>Repaso y descanso</td></tr><tr><td>Sábado</td><td>Proyectos personales</td><td>Fútbol / recreación</td><td>Música y amigos</td></tr><tr><td>Domingo</td><td>Descanso</td><td>Organizar la semana</td><td>Preparar clases</td></tr></tbody></table></div></div>');
        }
    }

    /* ---------- Videojuegos ---------- */
    function renderJuegos(cat) {
        cat = cat || "Todos";
        const cats = ["Todos"].concat([...new Set(C.juegos.map(j => j.cat))]);
        $("#filtroJuegos").html(cats.map(c =>
            '<button type="button" class="chip' + (c === cat ? " activo" : "") + '" data-juego-cat="' + esc(c) + '">' + esc(c) + "</button>").join(""));
        const lista = C.juegos.filter(j => cat === "Todos" || j.cat === cat);
        $("#listaJuegos").html(lista.map(j =>
            '<article class="juego"><img src="' + esc(j.img) + '" alt="' + esc(j.n) + '" loading="lazy">' +
            '<div class="juego-info"><h4>' + esc(j.n) + '</h4><span class="tag">' + esc(j.cat) + "</span><p>" + esc(j.d) + "</p></div></article>").join(""));
    }

    /* ---------- Música ---------- */
    function colaDe(id) {
        if (id === "main") return window.TOP10;
        const a = window.ARTISTAS.find(x => "a_" + x.id === id);
        return a ? a.top.map(s => ({ t: s.t, a: a.n, u: s.u })) : [];
    }

    function renderTop10() {
        $("#top10Lista").html(window.TOP10.map((s, i) =>
            '<li data-cola="main" data-i="' + i + '"><span class="n">' + (i + 1) + '.</span>' +
            '<span class="t"><b>' + esc(s.t) + "</b> - " + esc(s.a) + "</span>" +
            '<span class="badge b-' + esc(s.b) + '">' + esc(s.g) + "</span></li>").join(""));
        marcarSonando();
    }

    function renderArtistas(gen) {
        gen = gen || "Todos";
        const gens = ["Todos"].concat(C.generos);
        $("#filtroArtistas").html(gens.map(g =>
            '<button type="button" class="chip' + (g === gen ? " activo" : "") + '" data-gen="' + esc(g) + '">' + esc(g) + "</button>").join(""));
        const lista = window.ARTISTAS.filter(a => gen === "Todos" || a.gen === gen);
        $("#gridArtistas").html(lista.length ? lista.map(a =>
            '<article class="artista"><img src="' + esc(a.img) + '" alt="' + esc(a.n) + '" loading="lazy">' +
            "<h5>" + esc(a.n) + '</h5><span class="tag">' + esc(a.tag) + "</span>" +
            '<button type="button" class="ver-top" data-top="' + esc(a.id) + '"><i class="fa-solid fa-list-ol"></i> Ver Top 10</button></article>').join("")
            : '<p class="vacio-msg">Sin artistas en este género todavía.</p>');
    }

    function abrirTopArtista(id) {
        const a = window.ARTISTAS.find(x => x.id === id);
        if (!a) return;
        $("#top10Titulo").text("TOP 10 · " + a.n.toUpperCase());
        let html = "";
        for (let i = 0; i < 10; i++) {
            const s = a.top[i];
            if (s && s.t) {
                html += '<li data-cola="a_' + esc(a.id) + '" data-i="' + i + '"><span class="n">' + (i + 1) + '.</span><span class="t"><b>' +
                    esc(s.t) + '</b></span><span class="eq"></span><i class="fa-solid fa-play"></i></li>';
            } else {
                html += '<li class="vacio"><span class="n">' + (i + 1) + '.</span><span class="t">Canción #' + (i + 1) + " (agrégala en data.js)</span></li>";
            }
        }
        $("#top10Cuerpo").html(html);
        marcarSonando();
        abrirModal("modal-top10", true);
    }

    function reproducir(colaId, i) {
        const cola = colaDe(colaId);
        const s = cola[i];
        if (!s) return;
        est.colaId = colaId; est.idx = i;
        $("#mpTitulo").text(s.t + (s.a ? " - " + s.a : ""));
        if (!s.u) { audio.pause(); marcarSonando(); return toast("Agrega el link de «" + s.t + "» en data.js"); }
        if (esAudio(s.u)) {
            audio.src = s.u;
            audio.play().catch(() => toast("No se pudo reproducir el archivo"));
        } else {
            audio.pause();
            window.open(s.u, "_blank", "noopener");
            toast("Abriendo «" + s.t + "»");
        }
        marcarSonando();
    }

    function siguiente(paso) {
        const cola = colaDe(est.colaId || "main");
        if (!cola.length) return;
        let i = (est.idx < 0 ? 0 : est.idx) + paso;
        let intentos = cola.length;
        while (intentos-- > 0) {                 // salta canciones vacías
            i = (i + cola.length) % cola.length;
            if (cola[i] && cola[i].t) break;
            i += paso;
        }
        reproducir(est.colaId || "main", i);
    }

    function marcarSonando() {
        $(".lista-top li").removeClass("sonando").find(".eq").html("");
        if (est.colaId == null) return;
        const $li = $('.lista-top li[data-cola="' + est.colaId + '"][data-i="' + est.idx + '"]').addClass("sonando");
        if (!audio.paused) $li.find(".eq").html('<i class="fa-solid fa-volume-high"></i>');
    }

    function icoPlay() {
        $("#mpPlay i").attr("class", audio.paused ? "fa-solid fa-play" : "fa-solid fa-pause");
        marcarSonando();
    }

    function enlazarAudio() {
        $(audio).off(".app")
            .on("play.app pause.app", icoPlay)
            .on("ended.app", () => siguiente(1))
            .on("timeupdate.app", () => {
                if (audio.duration) $("#mpSeek").val((audio.currentTime / audio.duration) * 100);
            });
    }

    /* ---------- Formulario ---------- */
    const reglas = {
        nombre:    v => v.trim().length >= 2 ? "" : "Escribe tu nombre (mín. 2 letras).",
        apellidos: v => v.trim().length >= 2 ? "" : "Escribe tus apellidos.",
        correo:    v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Correo no válido.",
        telefono:  v => /^\+?[0-9\s-]{7,16}$/.test(v.trim()) ? "" : "Teléfono no válido (ej: +591 71234567).",
        ciudad:    v => v.trim().length >= 3 ? "" : "Indica tu ciudad / país.",
        motivo:    v => v ? "" : "Selecciona un motivo.",
        asunto:    v => v.trim().length >= 4 ? "" : "El asunto es muy corto.",
        mensaje:   v => v.trim().length >= 10 ? "" : "Escribe al menos 10 caracteres."
    };

    function validarCampo(id) {
        const $i = $("#" + id), $c = $i.closest(".campo");
        let err = "";
        if (id === "acepto") err = $i.is(":checked") ? "" : "Debes aceptar para continuar.";
        else if (reglas[id]) err = reglas[id]($i.val());
        $c.toggleClass("invalido", !!err).toggleClass("valido", !err);
        $c.find(".error").text(err);
        return !err;
    }

    function limpiarForm() {
        $("#formContacto")[0].reset();
        $(".campo").removeClass("valido invalido").find(".error").text("");
        $("#contador").text("0/500");
        $("#respuestaForm").attr("class", "respuesta").text("");
    }

    function enviarForm(e) {
        e.preventDefault();
        if ($("#formContacto [type=submit]").attr("data-hidratado") !== "true") return toast("💧 Hidratando botones… un segundo");
        const campos = Object.keys(reglas).concat("acepto");
        const valido = campos.map(validarCampo).every(Boolean);
        const $r = $("#respuestaForm");
        if (!valido) {
            $r.attr("class", "respuesta mal").text("Revisa los campos marcados en rojo.");
            $(".campo.invalido").first().find("input,select,textarea").trigger("focus");
            return;
        }
        const datos = {};
        Object.keys(reglas).forEach(k => datos[k] = $("#" + k).val().trim());
        datos.asunto = $("#asunto").val().trim();

        if (!navigator.onLine) {
            guardarParaSincronizar(datos);
            limpiarForm();
            $r.attr("class", "respuesta ok").text("Guardado localmente. Pendiente de sincronización al recuperar la conexión.");
            return;
        }
        if (C.formEndpoint) {
            fetch(C.formEndpoint, { method:"POST", headers:{"Content-Type":"application/json","Accept":"application/json"}, body:JSON.stringify(datos) })
              .then(r => { if(!r.ok) throw new Error("HTTP"); limpiarForm(); $r.attr("class","respuesta ok").text("¡Mensaje enviado! Gracias, "+datos.nombre+"."); })
              .catch(() => { guardarParaSincronizar(datos); $r.attr("class","respuesta ok").text("No se pudo contactar al servidor. Mensaje guardado localmente para reintentar."); });
        } else {
            const cuerpo = "Nombre: "+datos.nombre+" "+datos.apellidos+"\\nCorreo: "+datos.correo+"\\nTeléfono: "+datos.telefono+"\\nCiudad/País: "+datos.ciudad+"\\nMotivo: "+datos.motivo+"\\n\\n"+datos.mensaje;
            window.location.href = "mailto:"+C.correo+"?subject="+encodeURIComponent(datos.asunto)+"&body="+encodeURIComponent(cuerpo);
            $r.attr("class","respuesta ok").text("Abriendo tu app de correo con el mensaje listo...");
        }
    }

    // Cola local persistente para formularios pendientes.
    const CLAVE_COLA_OFFLINE = "pwa_contactos_pendientes_v1";
    function leerColaOffline() {
        try { return JSON.parse(localStorage.getItem(CLAVE_COLA_OFFLINE) || "[]"); } catch(e) { return []; }
    }
    function guardarColaOffline(cola) {
        try { localStorage.setItem(CLAVE_COLA_OFFLINE,JSON.stringify(cola)); } catch(e) { console.warn("No se pudo guardar la cola local",e); }
        actualizarEstadoRed();
    }
    function guardarParaSincronizar(datos) {
        const cola=leerColaOffline();
        cola.push(Object.assign({},datos,{fechaGuardado:new Date().toISOString()}));
        guardarColaOffline(cola);
        if ("serviceWorker" in navigator) navigator.serviceWorker.ready.then(reg => {
            if ("sync" in reg) reg.sync.register("sincronizar-contactos").catch(()=>{});
        }).catch(()=>{});
    }
    async function sincronizarColaOffline() {
        if (!navigator.onLine || !C.formEndpoint) { actualizarEstadoRed(); return; }
        const cola=leerColaOffline(); if(!cola.length) { actualizarEstadoRed(); return; }
        const pendientes=[];
        for(const item of cola) {
            try {
                const r=await fetch(C.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(item)});
                if(!r.ok) throw new Error("HTTP");
            } catch(e) { pendientes.push(item); }
        }
        guardarColaOffline(pendientes);
        if(cola.length>pendientes.length) toast("✓ Mensajes pendientes sincronizados.");
    }
    function actualizarEstadoRed() {
        const n=leerColaOffline().length;
        $("#estadoRed").text((navigator.onLine ? "● En línea" : "● Sin conexión · modo offline")+(n ? " · "+n+" pendiente(s)" : ""));
    }

    /* =========================================================
       EVENTOS: delegación en document (Event Bubbling)
       .off(".app") ANTES de .on()  ->  sin listeners duplicados
       ========================================================= */
    function bindEventos() {
        $d.off(".app");

        // 1) Botón todavía estático: no hace nada, avisa
        $d.on("click.app", NO, function (e) {
            e.preventDefault();
            toast("💧 Hidratando botones… un segundo");
        });

        // 2) Solo elementos HIDRATADOS ejecutan su función
        $d.on("click.app", ok("[data-abrir]"), function () { abrirModal($(this).data("abrir")); });
        $d.on("click.app", ok("[data-cerrar]"), function () { cerrarModal($(this).closest(".modal")); });
        $d.on("click.app", ".modal", function (e) { if (e.target === this) cerrarModal($(this)); });

        $d.on("keydown.app", function (e) {
            if (e.key !== "Escape") return;
            const $m = $(".modal.abierto").last();
            if ($m.length) cerrarModal($m); else { cerrarDrawer(); toggleDock(false); }
        });

        $d.on("click.app", ok("#btnMenu"), abrirDrawer);
        $d.on("click.app", ok("#btnCerrarDrawer"), cerrarDrawer);
        $d.on("click.app", "#drawerFondo", cerrarDrawer);
        $d.on("click.app", okVarios(["#dockToggle", "#btnRedes"]), function () { toggleDock(); });
        $d.on("click.app", ok("#btnTema"), cambiarTema);

        // Botones de hidratación especiales
        $d.on("click.app", ok("#btnPWA"), function () { $("#navRapido").slideToggle(300); });
        $d.on("click.app", ok("#btnPlayer"), function () { $("#miniPlayer").slideToggle(300); });

        // Mini reproductor
        $d.on("click.app", ok("#mpPlay"), function () {
            if (est.colaId == null) return reproducir("main", 0);
            if (audio.paused && audio.src) audio.play().catch(() => {}); else audio.pause();
            });
        $d.on("click.app", ok("#mpPrev"), function () { siguiente(-1); });
        $d.on("click.app", ok("#mpNext"), function () { siguiente(1); });
        $d.on("input.app", "#mpSeek", function () {
            if (audio.duration) audio.currentTime = (this.value / 100) * audio.duration;
        });

        // Carrusel
        $d.on("click.app", ok(".dot"), function () { mostrarSlide($(this).data("slide")); iniciarAuto(); });
        $d.on("touchstart.app", function (e) {
            const t = e.originalEvent.touches[0]; est.tx = t.clientX; est.ty = t.clientY;
        });
        $d.on("touchend.app", function (e) {
            if ($(e.target).closest(".modal,.drawer,.dock,.bottom-nav,.btn-contacto,.rail,.topbar").length) return;
            const t = e.originalEvent.changedTouches[0];
            const dx = t.clientX - est.tx, dy = t.clientY - est.ty;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) { mostrarSlide(est.slide + (dx < 0 ? 1 : -1)); iniciarAuto(); }
        });
        $d.on("visibilitychange.app", function () { document.hidden ? detenerAuto() : iniciarAuto(); });

        // Filtros (contenido dinámico: la delegación los cubre aunque se redibujen)
        $d.on("click.app", ok("[data-juego-cat]"), function () { renderJuegos($(this).data("juego-cat")); });
        $d.on("click.app", ok("[data-gen]"), function () { renderArtistas($(this).data("gen")); });
        $d.on("click.app", ok("[data-top]"), function () { abrirTopArtista($(this).data("top")); });

        // Canciones
        $d.on("click.app", ok(".lista-top li[data-cola]"), function () {
            reproducir($(this).data("cola"), Number($(this).data("i")));
        });
        $d.on("keydown.app", ok(".lista-top li[data-cola]"), function (e) {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); $(this).trigger("click"); }
        });

        // Formulario
        $d.on("input.app change.app blur.app", "#formContacto input, #formContacto select, #formContacto textarea", function () {
            if (this.id) validarCampo(this.id);
        });
        $d.on("input.app", "#mensaje", function () { $("#contador").text(this.value.length + "/500"); });
        $d.on("submit.app", "#formContacto", enviarForm);
        $d.on("click.app", ok("#btnLimpiar"), limpiarForm);

        // PWA
        $d.on("click.app", ok("#btnInstalar"), function () {
            if (!est.installEv) return;
            est.installEv.prompt();
            est.installEv.userChoice.finally(() => { est.installEv = null; $("#btnInstalar").prop("hidden", true); });
        });
    }

    /* ---------- PWA ---------- */
    function estadoRed() { actualizarEstadoRed(); }

    function iniciarPWA() {
        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault(); est.installEv = e; $("#btnInstalar").prop("hidden", false);
        });
        window.addEventListener("appinstalled", () => toast("¡App instalada!"));
        window.addEventListener("online", () => { estadoRed(); sincronizarColaOffline(); });
        window.addEventListener("offline", estadoRed);
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener("message", event => {
                if (event.data && event.data.tipo === "SOLICITAR_SINCRONIZACION") sincronizarColaOffline();
            });
        }
        estadoRed();
        sincronizarColaOffline();
    }

    /* ---------- INICIO ---------- */
    $(function () {
        cargarTema();
        cargarRedes();
        construirCarrusel();
        renderJuegos();
        renderTop10();
        renderArtistas();
        prepararEstatico();        // 1) todo nace estático
        progresoHidratacion();
        bindEventos();             // 2) delegación en document
        iniciarPWA();
        iniciarHidratacion();      // 3) JS hidrata zona por zona
    });

})(jQuery);


/* ===================== DIAGNÓSTICO: EVENT BUBBLING + HIDRATACIÓN ===================== */
(function ($) {
    "use strict";
    $(function () {
        const $root = $("#diagnosticoApp");
        if (!$root.length) return;

        // La página de diagnóstico también queda dentro del alcance de la PWA.
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("sw.js").catch(err => console.warn("SW:", err));
        }

        let hidratado = false;
        const $estado = $("#estadoDemo");
        const $lista = $("#listaDemo");
        let contador = 0;

        // Delegación: un solo listener en el contenedor padre captura eventos
        // de elementos hijos actuales y también de los que se agreguen después.
        $root.off(".diagnostico");
        $root.on("click.diagnostico", "#btnDemoHidratar", function () {
            hidratado = true;
            $(this).attr("data-hidratado", "true").text("✓ Interfaz hidratada");
            $estado.text("Estado: HIDRATADO").removeClass("estado-estatico").addClass("estado-hidratado");
            $("#btnAgregarDemo").prop("disabled", false);
        });
        $root.on("click.diagnostico", ".tarjeta-demo", function (e) {
            if (!hidratado) {
                $estado.text("Primero hidrata la interfaz para activar las tarjetas.");
                return;
            }
            $("#salidaBubbling").text("Evento capturado por delegación en el contenedor. Elemento: " + $(e.target).closest(".tarjeta-demo").text().trim());
        });
        $root.on("click.diagnostico", "#btnAgregarDemo", function () {
            if (!hidratado) return;
            contador++;
            $("<button>", {
                type: "button",
                class: "tarjeta-demo",
                text: "Elemento dinámico " + contador
            }).appendTo($lista);
        });

        // Analizador básico del HTML pegado por el estudiante.
        $("#btnAnalizar").on("click.diagnostico", function () {
            const codigo = $("#codigoEntrada").val();
            const errores = [];
            const avisos = [];
            if (!codigo.trim()) {
                $("#resultadoAnalisis").html('<p class="resultado-aviso">Pega un fragmento HTML para comenzar el análisis.</p>');
                return;
            }
            if (!/<meta\s+[^>]*name=["']viewport["']/i.test(codigo)) avisos.push("No se detectó la etiqueta meta viewport.");
            const ids = [...codigo.matchAll(/\bid=["']([^"']+)["']/gi)].map(m => m[1]);
            const duplicados = ids.filter((id, i) => ids.indexOf(id) !== i);
            if (duplicados.length) errores.push("IDs duplicados: " + [...new Set(duplicados)].join(", "));
            const clasesBloqueadas = ["ad-banner", "promo-box", "social-ads"];
            const encontradas = clasesBloqueadas.filter(c => new RegExp("class=[\\\"'][^\\\"']*\\b" + c + "\\b", "i").test(codigo));
            if (encontradas.length) avisos.push("Clases que pueden ser afectadas por bloqueadores: " + encontradas.join(", "));
            if (!/<\/?[a-z][\s\S]*>/i.test(codigo)) errores.push("No se reconocieron etiquetas HTML.");
            const estado = errores.length ? "REVISAR" : avisos.length ? "ACEPTABLE CON AVISOS" : "EXCELENTE";
            let html = '<div class="resumen-analisis"><strong>Resultado: ' + estado + '</strong><span>' + errores.length + ' error(es) · ' + avisos.length + ' aviso(s)</span></div>';
            errores.forEach(x => html += '<p class="resultado-error">✖ ' + escapeHTML(x) + '</p>');
            avisos.forEach(x => html += '<p class="resultado-aviso">⚠ ' + escapeHTML(x) + '</p>');
            if (!errores.length && !avisos.length) html += '<p class="resultado-ok">✓ No se detectaron problemas en las comprobaciones básicas.</p>';
            $("#resultadoAnalisis").html(html);
        });
        function escapeHTML(s) {
            return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
        }
    });
})(jQuery);

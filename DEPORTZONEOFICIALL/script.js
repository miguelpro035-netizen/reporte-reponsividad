/* ============================================
   DEPORZONE LA PAZ
   DISEÑO WEB II - UPDS 2026
============================================ */

$(document).ready(function () {

    let selectedSport = "";
    let selectedCourt = "";
    let selectedTime = "";
    let selectedPrice = 0;

    let reservations = [];
    let occupiedSlots = {};

    let clickCount = 0;
    let clickTimer = null;

    // CATÁLOGO: se llena de forma asíncrona desde data/canchas.json
    // (formato: {id, nombre, deporte, precio, ...}). Internamente se
    // normaliza a {name, sport, price} para el resto de la lógica.

    let courts = [];

    const sports = {
        futsal:"Futsal",
        wally:"Wally",
        voley:"Vóley",
        basquet:"Básquet",
        tenis:"Tenis"
    };

    // FECHA ACTUAL

    const today = new Date();

    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    $("#reservationDate, #selectedDate")
        .attr("min", localDate)
        .val(localDate);

    populateCourtOptions();


    // 0. CATÁLOGO ASÍNCRONO (Fetch API + Lazy Loading)

    const $grid = $("#courtsGrid");

    function escapeHtml(text) {

        return String(text).replace(/[&<>"']/g, function (ch) {
            return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch];
        });

    }

    function buildCard(item) {

        const sportName = sports[item.deporte] || item.deporte;

        return `
        <article class="court-card" data-id="${item.id}"
            data-sport="${item.deporte}" data-price="${item.precio}"
            data-name="${escapeHtml(item.nombre)}">
            <div class="court-image ${item.deporte}-image">
                <img src="${item.portada}" alt="Portada de ${escapeHtml(item.nombre)}"
                    loading="lazy" decoding="async" width="400" height="180">
                <label>${escapeHtml(item.etiqueta)}</label>
            </div>
            <div class="court-info">
                <span class="sport-label">${sportName.toUpperCase()}</span>
                <h3>${escapeHtml(item.nombre)}</h3>
                <p>${escapeHtml(item.descripcion)}</p>
                <div class="court-details">
                    <span>👥 ${escapeHtml(item.jugadores)}</span>
                    <span>${escapeHtml(item.extra)}</span>
                </div>
                <div class="price-row">
                    <strong>Bs ${item.precio}</strong><small>/ hora</small>
                </div>
                <button class="details-button">Ver detalles ↓</button>
                <div class="accordion-content">
                    <p><b>Superficie:</b> ${escapeHtml(item.superficie)}</p>
                    <p><b>Servicios:</b> ${escapeHtml(item.servicios)}</p>
                    <p><b>${escapeHtml(item.capacidadEtiqueta)}:</b> ${escapeHtml(item.capacidad)}</p>
                </div>
                <button class="info-button">ℹ️ Más información</button>
                <button class="reserve-button">Seleccionar cancha →</button>
            </div>
        </article>`;

    }

    function renderCatalog(data) {

        // Se construye todo el HTML en memoria y se inyecta una sola vez
        let html = "";

        data.forEach(function (item) {
            html += buildCard(item);
        });

        $grid.html(html).attr("aria-busy", "false");

        $("#statCourts").text(String(data.length).padStart(2, "0"));

        // Entrada escalonada suave (CSS, no interfiere con fadeIn/fadeOut)
        $(".court-card").each(function (index) {
            this.style.animationDelay = Math.min(index, 8) * 70 + "ms";
        });

    }


    function showCatalogError(message) {

        $grid.attr("aria-busy", "false").html(
            '<div class="catalog-status catalog-error">' +
            '<p>' + escapeHtml(message) + '</p>' +
            '<button type="button" id="retryCatalog" class="primary-button">' +
            'Reintentar</button></div>'
        );

    }

    function loadCatalog() {

        $grid.attr("aria-busy", "true").html(
            '<p class="catalog-status">Cargando catálogo de canchas…</p>'
        );

        // Consumo asíncrono con Fetch API nativo
        fetch("data/canchas.json")
            .then(function (response) {
                if (!response.ok) throw new Error("Error al cargar repertorio de canchas (" + response.status + ")");
                return response.json();
            })
            .then(function (data) {

                courts = data.map(function (item) {
                    return { name: item.nombre, sport: item.deporte, price: item.precio };
                });

                populateCourtOptions($("#selectedSport").val());
                renderCatalog(data);
                applyFilters();

            })
            .catch(function (err) {
                console.error("Fallo en catálogo:", err);
                showCatalogError(
                    "No se pudo cargar el catálogo. Abre el sitio desde un servidor " +
                    "(GitHub Pages o Live Server) y revisa tu conexión."
                );
            });

    }

    // Delegación: el botón "Reintentar" también es dinámico
    $grid.off("click", "#retryCatalog").on("click", "#retryCatalog", loadCatalog);


    // 1. NOTIFICACIONES

    function showToast(message) {

        $("#toast")
            .stop(true, true)
            .text(message)
            .fadeIn(250)
            .delay(2200)
            .fadeOut(400);

    }


    // 2. CARGAR CANCHAS DINÁMICAMENTE

    function populateCourtOptions(sport = "", selected = "") {

        const $select = $("#selectedCourt");

        $select.empty().append(
            '<option value="">Seleccionar cancha</option>'
        );

        courts
            .filter(c => !sport || c.sport === sport)
            .forEach(c => {

                $select.append(
                    $("<option>")
                        .val(c.name)
                        .text(c.name + " — Bs " + c.price + "/hora")
                );

            });

        if (selected) {
            $select.val(selected);
        }

    }


    // 3. MENÚ HAMBURGUESA

    $("#menuToggle").click(function () {

        $("#mainNav").slideToggle(300);

    });

    $("#mainNav a").click(function () {

        if ($(window).width() <= 600) {

            $("#mainNav").slideUp(250);

        }

    });


    // 4. CAMBIO DE TEMA

    $("#themeToggle").click(function () {

        $("body").toggleClass("light");

        const light = $("body").hasClass("light");

        $(this).text(
            light ? "🌙 Modo oscuro" : "☀️ Modo claro"
        );

        showToast(
            light ? "Tema claro activado" : "Tema oscuro activado"
        );

    });


    // 5. FILTROS POR DEPORTE

    $(".tab").click(function () {

        $(".tab").removeClass("active");

        $(this).addClass("active");

        applyFilters();

        const sport = $(this).data("sport");

        showToast(
            sport === "todos"
                ? "Mostrando todos los deportes"
                : "Filtro: " + sports[sport]
        );

    });


    // 6. BÚSQUEDA EN TIEMPO REAL

    $("#searchCourt").on("keyup", function () {

        applyFilters();

    });


    // 7. FILTROS DE PRECIO Y ORDENAMIENTO

    $("#priceFilter, #sortFilter").on("change", function () {

        applyFilters();

    });


    // 8. FUNCIÓN CENTRAL DE FILTRADO

    function applyFilters() {

        const search = $("#searchCourt")
            .val()
            .toLowerCase()
            .trim();

        const sport = $(".tab.active").data("sport");

        const price = $("#priceFilter").val();

        const sort = $("#sortFilter").val();

        let cards = $(".court-card").toArray();

        // Ordenar precios

        if (sort === "asc") {

            cards.sort(function (a, b) {

                return Number($(a).data("price")) -
                       Number($(b).data("price"));

            });

        }

        if (sort === "desc") {

            cards.sort(function (a, b) {

                return Number($(b).data("price")) -
                       Number($(a).data("price"));

            });

        }

        $("#courtsGrid").append(cards);

        let visible = 0;

        $(".court-card").each(function () {

            const $card = $(this);

            const name = String(
                $card.data("name")
            ).toLowerCase();

            const cardSport = $card.data("sport");

            const cardPrice = Number(
                $card.data("price")
            );

            const matchSearch = name.includes(search);

            const matchSport =
                sport === "todos" || cardSport === sport;

            let matchPrice =
                price === "all" ||
                (price === "low" && cardPrice <= 80) ||
                (price === "medium" &&
                    cardPrice >= 81 && cardPrice <= 120) ||
                (price === "high" && cardPrice > 120);

            if (matchSearch && matchSport && matchPrice) {

                $card.stop(true, true).fadeIn(200);

                visible++;

            } else {

                $card.stop(true, true).fadeOut(150);

            }

        });

        $("#noResults").toggle(visible === 0);

    }


    // 9. LIMPIAR FILTROS

    $("#resetFilters").click(function () {

        $("#searchCourt").val("");

        $("#priceFilter").val("all");

        $("#sortFilter").val("default");

        $(".tab").removeClass("active");

        $('.tab[data-sport="todos"]').addClass("active");

        applyFilters();

        showToast("Filtros restablecidos");

    });


    // 10. ACORDEÓN DE DETALLES

    // Delegación de eventos (Event Bubbling): un solo manejador en el
    // contenedor, con .off().on() para evitar duplicados.
    $grid.off("click", ".details-button").on("click", ".details-button", function () {

        const $button = $(this);

        $button.next(".accordion-content")
            .stop(true, true)
            .slideToggle(350);

        $button.text(
            $button.text().includes("Ver")
                ? "Ocultar detalles ↑"
                : "Ver detalles ↓"
        );

    });

    // 11. MODAL DE INFORMACIÓN

    function openCourtModal($card) {

        const name = $card.data("name");
        const sport = $card.data("sport");
        const price = $card.data("price");

        $("#modalTitle").text(name);

        $("#modalDescription").text(
            "Deporte: " + sports[sport] +
            ". Precio: Bs " + price +
            " por hora. Selecciona esta cancha para continuar."
        );

        $("#modalReserve").data("court", name);

        $("#courtModal")
            .css("display", "flex")
            .hide()
            .fadeIn(250);

    }

    // Botón "Más información" y doble clic (delegados en el contenedor)
    $grid.off("click", ".info-button").on("click", ".info-button", function () {
        openCourtModal($(this).closest(".court-card"));
    });

    $grid.off("dblclick", ".court-card").on("dblclick", ".court-card", function (event) {
        if ($(event.target).closest("button").length) return;
        openCourtModal($(this));
    });


    // 12. CERRAR MODAL

    $("#closeModal, #courtModal").click(function (event) {

        if (
            event.target.id === "closeModal" ||
            event.target.id === "courtModal"
        ) {

            $("#courtModal").fadeOut(200);

        }

    });


    // 13. SELECCIONAR CANCHA

    function selectCourt(name, sport) {

        const data = courts.find(c => c.name === name);

        if (!data) return;

        selectedCourt = name;

        selectedSport = sport;

        selectedPrice = data.price;

        $("#selectedSport").val(sport);

        populateCourtOptions(sport, name);

        updateSummary();

        $("#reservar")[0].scrollIntoView({
            behavior: "smooth"
        });

        showToast("Cancha seleccionada: " + name);

        refreshSlotAvailability();

    }


    // BOTONES DE SELECCIÓN

    $grid.off("click", ".reserve-button").on("click", ".reserve-button", function () {

        const $card = $(this).closest(".court-card");

        selectCourt(
            $card.data("name"),
            $card.data("sport")
        );

    });


    // SELECCIÓN DESDE EL MODAL

    $("#modalReserve").click(function () {

        const name = $(this).data("court");

        const data = courts.find(c => c.name === name);

        if (data) {

            selectCourt(name, data.sport);

        }

        $("#courtModal").fadeOut(200);

    });


    // 14. CAMBIO DE DEPORTE

    $("#selectedSport").change(function () {

        selectedSport = $(this).val();

        selectedCourt = "";

        selectedPrice = 0;

        populateCourtOptions(selectedSport);

        selectedTime = "";

        $("#selectedTime").val("");

        $(".slot").removeClass("selected vip");

        updateSummary();

        refreshSlotAvailability();

    });


    // 15. CAMBIO DE CANCHA

    $("#selectedCourt").change(function () {

        selectedCourt = $(this).val();

        const data = courts.find(
            c => c.name === selectedCourt
        );

        selectedPrice = data ? data.price : 0;

        selectedTime = "";

        $("#selectedTime").val("");

        $(".slot").removeClass("selected vip");

        updateSummary();

        refreshSlotAvailability();

    });


    // 16. ACTUALIZAR RESUMEN

    function updateSummary() {

        $("#summarySport").text(
            sports[selectedSport] || "No seleccionado"
        );

        $("#summaryCourt").text(
            selectedCourt || "No seleccionada"
        );

        $("#summaryDate").text(
            $("#selectedDate").val() || "No seleccionada"
        );

        $("#summaryTime").text(
            selectedTime || "No seleccionado"
        );

        $("#summaryPrice").text(
            "Bs " + selectedPrice
        );

        $("#summaryPrice")
            .stop(true)
            .animate({opacity: 0.35}, 100)
            .animate({opacity: 1}, 250);

    }


    // 17. CONTROL DE HORARIOS OCUPADOS

    function currentReservationKey(time) {

        return selectedCourt + "|" +
               $("#reservationDate").val() + "|" +
               time;

    }


    function refreshSlotAvailability() {

        $(".slot").each(function () {

            const time = $(this).data("time");

            const key = currentReservationKey(time);

            const isOccupied = !!occupiedSlots[key];

            $(this)
                .toggleClass("occupied", isOccupied)
                .prop("disabled", isOccupied);

            if (isOccupied) {

                $(this).removeClass("selected vip");

            }

        });

    }


    // 18. SELECCIÓN DE HORARIOS

    $(".slot").click(function () {

        const $button = $(this);

        if (!selectedCourt) {

            showToast("Primero selecciona una cancha.");

            return;

        }

        if ($button.hasClass("occupied")) {

            showToast(
                "Este horario ya está reservado para esta cancha."
            );

            return;

        }

        clickCount++;

        clearTimeout(clickTimer);

        const clicked = $button;

        clickTimer = setTimeout(function () {

            $(".slot").removeClass("selected vip");

            if (clickCount >= 3) {

                clicked.addClass("vip");

                selectedTime =
                    clicked.data("time") + " (VIP)";

                showToast("¡Selección VIP activada!");

            } else {

                clicked.addClass("selected");

                selectedTime = clicked.data("time");

                showToast(
                    "Horario seleccionado: " + selectedTime
                );

            }

            $("#selectedTime").val(selectedTime);

            updateSummary();

            clickCount = 0;

        }, 450);

    });


    // 19. CAMBIO DE FECHA

    function changeReservationDate(date) {

        $("#reservationDate, #selectedDate").val(date);

        selectedTime = "";

        $("#selectedTime").val("");

        $(".slot").removeClass("selected vip");

        refreshSlotAvailability();

        updateSummary();

    }


    $("#reservationDate").change(function () {

        changeReservationDate($(this).val());

        showToast("Fecha de reserva actualizada");

    });


    $("#selectedDate").change(function () {

        changeReservationDate($(this).val());

    });


    // 20. VALIDACIÓN DEL NOMBRE

    $("#clientName").on("input", function () {

        const value = $(this).val().trim();

        const valid =
            /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{3,60}$/.test(value);

        $("#nameError").text(
            value.length === 0 || valid
                ? ""
                : "Introduce un nombre válido de al menos 3 letras."
        );

    });


    // 21. VALIDACIÓN DEL TELÉFONO BOLIVIANO

    $("#clientPhone").on("input", function () {

        let value = $(this).val()
            .replace(/\D/g, "")
            .slice(0, 8);

        $(this).val(value);

        const valid = /^[67]\d{7}$/.test(value);

        $("#phoneError").text(
            value.length === 0 || valid
                ? ""
                : "Introduce un celular boliviano válido de 8 dígitos."
        );

    });


    // 22. ACTUALIZACIÓN DEL RESUMEN

    $("#selectedDate, #comments").on(
        "change input",
        updateSummary
    );


    // 23. REGISTRO DE RESERVAS

    $("#bookingForm").submit(function (event) {

        event.preventDefault();

        const name = $("#clientName").val().trim();

        const phone = $("#clientPhone").val().trim();

        const sport = $("#selectedSport").val();

        const court = $("#selectedCourt").val();

        const date = $("#selectedDate").val();

        const time = selectedTime;

        const terms = $("#terms").is(":checked");

        const nameValid =
            /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{3,60}$/.test(name);

        const phoneValid = /^[67]\d{7}$/.test(phone);

        const data = courts.find(c => c.name === court);

        const error = message => $("#formError").text(message);


        // VALIDAR NOMBRE

        if (!nameValid) {

            error("Verifica el nombre del cliente.");

            return;

        }


        // VALIDAR TELÉFONO

        if (!phoneValid) {

            error(
                "El teléfono debe tener 8 dígitos y comenzar con 6 o 7."
            );

            return;

        }


        // VALIDAR CAMPOS

        if (!sport || !court || !date || !time) {

            error(
                "Completa el deporte, cancha, fecha y horario."
            );

            return;

        }


        // VALIDAR CONFIRMACIÓN

        if (!terms) {

            error(
                "Debes aceptar la confirmación de los datos."
            );

            return;

        }


        // VALIDAR FECHA

        if (date < localDate) {

            error(
                "No puedes reservar una fecha anterior a hoy."
            );

            return;

        }


        // COMPROBAR DEPORTE Y CANCHA

        if (!data || data.sport !== sport) {

            error(
                "El deporte seleccionado no corresponde a la cancha."
            );

            return;

        }


        // COMPROBAR HORARIO DUPLICADO

        const cleanTime = time.replace(" (VIP)", "");

        const key = court + "|" + date + "|" + cleanTime;

        if (occupiedSlots[key]) {

            error(
                "Este horario ya fue reservado. Selecciona otro."
            );

            return;

        }


        // GENERAR RESERVA

        const reservation = {

            id: Date.now(),

            name: name,

            phone: phone,

            sport: sports[sport],

            court: court,

            date: date,

            time: time,

            price: data.price,

            comments: $("#comments").val().trim()

        };


        // GUARDAR EN MEMORIA

        reservations.push(reservation);

        occupiedSlots[key] = true;


        // ACTUALIZAR INTERFAZ

        renderReservations();

        refreshSlotAvailability();

        error("");

        showToast("¡Reserva registrada correctamente!");


        // CONFIRMACIÓN

        alert(
            "DEPORZONE LA PAZ\n\n" +
            "RESERVA REGISTRADA\n\n" +
            "Cliente: " + name + "\n" +
            "Teléfono: " + phone + "\n" +
            "Deporte: " + sports[sport] + "\n" +
            "Cancha: " + court + "\n" +
            "Fecha: " + date + "\n" +
            "Horario: " + time + "\n" +
            "Total: Bs " + data.price + "\n\n" +
            "Solicitud registrada correctamente."
        );


        // REINICIAR FORMULARIO

        $("#bookingForm")[0].reset();

        selectedTime = "";

        selectedSport = "";

        selectedCourt = "";

        selectedPrice = 0;

        populateCourtOptions();

        $("#reservationDate, #selectedDate").val(date);

        $(".slot").removeClass("selected vip");

        refreshSlotAvailability();

        updateSummary();

        $("#reservas")[0].scrollIntoView({
            behavior: "smooth"
        });

    });


    // 24. MOSTRAR RESERVAS DINÁMICAMENTE

    function renderReservations() {

        const $container = $("#reservationsList");

        $container.empty();

        if (reservations.length === 0) {

            $container.html(
                '<p class="empty-message">' +
                'Todavía no existen reservas registradas.' +
                '</p>'
            );

        }

        reservations.forEach(function (r) {

            const $item = $("<div>")
                .addClass("reservation-item");

            const $info = $("<div>");

            $("<h3>")
                .text(r.name + " · " + r.court)
                .appendTo($info);

            $("<p>")
                .text(
                    r.sport + " | " +
                    r.date + " | " +
                    r.time + " | Tel: " + r.phone
                )
                .appendTo($info);

            $("<strong>")
                .text("Bs " + r.price)
                .appendTo($item);

            $item.prepend($info);

            $container.append($item);

            $item.hide().fadeIn(350);

        });

        $("#reservationCount").text(
            reservations.length +
            (reservations.length === 1
                ? " reserva"
                : " reservas")
        );

    }


    // 25. EFECTO VISUAL INICIAL

    $(".hero-content").hide().fadeIn(900);

    // MENÚ: restablecer al cambiar el tamaño de la ventana

    $(window).on("resize", function () {

        if ($(window).width() > 600) {

            $("#mainNav").removeAttr("style");

        }

    });

    // 27. MINI-BLOQUE 1: RESERVA RÁPIDA (ANTI-XSS)

    $("#formReserva").off("submit").on("submit", function (e) {

        e.preventDefault();

        let nombre = $("#clienteNombre").val().trim();
        let sala = $("#salaSelect").val();

        if (!nombre) return;

        // PREVENCIÓN XSS: se construyen nodos seguros usando .text()
        // en lugar de concatenar HTML crudo
        let $item = $("<li>").addClass("item-reserva");
        let $textoSeguro = $("<strong>").text(nombre + " — ");
        let $detalleSala = $("<span>").text(sala);

        $item.append($textoSeguro, $detalleSala);
        $("#listaReservas").append($item);

        this.reset();

    });


    // 28. MINI-BLOQUE 2: LISTA DE ESPERA BLINDADA

    $("#btnPedir").off("click").on("click", function () {

        let tema = $("#inputCancion").val().trim();

        if (!tema) return;

        // Nodos seguros con .text() (anti-XSS)
        let $fila = $("<div>").addClass("fila-cancion");
        let $titulo = $("<span>").addClass("titulo-truncado").text(tema);
        let $btnQuitar = $("<button>").addClass("btn-tactil btn-quitar").attr("type", "button").attr("aria-label", "Quitar").text("✕");

        $fila.append($titulo, $btnQuitar);
        $("#listaCanciones").append($fila);
        $("#inputCancion").val("");

    });

    $("#inputCancion").off("keydown").on("keydown", function (e) {
        if (e.key === "Enter") $("#btnPedir").trigger("click");
    });

    // Delegación por Event Bubbling para eliminar filas dinámicas sin fugas de memoria
    $("#listaCanciones").off("click", ".btn-quitar").on("click", ".btn-quitar", function () {
        $(this).closest(".fila-cancion").remove();
    });


    // 26. INICIALIZACIÓN

    updateSummary();

    loadCatalog();

    console.log(
        "DEPORZONE LA PAZ | jQuery iniciado | catálogo vía Fetch | 5 deportes"
    );

});
# Fortuna Hub

# ROSS FORTUNA — DISEÑO DESDE CERO (SOLO FRONT-END, DATOS MOCK)
# Web responsive + experiencia compatible con Android e iOS

Actúa como director de arte y desarrollador front-end senior. Crea desde cero el front-end de Ross Fortuna, plataforma integral para administrar y vender Rifas Diarias y Rifas Especiales. Ignora cualquier diseño o código previo. La lógica y el alcance salen exclusivamente de la Especificación Funcional y Técnica, la Propuesta y el Contrato del proyecto; la identidad visual sale de las dos imágenes de referencia adjuntas (arte de marca con el logo y diseño de ticket). No añadas módulos, pantallas ni reglas que no estén descritos aquí.

## 0. Reglas de ejecución
- Stack: React + TypeScript + Tailwind CSS + shadcn/ui + lucide-react (el que use Lovable). Componentes reutilizables, presentacionales y desacoplados de los datos, para migrarlos después al frontend real y a las apps móviles.
- SOLO DISEÑO: sin backend, base de datos, autenticación real, pagos ni APIs. Todo con datos mock ficticios y tipados en src/data/*.ts (nunca datos personales reales). Simula las reglas con estado local únicamente para mostrar todos los estados de la interfaz. Los botones simulan navegación o cambios de estado.
- La configuración (sorteos, horarios, lotería de referencia, modalidades, suertes, planes, plazos, nota del ticket) NO queda fija en los componentes: se lee de datos mock y se edita desde las pantallas de administración.
- Trabaja por FASES (sección 9). Ejecuta SOLO la fase que te pida. Al terminar: verifica que compile, que no haya rutas rotas ni enlaces muertos, resume en 5 líneas y espera mi "continúa".
- Assets: las imágenes de referencia adjuntas definen el estilo. Yo subiré el logo como archivo (src/assets/): logo completo, monograma (corona + R + trébol + círculo) y wordmark, idealmente en PNG transparente. Mientras tanto, usa marcadores fáciles de reemplazar: un wordmark textual "ROSS FORTUNA" en serif con degradado dorado y un monograma SVG simple. Si el PNG del logo trae fondo blanco, aplica mix-blend-mode: multiply sobre superficies claras. Sin imágenes externas ni hotlinks.

## 1. Producto y perfiles
- Ross Fortuna administra y vende Rifas Diarias y Rifas Especiales. Las ventas las hacen trabajadores y vendedores, y también los propios clientes registrados e invitados.
- Frases de marca: "Tu momento. Tu suerte. Tu fortuna." (lema), "Más que sorteos, grandes historias." y "Juega · Participa · Gana".
- Crear una cuenta NO es obligatorio para comprar. "CONTINUAR COMO INVITADO" es una acción de primer nivel y la experiencia del invitado prioriza comprar rápido.
- Misma cuenta y mismos datos en Web, Android e iOS: tickets, premios, saldo, solicitudes de retiro, jugadas programadas, comprobantes, movimientos e historial.
- Perfiles: Administrador, Trabajador, Vendedor/Comisionista, Cliente registrado, Invitado.
- Experiencia: cliente sencilla, rápida y visual; trabajador rápida pero con permisos estrictos; Administración precisa.
- Principio transversal: hacer VISIBLE la trazabilidad. Reservado ≠ Vendido ≠ Cobrado ≠ Pagado. Dinero recibido ≠ Uso de saldo ≠ Venta. Contratado ≠ Vendido ≠ Cobrado.
- Moneda: USD.

## 2. Compatibilidad Web + Android + iOS
La misma interfaz debe funcionar y sentirse cómoda en navegador, Android (incluido Samsung) e iPhone, y quedar lista para las apps móviles. Pantallas principales del cliente en móvil: compra, tickets, premios, saldo, retiro e historial. Los paneles de trabajador y vendedor también se resuelven en móvil.
- Mobile-first y responsive: 360, 768, 1280 y 1536px. Verifica en iPhone SE (375), iPhone 15 Pro/Pro Max, Pixel 7, Galaxy S23 (360×780), iPad y tablet Android. Sin scroll horizontal; las tablas anchas pasan a listas de tarjetas en móvil.
- <meta viewport width=device-width, initial-scale=1, viewport-fit=cover>; theme-color blanco; safe areas con env(safe-area-inset-*) en header, barra inferior, CTA fijos y sheets; 100dvh en lugar de 100vh.
- Navegación móvil del cliente con barra inferior (Inicio, Jugar, Tickets, Billetera, Cuenta). En desktop, navegación superior o sidebar. Paneles de Administración con sidebar en desktop y drawer en móvil.
- Bottom sheets (Drawer) en móvil para selecciones, filtros y confirmaciones; Dialog centrado solo en desktop. Bloquear el scroll del fondo con un sheet abierto (iOS Safari).
- Áreas táctiles ≥48px (mínimo 44px) con 8px de separación. Nada depende de hover; estados :active con leve scale(0.98). touch-action: manipulation.
- Formularios: fuente ≥16px en inputs (evita el zoom de iOS); inputMode="numeric" para números, type="tel" para teléfono, autocomplete correcto; los CTA fijos no quedan tapados por el teclado.
- Teclado numérico propio (NumberPad) para elegir números, con alternativa al teclado del sistema.
- Tipografía en rem (respeta el tamaño de texto del sistema), font-display: swap con fallback a -apple-system y Roboto, y -webkit-backdrop-filter donde se use blur. Respeta prefers-reduced-motion. Línea base moderna: iOS Safari 16.4+, Chrome Android 111+, Samsung Internet 22+.
- Los efectos dorados (degradados, cintas, destellos) deben verse igual de nítidos en pantallas móviles y no pesar: usa CSS y SVG, no imágenes pesadas.
- Escáner QR (trabajador): pantalla completa con marco de lectura y opción de ingresar el código manualmente.
- Notificaciones push (solo diseño): pantalla previa de permiso, centro de notificaciones con contador y preferencias.
- Vista de impresión del ticket (trabajador): misma estructura que el ticket digital, sin degradados ni marcas de agua.
- Contraste adecuado, áreas táctiles suficientes, foco visible y aria-labels.

## 3. Dirección visual: "Marble & Gold Luxe" (identidad actual de Ross Fortuna)
Replica el estilo de las dos imágenes de referencia: lujo claro, sofisticado y luminoso, con mármol blanco y oro metálico. NO hay fondos negros ni modo oscuro en ninguna pantalla.

### Logo y uso de marca
- El logo es dorado metálico tridimensional con bisel: corona con esferas, monograma "R" con un trébol de cuatro hojas y un círculo dorado, "ROSS" en serif bold grande y "FORTUNA" en serif espaciado con líneas laterales, y el lema "TU MOMENTO. TU SUERTE. TU FORTUNA." en mayúsculas espaciadas.
- Se usa siempre directo sobre fondos blancos o de mármol, nunca sobre superficies oscuras. Componente Brand con variantes: completo (hero, acceso, ticket), monograma (header móvil, ícono de app, favicon) y wordmark horizontal (header desktop, footer). Documenta en Brand cuál va dónde.

### Fondo, mármol y decoración
- Fondo: mármol blanco con vetas doradas finas y grises cálidos muy sutiles, hecho con gradientes CSS (utilidad .marble). Alterna con superficies crema muy suave.
- Cintas doradas: olas metálicas curvas en esquinas (arriba a la izquierda y abajo a la derecha), como SVG con degradados. Se usan en hero, tarjetas destacadas y ticket; discretas en pantallas de trabajo.
- Tréboles dorados grandes, traslúcidos o desenfocados como marca de agua (opacidad muy baja) y destellos de 4 puntas ✦.
- Divisor de marca: línea dorada fina con un destello ✦ al centro.

### Oro metálico (utilidades)
- .gold-metal: degradado lineal ~135° con sombra dorada profunda → dorado medio → luz champagne → dorado medio → sombra profunda, para botones, barras y filetes.
- .gold-text: el mismo degradado con background-clip: text, solo en títulos grandes (≥40px). Texto dorado pequeño: solo --gold-deep.
- Iconografía de línea fina dorada (lucide): Ticket, Gift, Trophy, Users, CalendarDays, Clock, Hourglass, FileText, Globe.

### Tokens (src/styles.css, oklch, nombres semánticos)
- --background oklch(0.992 0.004 90) (blanco mármol); --surface oklch(0.975 0.01 88) (crema suave); --card oklch(0.998 0.002 90).
- --foreground oklch(0.21 0.015 75) (casi negro cálido); --muted-foreground oklch(0.46 0.02 75).
- --gold oklch(0.76 0.12 85); --gold-light oklch(0.93 0.08 92); --gold-deep oklch(0.48 0.09 72) (texto pequeño dorado, contraste AA); --border dorado al 30–45%.
- Colores de estado (solo para estados, con contraste AA): éxito verde apagado, pendiente ámbar, en revisión azul grisáceo, rechazado y anulado rojo vino, vencido gris cálido, advertencia ⚠️ ámbar intenso.
- Radios: cajas de información 20px, tarjetas y ticket 24px, botones 12px. Sombras mínimas y cálidas; brillo dorado suave solo en el CTA principal. Fallbacks hex para los tokens críticos con @supports.

### Tipografía
- Manuscrita caligráfica inclinada (Google Fonts: Great Vibes o Allura) en dorado profundo, rotada unos -8°, solo para frases de marca: "Más que sorteos, grandes historias." y "Juega · Participa · Gana".
- Títulos: Cormorant Garamond semibold/bold; wordmark textual de respaldo en Cinzel bold con degradado dorado.
- UI y datos: sans geométrica limpia (Montserrat), con tabular-nums para números, precios y códigos. Etiquetas pequeñas en mayúsculas con tracking amplio (~0.25em), como "SORTEO:", "CÓDIGO:", "JUEGA · PARTICIPA · GANA".

### Patrones de componentes de marca (según el ticket y el arte)
- Caja de información: rectángulo redondeado con borde dorado de 1px, fondo blanco translúcido, etiqueta pequeña en mayúsculas arriba y valor en negrita debajo.
- Barra dorada: banda con .gold-metal, texto negro, título a la izquierda y valor a la derecha (como "JUEGA CON LTT 20:00 · VALOR: $3.00").
- Tabla de filas con líneas finas grises cálidas: número de fila, nombre y monto alineado a la derecha, dentro de un contorno dorado redondeado.
- Pilares con icono dorado en línea fina, separados por líneas verticales doradas (2×2 en móvil).
- Botones: "fortune" (.gold-metal, texto oscuro, 48px, mayúsculas, tracking 0.18em, brillo sutil), "velvet" (blanco con borde dorado y texto gold-deep), "ink" (carbón, uso mínimo), "ghost", "danger". Soportan asChild con <Link>.
- Animaciones sutiles: destello que recorre el CTA principal, barras de progreso animadas, confeti dorado en la revelación de números. Respeta prefers-reduced-motion.

## 4. Componentes
- Base shadcn estilizada con los tokens: Card, Badge, Progress (barra fina dorada), Input, Select, Tabs, Accordion, Dialog, Drawer, Toast, Skeleton, Table, Switch, Checkbox, Calendar.
- Propios: Brand, AppShell (móvil y desktop), SectionTitle, PurchaseStepper, NumberPad, RaffleCard, TicketDigital (sección 6), UploadReceipt, FilterBar, DataTable (con vista de tarjetas en móvil), LedgerTable (tipo, importe, saldo anterior, saldo posterior, fecha/hora, referencia, origen, motivo), Timeline (trazabilidad), StatusBadge (mapa único de estados), MoneyTrace (chips Reservado, Vendido, Cobrado, Pagado), OriginTag (Venta directa Ross Fortuna, Trabajador, Vendedor, Contrata, Jugada programada), InfoBox, GoldBar, GoldDivider, PillarsRow, StoreBadges (insignias visuales "Disponible en App Store / Google Play", sin enlaces reales), EmptyState, ConfirmCheck, StatCard.
- Etiquetas de estado consistentes en todo el sitio: Pendiente · En revisión · Aprobado · Rechazado · Vencido · Pagado. Advertencias ⚠️ visibles en operaciones posteriores al cierre o a la publicación de resultados.
- Todo flujo contempla estados vacío, cargando, error y éxito. Las páginas de error nunca muestran detalles técnicos.

## 5. Reglas que la interfaz debe comunicar (usa este copy)
- Pantalla previa al pago: "REVISA TU JUGADA ANTES DE CONFIRMAR" con Sorteo, Modalidad, Plan, Número, Valor y Total, y una casilla de confirmación expresa. Texto de la regla: "Una vez confirmada la compra, no se permiten cambios, cancelaciones ni reembolsos por arrepentimiento, número incorrecto, plan equivocado o cambio de opinión."
- Antes de pagar, el cliente puede consultar cuánto paga el plan elegido en cada suerte (tabla por suerte, por cada $1 jugado).
- Comprobantes: mostrar por separado creación de la compra, carga del comprobante, fecha/hora verificada de la transferencia (cuando pueda determinarse), fecha/hora de revisión, revisor y resultado. Aviso: "Hora de pago ≠ hora de aprobación administrativa".
- Al cierre del sorteo: "PENDIENTE DE VERIFICACIÓN — SORTEO CERRADO". Trabajadores y vendedores ven el botón de aprobar bloqueado con el mensaje "Solo un Administrador autorizado puede verificar esta participación."
- ⚠️ "APROBACIÓN POSTERIOR A PUBLICACIÓN DE RESULTADOS" con administrador, ticket, importe, comprobante, fecha/hora comprobada del pago, fecha/hora de aprobación y motivo.
- Pago hecho después del cierre: el ticket no participa y el dinero pasa a "REEMBOLSO POR PAGO FUERA DE HORARIO".
- Reembolsos: solo por causa justificada (pago fuera de horario, pago duplicado, error técnico que impidió una participación válida, cobro recibido para una operación que no pudo ejecutarse, otra incidencia excepcional autorizada). Cada uno registra compra/ticket, causa, importe, entrada original, salida/reembolso, administrador, fecha/hora, método y comprobante. El movimiento original nunca desaparece.
- Recargas ("Agregar fondos"): Pendiente · En revisión · Aprobado · Rechazado. Aviso: "Subir el comprobante no aumenta el saldo hasta su aprobación."
- Libro de movimientos: el saldo nunca se sobrescribe; cada movimiento muestra saldo anterior y posterior.
- Premio: estados Generado/Ganador · Pendiente · Acreditado a saldo · Retiro solicitado · Pagado · Vencido. Cadena visible: Ticket → Resultado → Suerte → Premio → Estado → Pago.
- Vencimiento: 8 días calendario desde la fecha del sorteo (configurable), el mismo dato que el ticket muestra como "CADUCA EN: 8 días". En el detalle del premio muestra solo la fecha límite calculada, sin hora de corte (esa hora está por confirmar). Al vencer: "PREMIO VENCIDO".
- Validación de premio: "Premio válido — $100 — Pendiente de pago". Validar NO paga: luego "CONFIRMAR PAGO". Reintento: "ESTE PREMIO YA FUE PAGADO". El código secreto de cobro se muestra enmascarado (••••) a Trabajador y Vendedor; solo el Administrador autorizado lo ve.
- Premio a saldo: "RETIRAR" o "DEJAR EN MI SALDO" (ej.: premio $40 → saldo +$40, con nota "no es una nueva entrada bancaria"). Un invitado ganador que quiera dejar el premio en saldo debe crear/verificar una cuenta.
- Retiros: Solicitado → En revisión → Aprobado → Pagado, o Rechazado / Cancelado. Mientras hay solicitud activa, el importe queda reservado y no se puede usar en una compra. Administración puede adjuntar comprobante del pago.
- Anulaciones: el ticket queda "ANULADO" (nunca se elimina). Después del resultado: ⚠️ "ANULACIÓN POSTERIOR AL RESULTADO" con usuario, fecha/hora, motivo, ticket, número, valor y efecto financiero. Solo Administración. El trabajador anula únicamente sus propias ventas dentro del horario permitido (mostrar tiempo restante).
- Origen de la venta siempre visible. "VENTA DIRECTA ROSS FORTUNA" no genera comisión; solo genera comisión lo registrado personalmente por el vendedor desde su panel.
- Contratas: una Contrata pendiente es "CUPO RESERVADO" (no es venta, ticket definitivo ni dinero cobrado). Fila: "Rossmery | #20 | $20 | PENDIENTE | VENDER" → "VENDIDA ✓ | REIMPRIMIR". Botón VENDER / SACAR TICKET y VENDER TODAS. Resumen del próximo día: "Matutina · 18 contratas · $420 reservados · $0 vendidos". Crédito solo autorizable por Administración, con "Cuenta por cobrar".
- Jugadas Programadas: Activa · Pausada · Cancelada · Ejecutada · "NO EJECUTADA — SALDO INSUFICIENTE" (sin ticket, sin venta, sin descuento parcial, sin saldo negativo). Alerta: "Tu saldo Ross Fortuna está por debajo de $20. Agrega fondos para mantener activas tus jugadas programadas." Los cambios conservan historial. Estados marcados como "por confirmar" (P5) hasta validar el catálogo final con el cliente.
- Rifa Especial: compra en "PAGO PENDIENTE" con los números NO revelados; tras la aprobación, asignación aleatoria y "números revelados". No se pueden pedir otros números. Progreso "750 / 1.000 vendidos · 75%" y, al 100%, "RIFA COMPLETAMENTE VENDIDA — LISTA PARA SORTEO".
- Números Fortuna: "🍀 ¡FELICIDADES! TIENES UN NÚMERO FORTUNA". En la configuración de Administración deja explícito: "Puedes definir qué números son Números Fortuna, pero no a qué cliente se asignan."
- Consultar tickets/números de invitado: verificación segura en dos pasos (código de compra o ticket + teléfono, luego código de verificación mock). Debe verse que no se pueden consultar compras ajenas escribiendo solo un teléfono o un correo.
- Cierre de caja: Saldo inicial + ingresos + transferencias recibidas − premios pagados − gastos − retiros − transferencias enviadas = saldo esperado; saldo real contado − esperado = sobrante/faltante. La diferencia queda registrada, no se corrige sobrescribiendo. Ejemplo visible: premio del martes pagado el miércoles → "Premio → Sorteo del martes · Salida financiera → miércoles".

## 6. Pantallas por fase del contrato

### TicketDigital (componente central, réplica fiel de la imagen de referencia del ticket)
Tarjeta vertical (proporción ~2:3), radio 24px, fondo crema muy claro con cintas doradas en dos esquinas y tréboles dorados traslúcidos de marca de agua. De arriba abajo:
1. Logo completo centrado con el lema. A la izquierda, apilado en mayúsculas espaciadas: "MÁS / QUE / SORTEOS / GRANDES / HISTORIAS". A la derecha, en manuscrita dorada: "Juega / Participa / Gana ♡".
2. Fila de tres InfoBox unidos en un contorno dorado redondeado: [icono calendario · SORTEO: fecha larga del sorteo] | [N° con el número jugado en tamaño muy grande, negro, bold] | [CÓDIGO: código numérico único + código de barras debajo].
3. QR centrado con marco dorado redondeado y el texto "ESCANEA Y VERIFICA TU TICKET".
4. GoldBar: "JUEGA CON {lotería de referencia} {hora}" a la izquierda y "VALOR: $x.xx" a la derecha. Debajo, tabla dentro de un contorno dorado: una fila por suerte (número de suerte, nombre de la suerte y premio en $ alineado a la derecha).
5. Pie en tres columnas separadas por líneas verticales: [icono reloj · COMPRA: fecha y hora completas] | [icono reloj de arena · CADUCA EN: 8 días] | [icono documento · NOTA: texto configurable].
6. Divisor con trébol dorado al centro y, al final, "JUEGA · PARTICIPA · GANA" en mayúsculas espaciadas.
- Debajo de la tarjeta, un bloque "Detalles del ticket" (colapsable) con los datos requeridos que la imagen no muestra: número de ticket, modalidad, plan (con versión), estado (StatusBadge), cliente o invitado, origen de la venta (OriginTag) y trabajador/vendedor cuando corresponda.
- Acciones: "Descargar imagen del ticket", "Ver estado" y, para el trabajador, "Imprimir" (vista de impresión). El mismo lenguaje visual (cintas, barra dorada, InfoBox, QR) se reutiliza en el comprobante de compra de Rifa Especial (código de compra, cantidad y números revelados).

### Fase 1 — Fundación + Rifas Diarias
Público/Invitado/Cliente:
- Portal público con la composición del arte de marca: hero sobre mármol con cintas en las esquinas, logo completo grande, frase manuscrita "Más que sorteos, grandes historias." al costado, lema en mayúsculas espaciadas, divisor con destello, PillarsRow (Sorteos diarios · Rifas especiales · Premios reales · Una comunidad ganadora), "JUEGA · PARTICIPA · GANA", y pie con globo + "ROSSFORTUNA.COM" y StoreBadges. Encima de los pilares, CTA "Comprar" y "Continuar como invitado". Más abajo: sorteos abiertos con hora de cierre visible, acceso a Resultados y a Consultar mis tickets, y Rifas Especiales con foto, precio, paquetes y barra de progreso.
- Registro e inicio de sesión: flujos cortos; datos mínimos para invitados (nombre, teléfono y correo cuando corresponda). Verificación en dos pasos para Administración y caja.
- Compra de Rifa Diaria (registrado o invitado): Comprar → Continuar como invitado → datos básicos → Sorteo → Modalidad (2, 3 o 4 cifras) → Plan de premios (varios activos a la vez) → Número(s) → Valor → Revisa tu jugada → Pago por transferencia con carga de comprobante → Comprobante → TicketDigital.
- "Consultar mis tickets / Consultar mis números" (verificación segura). /resultados para consultar resultados.
- Inicio del cliente registrado: "Saldo disponible: $25" y accesos: Jugar Matutina, Jugar Noche, Rifas Especiales, Mis Tickets, Mis Premios, Programar mi jugada, Agregar fondos, Retirar.
Trabajador (/pos): registrar ventas, imprimir tickets, consultar tickets, escanear QR, validar premios y pagar premios cuando esté autorizado, revisar comprobantes solo dentro del período autorizado, anular sus propias ventas.
Administración (/admin, panel base):
- Sorteos: nombre, días, apertura, cierre, lotería/resultado de referencia (con su abreviatura mostrada en el ticket, ej. "LTT"), modalidades (activar/desactivar), cantidad de suertes, planes disponibles, estado. Noche por día: Lunes → Lotería, Martes → Lotto, Miércoles → Lotería, Jueves → Lotto, Viernes → Lotería, Sábado → Lotto (Domingo sin definir, editable).
- Suertes y planes: 2 cifras hasta la 7.ª suerte, 3 cifras hasta la 10.ª, 4 cifras configurable, con opción de agregar suertes. Pago independiente por suerte por cada $1, con nombre configurable de la suerte (ej. "Suerte Víveres"). Planes con versión (v1, v2) y aviso: "Modificar un plan nunca cambia tickets anteriores". Campo configurable para la NOTA del ticket.
- Resultados: registrar (los premios se calculan automáticamente) y ver historial.
- Comprobantes y aprobación manual (cola con estados y línea de tiempo), tickets (con búsqueda y anulación), validación de premios por código/QR, saldo simplificado, reporte básico de ventas y cobros por día y sorteo, y auditoría base.

### Fase 2 — Billetera y comprobantes avanzados
- Cliente: Saldo Ross Fortuna; Agregar fondos (monto → transferencia → subir comprobante → estados); libro de movimientos; historial consolidado (compras, tickets, recargas, saldo y movimientos); notificaciones de aprobación o rechazo de recarga.
- Admin: panel de aprobación de recargas (registra quién aprobó y cuándo).
- Invitados: aviso de que no tienen billetera permanente hasta crear/verificar una cuenta.

### Fase 3 — Premios, vencimientos y seguridad financiera
- Cliente: Mis Premios (estados, fecha límite, RETIRAR / DEJAR EN MI SALDO), solicitud de retiro con seguimiento de estados.
- Trabajador: validar premio (código o QR), CONFIRMAR PAGO (registra premio, ticket, importe, usuario, fecha/hora, sucursal, método y comprobante cuando corresponda).
- Admin: premios (con códigos visibles solo aquí y vencimientos), retiros (adjuntar comprobante), reembolsos formales, configuración del plazo de vencimiento.

### Fase 4 — Vendedores, comisiones, Contratas y Jugadas Programadas
- Vendedor (/vendedor): registrar ventas, mis ventas, mis tickets, mis comisiones, historial.
- Admin: planes de comisión por vendedor, modalidad y sorteo, con porcentaje de ventas o valor fijo, e historial de comisiones generadas/pagadas. Contratas: cliente, número, modalidad, plan, valor, sorteo, días, fecha inicial, fecha final o indefinida, forma de cobro, estado; autorizar crédito; cuentas por cobrar.
- Trabajador: Contratas del próximo día, sacar contrata, reimprimir.
- Cliente: Jugadas Programadas (crear, pausar, reactivar, modificar, cancelar, historial de cambios).

### Fase 5 — Rifas Especiales y Números Fortuna
- Público: lista y detalle (fotos, premio, descripción, precio, paquetes, reglas, método para determinar al ganador, forma de cierre, barra de progreso). Compra por paquete o cantidad para cliente registrado e invitado: Rifa → Paquete/Cantidad → Datos → Pago → Comprobante → estado PAGO PENDIENTE → números revelados.
- Consultar mis números (invitado, verificación segura).
- Admin: configuración de la rifa (nombre, fotografías, descripción, premio, cantidad o rango de números, precio, paquetes, fecha de apertura, forma de cierre por fecha / al venderse por completo / manual, reglas, Números Fortuna, estado) y notificación cuando queda completamente vendida.

### Fase 6 — Cuentas financieras, caja y reportes avanzados
- Admin: cuenta de ingresos, cuenta de pagos/egresos y transferencias internas con referencia compartida; separación Rifas Diarias vs Rifas Especiales, con subregistro por rifa (Ventas · Cobrado · Pendiente · Reembolsos · Premios instantáneos · Premio principal · Gastos · Resultado · Cierre); cierre de caja.
- Dashboard con FilterBar (día, semana, mes, período personalizado, sucursal, sorteo, modalidad, plan, vendedor, rifa) e indicadores: ventas, cobrado, por cobrar, premios generados/pagados/pendientes, comisiones, recargas, retiros, saldo de clientes, Contratas, Jugadas Programadas, reembolsos, caja esperada, caja real y diferencia. Cada venta indica claramente su origen.
- Reportes: tickets activos/anulados, transferencias, comprobantes, clientes, invitados, vendedores, Números Fortuna, Rifas Especiales, resultados, modificaciones de resultados, aprobaciones posteriores al cierre y a resultados, cuentas por cobrar y actividad administrativa.

### Fase 7 — Móvil, notificaciones y pulido
- Adaptación final Web/Android/iOS de las pantallas principales (compra, tickets, premios, saldo, retiro, historial) y paneles de trabajador y vendedor en móvil.
- Notificaciones al cliente: comprobante recibido, pago verificado o rechazado, ticket confirmado, ticket ganador, Número Fortuna, premio acreditado, retiro aprobado o pagado, jugada programada ejecutada o no ejecutada, saldo bajo. A Administración: nuevo comprobante, retiro solicitado, Número Fortuna asignado, rifa completamente vendida, reembolso, diferencia de caja, resultado modificado, anulación posterior al resultado y otras operaciones sensibles.

### Transversal de Administración
- Clientes, invitados/compras sin cuenta, trabajadores, vendedores y permisos.
- Auditoría: quién → qué hizo → cuándo → valor anterior → valor nuevo → motivo (tickets, anulaciones, resultados, planes, premios, pagos, comprobantes, aprobaciones posteriores, reembolsos, recargas, retiros, ajustes, Contratas, crédito, comisiones, Números Fortuna y permisos).
- Búsqueda por código de ticket, QR, número jugado, cliente, invitado, teléfono, fecha, vendedor, sorteo, rifa y estado. El detalle de ticket muestra la Timeline: creador → fecha/hora → origen → número → modalidad → plan → valor → pago → aprobación → estado → resultado → suerte → premio → validación → pago/anulación → responsable.

## 7. Datos mock (ficticios)
- Ticket principal (igual al de la imagen): Sorteo "Sábado 12 de Septiembre del 2026"; N° 29; código 9683513149; "JUEGA CON LTT 20:00"; valor $3.00; suertes 1 a 7, todas "Suerte Víveres": $180.00, $30.00, $15.00, $15.00, $15.00, $6.00, $3.00; compra "Sábado 12 de Septiembre del 2026 - 18:39:16"; caduca en 8 días; nota "El equivalente en electrodomésticos y víveres". Modalidad 2 cifras. Genera variantes con otros números, sorteos (Matutina y Noche), planes y estados (activo, ganador, anulado, vencido).
- Ejemplo de premio: número 25, 2 cifras, $2 jugados, Plan 2, 4.ª suerte a $20 por cada $1 → $40. Pantalla de revisión: Sorteo Noche, Modalidad 2 cifras, Plan 2, Número 25, Valor $5, Total $5.
- Libro de movimientos: saldo inicial $0; +$100 Recarga aprobada; −$5 Ticket RF-4587; +$20 Premio acreditado; −$15 Retiro; saldo disponible $100. Inicio del cliente con saldo $25.
- Jugada programada: número 20, 2 cifras, Plan 2, Matutina, lunes a sábado, $5.
- Contratas: Rossmery, #20, 2 cifras, $20, Matutina, lunes a sábado; Matutina con 18 contratas, $420 reservados, $0 vendidos; totales Contratado $500 · Vendido $400 · Cobrado $300 · Por cobrar $100.
- Rifas Especiales: Rifa de Moto (750/1.000 vendidos, 75%), Canasta (32%), Efectivo $1.000 (90%); paquetes: $1 = 1 oportunidad, $2 = 1 oportunidad, $1 = 5 oportunidades; compra RF-4589 con 10 oportunidades y $10 en PAGO PENDIENTE; Números Fortuna 02746 → $100 y 34872 → $500 en una rifa de números de 5 cifras.
- Vencimiento: sorteo del 10 de septiembre con plazo de 8 días calendario.
- Comisiones (ejemplo): 3 cifras con 6% de las ventas y un plan de valor fijo ficticio.
- Todo lo demás (usuarios, vendedores, sucursales, comprobantes en todos los estados, retiros, reembolsos, cierres de caja, auditoría, notificaciones): datos ficticios coherentes.

## 8. BLOQUE OPCIONAL — fuera del alcance contractual (NO construir hasta que yo lo pida)
Aparecen en el Proyecto Original pero no en el alcance del contrato. Cuando llegue la Fase 8, constrúyelos aislados detrás de un flag OPTIONAL_MODULES en src/config (false por defecto, ocultos de la navegación):
- Números favoritos, Repetir jugada, Rifas destacadas (Rifa de Moto 75%, Canasta 32%, $1.000 90%), Compartir (WhatsApp, Instagram, mensajes) y sección pública de ganadores de Rifas Especiales (sin datos privados).
- Promociones, cupones y configuración avanzada de horarios y promociones.
- Modalidades adicionales (p. ej. 5 cifras), nuevos métodos de pago, sucursales o países.
- Segunda autorización administrativa para aprobaciones posteriores a resultados y operaciones de alto riesgo.
- Comisión sobre utilidad (2 cifras: 40% de la ganancia mensual positiva, sin comisión si no hay ganancia positiva), vigencias por fecha y filtro por tipo de rifa.
- Vinculación automática de compras de invitado al crear una cuenta con el mismo teléfono/correo verificado.

## 9. Fases de ejecución (una por vez, esperando mi "continúa")
- Fase 0: proyecto base, tokens, tipografías, utilidades de marca (.marble, .gold-metal, cintas, tréboles, divisores, destellos), componentes base, Brand con variantes, StatusBadge, AppShell móvil/desktop con safe areas, TicketDigital con datos mock, página de error 404 y una ruta interna /guia con la guía de estilo (tokens, botones, badges, InfoBox, GoldBar y ticket) para que yo apruebe el look.
- Fase 1A: portal público con la composición del arte de marca, acceso, compra de Rifa Diaria, pago con comprobante, ticket, consulta de invitado, resultados e inicio del cliente.
- Fase 1B: paneles base de Trabajador y Administración (sorteos, suertes, planes, resultados, comprobantes, tickets, validación de premios, reporte básico, auditoría base, verificación en dos pasos).
- Fase 2: billetera, recargas, libro de movimientos e historial consolidado.
- Fase 3: premios, vencimientos, código secreto, retiros y reembolsos.
- Fase 4: vendedor, comisiones, Contratas y Jugadas Programadas.
- Fase 5: Rifas Especiales y Números Fortuna.
- Fase 6: cuentas financieras, caja, dashboard y reportes, más la parte transversal de Administración.
- Fase 7: revisión móvil Android/iOS, notificaciones push, pulido y consistencia final.
- Fase 8: bloque opcional (solo si lo pido).

## 10. Calidad
- Cada estado y mensaje de la sección 5 aparece en al menos una pantalla, siempre con el mismo StatusBadge.
- La apariencia debe ser fiel a las imágenes de referencia: mármol blanco, oro metálico, cintas en esquinas, cajas con borde dorado y tipografías descritas. Sin fondos negros, sin modo oscuro.
- Tokens semánticos (nunca colores hardcodeados en componentes), sin estilos duplicados, sin enlaces muertos y con prueba visual en la matriz de dispositivos de la sección 2.

Empieza ahora SOLO con la Fase 0.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/742ccb50-d4d9-47bf-9fb1-23d692565b24).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

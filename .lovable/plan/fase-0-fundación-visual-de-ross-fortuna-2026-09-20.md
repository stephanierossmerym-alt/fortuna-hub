# Fase 0 — Fundación visual de Ross Fortuna

## Objetivo
Construir únicamente la base visual aprobable: sistema de diseño, componentes de marca, navegación adaptable, ticket digital y guía interna. Todo será front-end con datos ficticios tipados y estado local.

## Alcance
- Reemplazar la pantalla inicial vacía por una entrada mínima hacia la guía visual, sin construir todavía el portal público de la Fase 1A.
- Definir en CSS los tokens claros de mármol, crema, oro metálico, estados y tipografías Cormorant Garamond, Cinzel, Montserrat y Great Vibes.
- Crear utilidades reutilizables para mármol, oro, cintas, tréboles, destellos, safe areas, controles táctiles y reducción de movimiento.
- Adaptar los componentes base necesarios: botones, tarjetas, badges, progreso, campos, selección, pestañas, acordeón, diálogo/drawer, tablas, switches, checkbox, calendario, toast y skeleton.
- Crear Brand (completo, monograma y wordmark), AppShell adaptable, SectionTitle, InfoBox, GoldBar, GoldDivider, PillarsRow y StatusBadge.
- Crear TicketDigital fiel a la referencia, incluyendo código de barras/QR visuales, tabla de suertes, detalles colapsables y acciones simuladas.
- Añadir datos mock tipados del ticket principal y variantes, separados de los componentes.
- Crear `/guia` con muestras de tokens, botones, estados, cajas, barras y el ticket completo.
- Personalizar las pantallas de error y metadatos sin fondos oscuros.

## Comportamiento adaptable
- Navegación superior en escritorio y barra inferior segura en móvil.
- Sin desbordamiento horizontal; controles táctiles de al menos 48 px.
- Ticket legible desde 360 px y proporcionado en pantallas grandes.
- Safe areas, `100dvh`, foco visible y tipografía de formulario compatible con iOS.

## Verificación
- Comprobar `/` y `/guia` en 375×667, 360×780, 768×1024, 1280×1800 y 1536×1800.
- Confirmar ausencia de enlaces rotos, errores visibles y desbordamiento horizontal.
- Validar visualmente el ticket, la guía y la navegación móvil/escritorio.

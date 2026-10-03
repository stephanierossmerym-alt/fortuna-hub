# Fase 4 — Vendedores, comisiones, contratas y jugadas programadas

## Objetivo
Incorporar los flujos completos de la Fase 4 con datos ficticios tipados y estado local, manteniendo visible la trazabilidad operativa y financiera.

## Qué se construirá
- **Panel de Vendedor:** resumen de ventas, cobros, comisión acumulada y origen de cada operación.
- **Comisiones:** desglose por venta y estado, dejando claro que “Venta directa Ross Fortuna” no genera comisión.
- **Contratas:** cupo contratado, vendido, cobrado y disponible como valores separados; acciones `VENDER / SACAR TICKET` y `VENDER TODAS`.
- **Crédito de contratas:** visualización de autorización exclusiva de Administración y su Cuenta por cobrar asociada.
- **Jugadas programadas:** crear, pausar, reactivar y cancelar reglas simuladas; historial de cambios y ejecución visible.
- **Saldo insuficiente:** estado exacto `NO EJECUTADA — SALDO INSUFICIENTE`, sin ticket, venta, descuento parcial ni saldo negativo; aviso de saldo bajo $20.
- **Administración:** vistas de control para vendedores, comisiones, contratas, crédito y jugadas programadas.
- **Navegación:** accesos coherentes desde Mi cuenta y los paneles, sin enlaces muertos.

## Datos y comportamiento
- Añadir datos mock tipados para vendedores, liquidaciones, contratas, cuentas por cobrar, programaciones e historial.
- Todas las acciones serán simuladas con estado local; no se añadirá backend, autenticación real, pagos ni persistencia.
- Mantener en pantalla las distinciones: `Contratado ≠ Vendido ≠ Cobrado` y `Dinero recibido ≠ Uso de saldo ≠ Venta`.

## Validación
- Comprobar creación y cambio de estado de una jugada programada.
- Comprobar venta individual y venta total de una contrata sin exceder el cupo.
- Verificar cálculo y trazabilidad de comisiones, incluida la exclusión de venta directa.
- Revisar móvil, tablet y escritorio sin desbordamiento horizontal ni tablas inutilizables.
- Confirmar metadatos propios, rutas operativas, build limpio y ausencia de errores en pantalla.

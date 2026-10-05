# Fase 5: Rifas Especiales y Números Fortuna

## Objetivo
Completar la experiencia simulada de Rifas Especiales para clientes e invitados, junto con la configuración administrativa de Números Fortuna.

## Implementación
- Crear una sección pública dedicada a Rifas Especiales con las tres rifas mock existentes, progreso vendido, paquetes y estados de disponibilidad.
- Incorporar un flujo de compra local para elegir paquete, registrar datos, revisar condiciones, simular comprobante y mostrar la participación resultante.
- Mantener ocultos los números mientras el pago esté pendiente; revelarlos aleatoriamente solo al simular la aprobación.
- Mostrar claramente `PAGO PENDIENTE` y `RIFA COMPLETAMENTE VENDIDA — LISTA PARA SORTEO` cuando corresponda.
- Añadir una compra mock existente de 10 oportunidades por $10 para demostrar el estado pendiente sin números revelados.
- Crear la pantalla administrativa de Rifas Especiales para controlar ventas, cierre y aprobación simulada de participaciones.
- Crear la pantalla administrativa de Números Fortuna con los premios `02746 → $100` y `34872 → $500`, permitiendo activar, pausar y agregar configuraciones locales.
- Evitar cualquier función que asigne un Número Fortuna a un cliente; Administración solo configura números premiados y valores.
- Enlazar las nuevas pantallas desde Inicio, Cuenta y el panel administrativo sin alterar los demás módulos.

## Validación
- Probar compra pendiente, números ocultos y revelado posterior a aprobación.
- Confirmar que una rifa al 100% no permita nuevas compras y muestre el estado exacto.
- Confirmar que Números Fortuna se administra sin selección de clientes.
- Revisar móvil y escritorio sin desbordamiento horizontal, enlaces rotos ni errores de ejecución.

## Alcance técnico
- React + TypeScript, datos tipados en `src/data`, estado local y componentes existentes.
- Sin backend, autenticación real, pagos, base de datos ni APIs.
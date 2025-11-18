import * as React from 'react';

export function OrderConfirmationEmail({ code }: { code: string }) {
  return (
    <html lang="es">
      <body>
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu código digital único:</p>
        <pre>{code}</pre>
        <p>Guárdalo en un lugar seguro. Si necesitas asistencia responde este correo.</p>
      </body>
    </html>
  );
}

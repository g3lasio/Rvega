# R Vega Plastering

Sitio web de captación para R Vega Plastering, construido con React, Vite, TypeScript y Tailwind CSS. Incluye páginas para estuco exterior, plaster interior y lath/preparación, además de fotografías de obra seleccionadas y activos de marca oficiales.

## Ejecutar localmente

Instala dependencias y arranca el entorno de desarrollo:

```bash
pnpm install
pnpm dev
```

Para comprobar tipos y preparar una compilación de producción:

```bash
pnpm check
pnpm build
```

## Captación con Leadprime

El formulario de cotización envía nombre, teléfono, correo, ciudad, dirección opcional, tipo de proyecto, plazo, mensaje, contexto de Project Match Pro, consentimiento y atribución UTM al webhook autorizado de Leadprime. El widget oficial de Leadprime también está conectado desde `client/src/components/LeadprimeWidget.tsx`.

No sustituyas el identificador del widget ni el endpoint del webhook salvo que el administrador de R Vega entregue credenciales nuevas. Si se rota alguno, actualiza únicamente las constantes de integración y verifica CORS para el dominio final de Railway antes de publicar campañas.

## Despliegue manual en Railway

En Railway, crea un servicio desde este repositorio y usa estos comandos:

| Campo | Valor |
| --- | --- |
| Build Command | `pnpm install --frozen-lockfile && pnpm build` |
| Start Command | `pnpm start` |
| Node version | 22 o superior |

Las fotografías y logos usados por el sitio están versionados en `client/public/assets/`, por lo que esta versión no depende de archivos locales ni del almacenamiento del entorno de desarrollo.

## Credenciales y precisión comercial

La licencia pública indicada en el sitio es `#1114856`, clasificación `C-35`. Si la reemisión de la licencia a la nueva LLC sigue en trámite, no cambies ese texto para afirmar que la LLC es titular hasta completar el proceso correspondiente. Las fotos se describen de forma objetiva; no se incluyen reseñas o resultados de clientes inventados.

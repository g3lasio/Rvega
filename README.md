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

## Formulario de cotización

La interfaz del formulario está lista para un webhook. Antes de lanzar campañas, coloca una URL de endpoint habilitada para CORS en la constante `WEBHOOK_ENDPOINT` de `client/src/pages/Home.tsx`. El sitio no envía solicitudes a un tercero hasta que ese valor se configure.

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

# Mapa de cobertura — decisión de implementación

El sitio utilizará el componente de Google Maps ya incluido en el proyecto, no un iframe genérico. El mapa se presentará como una **vista de territorio**: base cartográfica reducida a tonos minerales, una capa circular de alcance aproximado, marcadores propios para las ciudades indicadas y una lista sincronizada de áreas atendidas.

La interacción permitirá seleccionar una ciudad o escribir una ubicación. El mapa enfocará el área, mostrará su relación con la cobertura regional y llevará el nombre de la ciudad al formulario de cotización. No promete disponibilidad automática: cada selección comunica que la cobertura final depende del alcance y el calendario.

La documentación de Google Maps confirma que los `AdvancedMarkerElement` admiten gráficos personalizados y que el estilo cloud permite controlar carreteras, etiquetas, edificios y puntos de interés mediante un `mapId`. En esta versión se empleará una capa visual propia sobre el mapa y marcadores HTML personalizados; si más adelante se proporciona un `mapId` de Google Cloud, se podrá afinar la cartografía sin reescribir la interfaz.

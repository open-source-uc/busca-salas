# Busca Salas

> [!WARNING]
> Este repositorio no está mantenido. Fue una de las primeras versiones de UbiCate, antes que se llamara así. La versión actual de UbiCate debería encontrarse en [este repositorio](https://github.com/open-source-uc/ubicate-v2), y la versión desarrollada luego de esta en [este repositorio](https://github.com/open-source-uc/ubicate).

App web para la búsqueda de salas en la Universidad Católica de Chile.

## SetUp

Para montar el proyecto se requiere [yarn](https://yarnpkg.com/)

```bash
# Instalar dependencias
yarn install
# Correr el servidor
yarn dev
# Armar la página
yarn build
```

## Errores comunes

### `ReferenceError: window is not defined`

Probablemente se está tratando de renderizar algo de Leaflet.
Leaflet (y react-leaflet) no están pensados para server-side-rendering,
ver esta [issue](https://github.com/PaulLeCam/react-leaflet/issues/45).

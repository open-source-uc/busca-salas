# Busca Salas

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

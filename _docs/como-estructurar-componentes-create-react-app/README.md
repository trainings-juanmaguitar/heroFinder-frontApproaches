# Cómo estructurar tus componentes con `create-react-app`

La estructura que queremos conseguir es esta 

```
.
├── components
│   ├── App
│   │   ├── index.css
│   │   └── index.js
│   ├── ListItem
│   │   ├── index.css
│   │   └── index.js
│   ├── ListResults
│   │   ├── index.css
│   │   └── index.js
│   ├── Search
│   │   ├── index.css
│   │   └── index.js
│   └── index.js
├── config.js
├── index.css
├── index.js
└── services
    └── index.js
```

Y la manera en la queremos poder llamar a los componentes desde cualquier archivo (esté en el nivel de subcarpetas que esté) es esta

```
import { Search, ListResults } from 'components';
```

Para ello tenemos que configurar dos cosas:

- `... from 'components'` → Configurar `src` como carpeta base (de la misma manera que por defecto lo está `node_modules`) para que cualquier ruta que no sea absoluta o relativa la busque a partir de ahí (despues de mirar si es un modulo instalado en `node_modules`)

- `import { Search, ListResults } from ...` → Configurar nuestros componentes para que queden _exportados_ desde la raiz de `components` (desde un `index.js` en esta carpeta) teniendolos centralizados y simplificando su importación de esta manera

## Ventajas de esta estructura

- Es escalable → podemos organizar grupos de componentes facilmente
- Evita el problema de las rutas relativas `import Search from '../../../Search`
- Simplifica la creación de componentes y su mantenimiento → Los componentes y todo lo relacionado con cada uno son faciles de crear y de localizar

## Cómo configurar `src` como carpeta base

Hay muchas manera de hacer esto dependiendo del entorno de trabajo que tengamos, pero para una app creada con `create-react-app` sólo tenemos que crear un `.env` en la raiz del proyecto (al mismo nivel que `package.json`) seteando la variable de entorno `NODE_PATH`

**`.env`**
```
NODE_PATH='src/'
```

Más info [aqui](https://medium.com/@ktruong008/absolute-imports-with-create-react-app-4338fbca7e3d)

## Cómo _centralizar_ nuestros componentes en `components`

Para ello crearemos un `index.js` en `components` donde exportaremos los componentes importados de esta manera

```
export { default as App } from './App'
export { default as Search } from './Search'
export { default as ListResults } from './ListResults'
export { default as ListItem } from './ListItem'
```

Esta idea la podríamos replicar en diferentes carpeta para agrupar componentes relacionados

---

Con esta configuración, desde cualquier archivo ya podemos importar asumiendo que nuestra ruta base es `src` y que en `components` tenemos toda nuestra coleción de componentes. Es decir podemos hacer...

**`src/components/App.js`**
```
import { Search, ListResults } from 'components';
import * as serviceApi from 'services/serviceApiMarvel'
```

**`src/components/ListResults.js`**
```
import { ListItem } from "components"
```


## Recursos

- <https://medium.com/@ktruong008/absolute-imports-with-create-react-app-4338fbca7e3d>
- <https://medium.com/@kkomaz/another-solution-to-absolute-path-setup-in-create-react-app-cccb38d8eea8>
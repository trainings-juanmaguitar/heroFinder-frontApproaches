# 5 ideas claras sobre desarrollo con componentes en Vue

Vengo de desarrollar intensamente con React y Angular.js, (sobre todo React ultimamente) y ahora estoy aprendiendo Vue.js

Hay algunas cosas que me han llamado especialmente la atención al desarrollar una app con Vue.js viniendo de estos frameworks, asi que las quería dejar escritas

## 1.- [`vue-cli`](https://github.com/vuejs/vue-cli/blob/dev/docs/README.md)

Igual que con [`create-react-app`](https://github.com/facebook/create-react-app) podemos crear rapidamente el entorno para trabajar en un app React, con [`vue-cli`](https://github.com/vuejs/vue-cli/blob/dev/docs/README.md) podemos crear el entorno para crear aplicaciones Vue.

Para ello no tenemos más que instalar este modulo globalmente `npm install -g @vue/cli` para luego poder hacer...

```
vue create my-project
```

Esto nos creará una carpeta con app vue.js base con todas las dependencias, configuraciones y scripts necesarios para empezar a trabajar con Vue.js.

Entre las cosas interesantes que incorpora este entorno de desarrollo, es que la ruta `src` está seteada con el alias `@` lo que simplifica la importación de archivos (desde cualquier nivel)

**`src/components/App.vue`**
```
import * as serviceApi from '@/services/serviceApiMarvel'
import { Search, ListResults } from '@/components'
```

Más detalles sobre las posibilidades de este entorno de trabajo creado con `vue-cli` [aqui](https://github.com/vuejs/vue-cli/blob/dev/docs/README.md)

## 2.- La estructura de un componente `.vue`

En cada archivo `.vue` podemos tener todo lo relacionado con el componente separado por los tags:
- `<template>` → El HTML del componente con _habilidades_ extra proporcionadas por vue
- `<script>` → El JS que gestiona el componente. Aqui podemos importar modulos npm y otros archivos del proyecto
- `<style scoped>` → Los estilos que con `scoped` quedan restringidos al HTML de `template`

**`src/components/Title.vue`**

```
<template>
  <h1 class="Title">{{ text }}</h1>
</template>

<script>
export default {
  props: {
    text: String
  }
};
</script>

<style scoped>
.Title {
  color: blue;
}
</style>

```



## 3.- Cómo pasar datos entre componentes

Para pasar datos entre componentes utilizamos o directivas (al igual que se hace en angular) o atributos con los datos que espera el componente

**`src/components/App.vue`**
```javascript
<template>
  <div class=".App">
    <Title text="Super App" />
    <TextBox 
      :name="name" 
      @click="changeName($event)"
    />
    <span>Times Changed: {{ times }}</span>
  </div>
</template>

<script>
import { Title, TextBox } from "@/components";

export default {
  data() {
    return {
      times: 0,
      name: "JuanMa"
    };
  },
  components: {
    TextBox,
    Title
  },
  methods: {
    changeName: function(newName) {
      this.times++;
      this.name = newName;
    }
  }
};
</script>

<style scoped>
.App {
}
</style>

```

**`src/components/TextBox.vue`**
```
<template>
  <div class=".Text">
    <p>
      <strong @click="handleClick" >{{ name }}</strong>
      <small> (click to change)</small>
    </p> 
    <p>Num Characters: <em> {{ numCharacters() }}</em></p>
  </div>
</template>

<script>
import faker from "faker";

export default {
  props: {
    name: String
  },
  methods: {
    handleClick() {
      this.$emit("click", faker.name.findName());
    },
    numCharacters() {
      return this.name.length;
    }
  }
};
</script>

<style scoped>
.Text {
}
</style>
```

[![Edit Vue Template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/nkj311k870)

#### Para datos estáticos

```
<Title text="Super App" />
```

El componente `Title` tiene que definir `text` como una de sus `props`

```
export default {
  props: {
    name: String
  }
  ...
}
```

Con esto ya podremos utilizarlo en su `template`
```
<h1 class="Title">{{ text }}</h1>
```

#### Para datos dinamicos

Podemos _"bindear"_ datos (variables) a componentes hijos, de manera que si el dato cambia en el padre, se actualiza en el hijo automaticamente (se renderiza el componente hijo de nuevo con el dato y todos los datos que éste, actualizados)

Para ello utilizamos la directiva `v-bind:title` (abreviado `:title`) 

```
<TextBox  v-bind:name="name" ... />
```

o

```
<TextBox  :name="name" ... />
```

## 4.- Cómo pasar métodos entre componentes

Si queremos que un componente hijo ejecute una función definida en el padre, lo que hacemos es pasar un evento customizado al hijo asociandolo con un metodo del padre, y desde el hijo emitir ese evento en un momento dado (lo que provocará la ejecución del método en el padre)


**`src/components/App.vue`**
```javascript
<template>
  <TextBox 
      ...
      @name-click="changeName($event)"
    />
</template>

<script>

export default {
  ...,
  methods: {
    changeName: function(newName) {
      this.times++;
      this.name = newName;
    }
  }
};
</script>
```

**`src/components/TextBox.vue`**
```javascript
<template>
  ...
    <strong @click="handleClick" >{{ name }}</strong>
  ...
</template>

<script>

export default {
  ...,
  methods: {
    handleClick() {
      this.$emit("name-click", faker.name.findName());
    }
  }
};
</script>
```

## 5.- Los mismos tipos de directivas que en angular

En vue, tenemos un montón de directivas muy parecidas a las disponibles en angular:

- `v-if="showMessage"` → renderiza o no el tag en base a una condición
- `v-bind:class="{ moreThan3: hobbies.length > 3 }"` → añade o no una clase en base a una condición
- `v-bind:style="{ backgroundColor: getColor(element)}"` → añade o no estilos en linea en base a una condición 
- `v-bind:id="'el' + element"` → argumentos nativos construidos en base a un valor dinámico del componente Vue

Más detalles sobre directivas vue [aqui](https://styde.net/introduccion-a-las-directivas-de-vue-js-con-v-if-v-show-y-v-else/)
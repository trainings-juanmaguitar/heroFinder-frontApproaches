# 5 ideas claras sobre desarrollo con componentes en Vue

Vengo de desarrollar en varios frameworks (Angular.js, React y Vue) y estoy realizando mis primeras aplicaciones con Angular 6

En mi experiencia como profesor (y como alumno) angular es el framework que he encontrado menos atractivo y más difícil de aprender, comparándolo con React y Vue

De mis primeras aplicaciones con angular 6 saco estas 5 lecciones 


## 1.- [`angular-cli`](https://github.com/angular/angular-cli)

Igual que con [`create-react-app`](https://github.com/facebook/create-react-app) o que con [`vue-cli`](https://github.com/vuejs/vue-cli/blob/dev/docs/README.md), con [`angular-cli`](https://github.com/angular/angular-cli) podemos crear rapidamente el entorno para trabajar en una app Angular

Para ello no tenemos más que instalar este modulo globalmente `npm install -g @angular/cli` para luego poder hacer...

```
ng new PROJECT-NAME
```

Esto nos creará una carpeta con app angular base con todas las dependencias, configuraciones y scripts necesarios para empezar a trabajar con Angular en su última versión (la 6.x a día de hoy).

Puesto que la configuración de elementos en angular requiere de un poco más de código que en otros frameworks, este `cli` nos servirá no sólo para crear un proyecto nuevo, sino también para crear los diferentes elementos de angular que vayamos necesitando. Angular se encargará de crear el contenido base y las conexiones en los archivos adecuados para que todo funcione de primeras, y no tengamos más que _ampliar_ el código con nuestra funcionalidad

- Para crear un componente → `ng g component my-new-component`
- Para crear un servicio → `ng g service my-new-service`
- Para crear un modulo → `ng g module my-module`

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
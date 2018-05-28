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

## 2.- Ojo a la la definición del módulo 

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from "@angular/forms"

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ListResultsComponent } from './list-results/list-results.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListResultsComponent,
    ListItemComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Todos los componentes que queramos utilizar tienen que formar parte de un módulo así que hay que asegurarse que nuestros componentes esten el `declarations` de algún módulo

```
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListResultsComponent,
    ListItemComponent
  ],
  ...
})
```

El módulo principal (normalmente `app.module.ts`) será el que se encargue de cargar la aplicación (normalmente a partir de un componente `app.component.ts` que se cargará en un `<app-root>` del `index.html`)

```
@NgModule({
  ...
  bootstrap: [AppComponent]
})
```

Este módulo tiene que cargar los modulos de core que necesiten sus componentes:

```
@NgModule({
  ...
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  ...
})
```

- `HttpClientModule` → necesario si algun componente utiliza algun servicio que requiera de este modulo (por inyección),
- `BrowserModule` → Este sólo lo necesitará el modulo principal (App)
- `FormsModule` → Carga directivas relacionadas con forms. La más importante → [`[(ngModel)]`](https://angular.io/api/forms/NgModel)

Más info sobre esto [aqui](https://medium.com/@michelestieven/organizing-angular-applications-f0510761d65a)

## 3.- Cómo pasar datos entre componentes

Para pasar datos a un componente hijo, tenemos que preparar al hijo para que reciba estos datos

```
import { ... Input ... } from '@angular/core';

...

export class ListItemComponent implements OnInit {

  @Input() data: any = {}
  srcImage: string = ''
  
  ngOnInit() {
    const { path, extension } = this.data.thumbnail
    this.srcImage = `${path}.${extension}`
  }

}
```

Con esto ya podemos hacer desde el padre 

```
<app-list-item [data]="result"></app-list-item>
```

El `[]` que encierra especifica que el binding es de una sola direccion : del padre al hijo (es decir si se actualiza el dato en el padre, se actualiza automaticamente en el hijo)

Si no ponemos `[]` no se define binding, lo cual es útil para carga estática de datos (textos y demás)

Más info de esto [aqui](https://toddmotto.com/passing-data-angular-2-components-input)

## 4.- Cómo pasar métodos entre componentes

Si queremos que un componente hijo ejecute una función definida en el padre, tenemos que preparar al hijo para que acepte un atributo tipo `@Output`

```javascript
import { ... Output, EventEmitter } from '@angular/core';

... 
export class SearchComponent {
  query: string = ''
  @Output() search = new EventEmitter();
  
  submitSearch(event) {
    event.preventDefault()
    this.search.emit(this.query);
  }

}
```

La idea es que que definimos un evento customizado (puede tener el nombre que queramos: `search`, `click`, `change`...)

```
@Output() search = new EventEmitter();
```

y que desde el hijo, en un momento dado, lanzemos ese evento con la info correspondiente

```
 this.search.emit(this.query);
```

Con esto, desde el padre podremos engancharle a este evento una función suya...

```
<app-search (search)="getHeroes($event)"></app-search>
```

Que recibirá los datos con los que emitimos el evento 

`getHeroes($event)` recibe el dato mandado por `this.search.emit(this.query);` en este caso `this.query`, pero podrian ser más valores


```
...
import { ApiMarvelService } from './api-marvel.service';

export class AppComponent {
  results = [];
  constructor(
    public apiMarvelService: ApiMarvelService
  ) {}

  getHeroes(query) {
    this.apiMarvelService.searchHeroes(query)
      .subscribe(({ data: { results } }) => this.results = results);
  }
}
```

Más info de esto [aqui](https://toddmotto.com/component-events-event-emitter-output-angular-2)

## 5.- Servicios y Observables

En angular las peticiones a las API se manejan con Observables, que nos permiten manejar mucho más que peticiones al servidor.
Un observable es un objeto al que nos podemos subscribir con una función, de tal manera que cuando este Observable cambie, la función suscrita se ejecutará con los datos correspondientes

```

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { PUBLIC_KEY } from '../config.js'
const BASE_URL_API = "https://gateway.marvel.com/v1/public/"

const getUrlApiSearch = query =>
  `${BASE_URL_API}characters?nameStartsWith=${query}&apikey=${PUBLIC_KEY}`

@Injectable({
  providedIn: 'root'
})
export class ApiMarvelService {

  constructor(
    public http: HttpClient
  ) {}

   searchHeroes (query='spider'): Observable<any> {
    const url = getUrlApiSearch(query)
    return this.http.get(url)
  }

}
```

Definimos con typescript que lo que va a devolver nuestro metodo es un observable

```
   searchHeroes (query='spider'): Observable<any> { ... }
```

que luego consumiremos asi

```
getHeroes(query) {
    this.apiMarvelService.searchHeroes(query)
      .subscribe(({ data: { results } }) => this.results = results);
  }
```

Como podemos ver, nos suscribimos con una función al Obervable devuelto.
Esta estructura es muy parecida al `.then` de las promesas, pero con Observables podemos hacer muchas mas cosas
# Native Modular Components | proof of concept

This repo is for demonstrating the use case of using components-like structures to split the logic into isolated pieces

It can be seen online at: https://native-js-modular-components-demo-xzhfwtdjqh.now.sh/


This demo demonstrates:

- The use of classes to create components-like structures
- The use of a separate template files per component
- The use of a separate styles.css per component
- How [we can use ES6 modules in some browsers](https://caniuse.com/#feat=es6-module)
- How we can _mount_ components into specific parts of our DOM
- A very basic implemenation of a Publish/Subscribe pattern that serves to communicate components

> Note: The performance of a real project w/ this structure would be horrible but i think it's interesting to understand better some structures used in some popular frameworks like React

```
.
├── css
│   └── styles.css
├── index.html
└── js
    ├── app.js
    ├── components
    │   ├── App
    │   │   ├── index.js
    │   │   └── template.js
    │   ├── ListItem
    │   │   ├── index.js
    │   │   ├── styles.css
    │   │   └── template.js
    │   ├── ListResults
    │   │   ├── index.js
    │   │   ├── styles.css
    │   │   └── template.js
    │   └── Search
    │       ├── index.js
    │       └── template.js
    ├── config.js
    ├── libs
    │   └── EventEmitter.js
    └── services
        └── serviceApiMarvel.js
```


## Local Installation 

Clone the repo and add a `js/config.js` w/ your PUBLIC_KEY

```
export const PUBLIC_KEY = "<%YOUR_PUBLIC_KEY%>"
```

> Replace `<%YOUR_PUBLIC_KEY%>` w/ your Public Key got from your Marvel Developer Account

Launch a local server and add your local url (usually `localhost`) to your authorized referrers in your Marvel Developer Account

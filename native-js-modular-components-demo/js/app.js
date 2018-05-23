import App from "./components/App/index.js"

window.onload = () => {
  const elem = document.querySelector("#app")
  new App(elem).init()
}

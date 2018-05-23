import * as Template from "./template.js"
import { searchSuperHero } from "../../services/serviceApiMarvel.js"
import EventEmitter from "../../libs/EventEmitter.js"

export default class Search {
  constructor(mountPoint) {
    this.mountPoint = mountPoint
  }

  init() {
    this.mount()
    this.addEventListeners()
  }

  addEventListeners() {
    const searchBlock = document.querySelector(".Search")
    const inputQuery = document.querySelector(".Search-input")

    searchBlock.addEventListener("submit", event => {
      event.preventDefault()
      const query = inputQuery.value
      searchSuperHero(query).then(results => {
        EventEmitter.publish("resultsSearchReady", results)
      })
    })
  }

  mount() {
    this.mountPoint.innerHTML = this.render()
  }

  render() {
    return Template.render()
  }
}

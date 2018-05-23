import * as Template from "./template.js"
import EventEmitter from "../../libs/EventEmitter.js"

import Search from "../Search/index.js"
import ListResults from "../ListResults/index.js"

export default class App {
  constructor(mountPoint) {
    this.mountPoint = mountPoint
  }

  init() {
    this.mount()
    this.mountChildren()
    EventEmitter.subscribe("resultsSearchReady", results => {
      console.log("resultsSearchReady subscription...")
      console.log(results)
    })
  }

  mountChildren() {
    const searchBlock = document.querySelector("search-block")
    new Search(searchBlock).init()

    const listResults = document.querySelector("list-results")
    new ListResults(listResults).init()
  }

  mount() {
    this.mountPoint.innerHTML = this.render()
  }

  render() {
    return Template.render()
  }
}

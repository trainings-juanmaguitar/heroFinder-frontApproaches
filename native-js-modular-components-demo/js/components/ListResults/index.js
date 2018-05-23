import * as Template from "./template.js"
import EventEmitter from "../../libs/EventEmitter.js"

export default class ListResults {
  constructor(mountPoint) {
    this.mountPoint = mountPoint
  }

  setState(results) {
    this.state = {
      results
    }
  }

  init() {
    EventEmitter.subscribe("resultsSearchReady", results => {
      this.setState(results)
      this.mount()
    })
  }

  mount() {
    this.mountPoint.innerHTML = this.render()
  }

  render() {
    return Template.render(this.state.results)
  }
}

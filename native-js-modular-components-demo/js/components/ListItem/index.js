import * as Template from "./template.js"

export default class ListItem {
  
  setState(result) {
    this.state = {
      result
    }
    return this
  }

  render() {
    return Template.render(this.state.result)
  }
}

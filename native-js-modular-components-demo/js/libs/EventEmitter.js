export default {
  _events: {},
  publish: function(event, data) {
    if (!this._events[event]) return // no one is listening to this event
    this._events[event].forEach(callback => callback(data))
  },
  subscribe: function(event, callback) {
    if (!this._events[event]) this._events[event] = [] // new event
    this._events[event].push(callback)
  }
}

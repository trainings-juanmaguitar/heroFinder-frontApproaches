import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }

  handleChange = e => {
    const query = e.target.value
    this.setState({ query })
  }

  handleSubmit = e => {
    e.preventDefault()
    const {query} = this.state
    this.props.search(query)
  }

  render() {
    return (
      <form className="Search form-inline" onSubmit={ this.handleSubmit }>
        <label className="sr-only">Name</label>
        <input 
          type="text" 
          className="Search-input form-control mb-2 mr-sm-2" 
          placeholder="Ex: Captain America" 
          value={ this.state.value }
          onChange={ this.handleChange }
        />
        <button type="submit" className="btn btn-primary mb-2">Submit</button>
      </form>    
    )
  }
}

export default Search;

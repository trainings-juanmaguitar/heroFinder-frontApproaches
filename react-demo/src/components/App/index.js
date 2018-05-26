import React, { Component } from 'react';
import { Search, ListResults } from 'components';
import * as serviceApi from 'services/serviceApiMarvel'

class App extends Component {
  constructor() {
    super()
    this.state = {
      results : []
    }
  }

  searchSuperHero = query => {
    serviceApi.searchSuperHero(query)
      .then( results => this.setState({ results })) 
  }

  render() {
    const { results } = this.state
    return (
      <div className="App">
        <div className="container">
          <h1>SuperHero Finder</h1>
          <Search search={ this.searchSuperHero } />
          <ListResults results={ results } />
        </div>
      </div>
    )
  }
}

export default App;

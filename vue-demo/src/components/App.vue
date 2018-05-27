<template>
  <div class="App">
    <div class="container">
      <h1>SuperHero Finder</h1>
      <Search v-on:do-search="searchSuperHero($event)"/>
      <ListResults v-bind:results="results"/>
    </div>
  </div>
</template>

<script>
import * as serviceApi from '@/services/serviceApiMarvel'
import { Search, ListResults } from '@/components'

export default {
  data() {
    const results = []
    return { results }
  },
  components: {
    Search, 
    ListResults
  },
  methods: {
    searchSuperHero: function(query) {
      serviceApi.searchSuperHero(query)
        .then( results => {
          this.results = results
        }) 
    }
  }
}
</script>
import ListItem from '../ListItem/index.js'

export const render = results => {
  return `
<ul class="ListResults">
    ${
      results
        .map(result => (new ListItem().setState(result).render() ) ) 
        .join('')
    }
</ul>`
}

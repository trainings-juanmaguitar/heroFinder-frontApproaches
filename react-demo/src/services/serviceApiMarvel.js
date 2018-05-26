import { PUBLIC_KEY } from '../config.js'
const BASE_URL_API = "https://gateway.marvel.com/v1/public/"

const getUrlApiSearch = query =>
  `${BASE_URL_API}characters?nameStartsWith=${query}&apikey=${PUBLIC_KEY}`

export const searchSuperHero = query => {
  const url = getUrlApiSearch(query)
  return fetch(url)
    .then(response => response.json())
    .then(({ data: { results } }) => results)
}

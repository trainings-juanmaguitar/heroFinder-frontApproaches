import React from "react"
import { ListItem } from "components"

import "./index.css"

const ListResults = ({ results }) => (
  <ul className="ListResults">
    {
      results && results.map( result => <ListItem result={ result }/>)
    }
  </ul>
)

export default ListResults

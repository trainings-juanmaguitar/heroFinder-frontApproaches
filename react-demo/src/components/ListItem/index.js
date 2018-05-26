import React from "react"
import "./index.css"

const ListItem = ({ result: { name, description, thumbnail}}) => {
  const { path, extension } = thumbnail
  const srcImage = `${path}.${extension}`
  return (
    <li className="ListItem">
      <div className="card">
        <img
          className="card-img-top"
          src={srcImage}
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </li>
  )
}
  

export default ListItem

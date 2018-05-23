export const render = result => {
  return `
<li class="ListItem">
  <div class="card">
    <img class="card-img-top" src="${result.thumbnail.path}.${
    result.thumbnail.extension
  }" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${result.name}</h5>
      <p class="card-text">${result.description}</p>
    </div>
  </div>
</li>`
}

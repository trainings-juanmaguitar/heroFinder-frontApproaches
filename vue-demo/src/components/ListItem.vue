<template>
  <li class="ListItem">
    <div class="card">
      <img
        class="card-img-top"
        :src="srcImage"
        alt=""
      />
      <div class="card-body">
        <h5 class="card-title">{{ result.name }}</h5>
        <p class="card-text">{{ result.description }}</p>
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    data({ result: { name, description, thumbnail }}) {
      const { path, extension } = thumbnail
      const srcImage = `${path}.${extension}`
      return { name, description, srcImage }
    },
    props: {
      result: Object
    }
  }
</script>

<style scoped>
  .ListItem {
    display: inline-block;
    width: 100%;
    margin: 1rem 0;
  }
</style>


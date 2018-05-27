<template>
  <form class="Search form-inline" @submit.prevent="handleSubmit">
    <label class="sr-only">Name</label>
    <input 
      type="text" 
      class="Search-input form-control mb-2 mr-sm-2" 
      placeholder="Ex: Captain America" 
      v-model="query"
    />
    <button type="submit" class="btn btn-primary mb-2">Submit</button>
  </form>    
</template>

<script>
  // https://alligator.io/vuejs/vue-form-handling/

  export default {
    data() {
      const query = ''
      return { query }
    },
    methods: {
      handleSubmit() {
        this.$emit('do-search', this.query)
      }
    }
  }
</script>

<template>
  <ul class="ListResults">
    <ListItem 
      :key="result.id" 
      :result="result" 
      v-for="result in results" 
    />
  </ul>
</template>

<script>
  import { ListItem } from '@/components'

  export default {
    components: {
      ListItem
    },
    props: {
      results: Array
    }
  }
</script>

<style scoped>
  .ListResults {
    padding:0;
    list-style: none;
  }

  @media (min-width: 576px) {
    .ListResults { column-count: 2; }
  }

  @media (min-width: 768px) {
    .ListResults { column-count: 3; }
  }

  @media (min-width: 992px) {
    .ListResults { column-count: 4; }
  }

  @media (min-width: 1200px) {
    .ListResults { column-count: 5; }
  }
</style>

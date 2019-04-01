<template>
  <div class="list-group">
    <a class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between"  v-for="category in categories" :key="category.no">
          <span class="mb-1" v-if="category.no === item.category_no">{{category.name}}</span>
          <small v-if="category.no === item.category_no">{{item.no}}</small>
      </div>
        
      <div>
        <span>{{item.email}}</span> |
        <span>{{item.updated_at}}</span>
      </div>

      <p class="mb-1">{{item.title}}</p>

      <div>
        <small>{{item.contents}}</small>
      </div>
      
    </a>

  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    item: Object,
    categories: Array
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>

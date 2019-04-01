<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <List v-for="item in items" :key="item.no" :item="item" :categories="categories"/>
  </div>
</template>

<script>
import List from "./components/List.vue";
import listItem from "./datas/listItem.json";
import categoryItem from "./datas/categoryItem.json";

export default {
  name: "app",
  components: {
    List
  },
  data() {
    return {
      items: listItem.list,
      categories: categoryItem.list
    };
  }
};
</script>

<style lang='less'>
</style>

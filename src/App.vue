<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div>
      <button type="button" class="btn btn-info">필터</button>

      <div class="btn-group btn-group-toggle btn-sort" data-toggle="buttons">
        <label class="btn btn-secondary active" v-on:click="sortClickHandler(false)">
          <input type="radio" id="option1" autocomplete="off" checked> 오름차순
        </label>
        <label class="btn btn-secondary" v-on:click="sortClickHandler(true)">
          <input type="radio" id="option2" autocomplete="off"> 내림차순
        </label>
      </div>
    </div>

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
  },
  methods: {
    sortClickHandler: function(isDesc) {
      if (isDesc) {
        // 내림차순
        this.items.sort(function(a, b) {
          return +a.no > +b.no ? -1 : +a.no < +b.no ? 1 : 0;
        });
      } else {
        // 올림차순
        this.items.sort(function(a, b) {
          return +a.no < +b.no ? -1 : +a.no > +b.no ? 1 : 0;
        });
      }
    }
  }
};
</script>

<style lang='less'>
.btn-sort {
  float: right;
}
</style>

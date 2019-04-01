<template>
  <div class="container">
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

    <div v-for="(item, index) in allItems" :key="index">
      <List v-if="index % 4 !== 3" :item="item" :categories="categories"/>
      <Ads v-if="index % 4 === 3" :item="item"/>
    </div>

    <button v-on:click="nextPageHandler">다음페이지</button>
  </div>
</template>

<script>
import List from "./components/List.vue";
import Ads from "./components/Ads.vue";
import listItem from "./datas/listItem.json";
import categoryItem from "./datas/categoryItem.json";
import adsItem from "./datas/adsItem.json";

export default {
  name: "app",
  components: {
    List,
    Ads
  },
  data() {
    return {
      items: listItem.list,
      categories: categoryItem.list,
      adsItems: adsItem.list,
      allItems: [],
      page: 1
    };
  },
  mounted() {
    for (let i = 0; i < this.items.length; i++) {
      if (i % 4 === 3) {
        this.allItems.push(this.adsItems.shift());
      } else {
        this.allItems.push(this.items[i]);
      }
    }
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
    },
    nextPageHandler: function() {
      this.page += 1;
      this.getAdsSevice();
    },
    getAdsSevice: function() {
      if (this.page % 2 === 0) {
        // limit 3
      } else {
        // limit 2
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

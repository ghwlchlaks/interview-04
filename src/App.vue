<template>
  <div class="container">
    <div>
      <button type="button" class="btn btn-info" v-on:click="showModal=true">필터</button>

      <div class="btn-group btn-group-toggle btn-sort" data-toggle="buttons">
        <label class="btn btn-secondary active">
          <input type="radio" id="option1" autocomplete="off" checked> 오름차순
        </label>
        <label class="btn btn-secondary">
          <input type="radio" id="option2" autocomplete="off"> 내림차순
        </label>
      </div>
    </div>

    <div v-for="(item, index) in allItems" :key="index">
      <List v-if="index % 4 !== 3" :item="item" :categories="categories"/>
      <Ads v-if="index % 4 === 3" :item="item"/>
    </div>

    <button v-on:click="nextPageHandler">다음페이지</button>

    <filter-modal
      v-if="showModal"
      :categories="categories"
      :savedCategories="selectedCategories"
      v-on:categorySave="categorySave"
    />
  </div>
</template>

<script>
import List from "./components/List.vue";
import Ads from "./components/Ads.vue";
import FilterModal from "./components/FilterModal.vue";
// import listItem from "./datas/listItem.json";
// import categoryItem from "./datas/categoryItem.json";
// import adsItem from "./datas/adsItem.json";

export default {
  name: "app",
  components: {
    List,
    Ads,
    FilterModal
  },
  data() {
    return {
      items: [],
      categories: [],
      adsItems: [],
      allItems: [],
      page: 1,
      showModal: false,
      selectedCategories: [],
      ord: "asc"
    };
  },
  created() {
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.nextPageHandler();
      }
    });
  },
  mounted() {
    this.$http.get("http://comento.cafe24.com/category.php").then(result => {
      if (result.data.code === 200 && result.status === 200) {
        this.categories = [].concat(result.data.list);
        for (let i = 0; i < this.categories.length; i++) {
          this.selectedCategories = [
            ...this.selectedCategories,
            {
              name: this.categories[i].name,
              no: this.categories[i].no,
              checked: true
            }
          ];
        }

        let category = "";
        this.selectedCategories.map((value, index) => {
          if (index !== this.selectedCategories.length - 1) {
            category += value.no + ",";
          } else {
            category += value.no;
          }
        });

        const getItems = this.$http.get(
          `http://comento.cafe24.com/request.php?page=${this.page}&ord=${
            this.ord
          }&category=${category}`
        );

        const getAds = this.$http.get(
          `http://comento.cafe24.com/ads.php?page=${this.page}&limit=5`
        );

        Promise.all([getItems, getAds]).then(values => {
          for (let i = 0; i < values[0].data.list.length; i++) {
            if (i % 4 === 3) {
              this.allItems.push(values[1].data.list.shift());
              // console.log(values[1].data.list);
            } else {
              this.allItems.push(values[0].data.list[i]);
            }
          }
        });
      }
    });
  },
  methods: {
    nextPageHandler: function() {
      console.log("test");
      // this.page += 1;
      // this.getAdsSevice();
    },
    getAdsSevice: function() {
      if (this.page % 2 === 0) {
        // limit 3
      } else {
        // limit 2
      }
    },
    filterClickHandler: function() {},
    categorySave: function(categories) {
      // categories 배열로 전달 받음
      this.selectedCategories = [].concat(categories);
      console.log(this.selectedCategories);
      this.closeModal();
    },
    closeModal: function() {
      this.showModal = false;
    }
  }
};
</script>

<style lang='less'>
.btn-sort {
  float: right;
}
</style>

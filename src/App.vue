<template>
  <div class="container">
    <div>
      <button type="button" class="btn btn-info" v-on:click="showModal=true">필터</button>

      <div class="btn-sort">
        <input
          type="radio"
          value="asc"
          v-on:change="sortChangeHandler"
          v-model="picked"
          :checked="picked === ord"
        >
        <label for="one">오름차순</label>
        <input
          type="radio"
          value="desc"
          v-on:change="sortChangeHandler"
          v-model="picked"
          :checked="picked === ord"
        >
        <label for="two">내림차순</label>
      </div>
    </div>

    <div v-for="(item, index) in allItems" :key="index">
      <List v-if="index % 4 !== 3" :item="item" :categories="categories"/>
      <Ads v-if="index % 4 === 3" :item="item"/>
    </div>

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
      ord: "asc",
      adsPage: 1,
      picked: "asc",
      category: ""
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
    this.initialList();
  },
  methods: {
    sortChangeHandler: function() {
      this.ord = this.picked;
      this.initialChangeList();
    },

    initialList: function() {
      this.allItems = [];
      this.adsPage = 1;
      this.page = 1;

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

          this.selectedCategories.map(value => {
            if (value.checked) {
              this.category += value.no + ",";
            }
          });
          this.category = this.category.substring(0, this.category.length - 1);

          const getItems = this.$http.get(
            `http://comento.cafe24.com/request.php?page=${this.page}&ord=${
              this.ord
            }&category=${this.category}`
          );

          const getAds = this.$http.get(
            `http://comento.cafe24.com/ads.php?page=${this.adsPage}&limit=5`
          );

          Promise.all([getItems, getAds]).then(values => {
            this.adsItems = [].concat(values[1].data.list);
            for (let i = 0; i < values[0].data.list.length; i++) {
              if (this.allItems.length % 4 === 3 && this.allItems.length > 0) {
                this.allItems.push(this.adsItems.shift());
                i -= 1;
              } else {
                this.allItems.push(values[0].data.list[i]);
              }
            }
          });
        }
      });
    },

    nextPageHandler: async function() {
      this.page += 1;

      this.category = "";
      this.selectedCategories.map(value => {
        if (value.checked) {
          this.category += value.no + ",";
        }
      });
      this.category = this.category.substring(0, this.category.length - 1);

      const itemList = await this.$http
        .get(
          `http://comento.cafe24.com/request.php?page=${this.page}&ord=${
            this.ord
          }&category=${this.category}`
        )
        .then(result => {
          if (result.data.code === 200 && result.status === 200) {
            return result.data.list;
          }
        });

      for (let i = 0; i < itemList.length; i++) {
        if (this.allItems.length % 4 === 3 && this.allItems.length > 0) {
          this.allItems.push(this.adsItems.shift());
          if (!this.adsItems.length) {
            this.adsPage += 1;
            await this.$http
              .get(
                `http://comento.cafe24.com/ads.php?page=${this.adsPage}&limit=5`
              )
              .then(adsResult => {
                this.adsItems = [].concat(adsResult.data.list);
              });
          }
          i -= 1;
        } else {
          this.allItems.push(itemList[i]);
        }
      }
    },
    initialChangeList: function() {
      this.allItems = [];
      this.adsPage = 1;
      this.page = 1;

      this.category = "";
      this.selectedCategories.map(value => {
        if (value.checked) {
          this.category += value.no + ",";
        }
      });
      this.category = this.category.substring(0, this.category.length - 1);

      const getItems = this.$http.get(
        `http://comento.cafe24.com/request.php?page=${this.page}&ord=${
          this.ord
        }&category=${this.category}`
      );

      const getAds = this.$http.get(
        `http://comento.cafe24.com/ads.php?page=${this.adsPage}&limit=5`
      );

      Promise.all([getItems, getAds]).then(values => {
        this.adsItems = [].concat(values[1].data.list);
        for (let i = 0; i < values[0].data.list.length; i++) {
          if (this.allItems.length % 4 === 3 && this.allItems.length > 0) {
            this.allItems.push(this.adsItems.shift());
            i -= 1;
          } else {
            this.allItems.push(values[0].data.list[i]);
          }
        }
      });
    },
    categorySave: function(categories) {
      // categories 배열로 전달 받음
      this.selectedCategories = [].concat(categories);
      this.initialChangeList();
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

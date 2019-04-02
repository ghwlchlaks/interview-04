<template>
  <div class="list-group-item">
    <div class="row" style="padding-left: 20px;">Sponsored</div>
    <div class="row">
      <div class="col-md-3">
        <img :src="getImgUrl()" :alt="item.img" style="max-width: 100%; height:auto;">
      </div>
      <div class="col-md-9">
        <span>{{item.title}}</span>
        <p>{{item.contents}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ads",
  props: {
    item: Object
  },
  methods: {
    getImgUrl: function() {
      return `http://comento.cafe24.com/public/images/${this.item.img}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>

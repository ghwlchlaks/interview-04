<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="row">
          <div class="col">필터</div>

          <div class="col close-container">
            <button class="close" v-on:click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>

        <div class="row check-container">
          <div class="form-check col-4" v-for="(category, index) in savedCategories" :key="index">
            <input type="checkbox" :value="category.name" v-model="category.checked">
            <label>{{category.name}}</label>
          </div>
        </div>
        {{savedCategories}}
        <div class="modal-footer">
          <button v-on:click="categorySave">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterModal",
  props: {
    savedCategories: Array
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    categorySave: function() {
      this.$emit("categorySave", this.savedCategories);
    },
    closeModal: function() {
      console.log("closeModal");
      // this.$emit("beforeSave");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-body {
  margin: 20px 0;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.check-container {
  margin-top: 20px;
}

.close-container {
  margin-right: 20px;
}
</style>

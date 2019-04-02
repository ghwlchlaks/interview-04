<template>
  <div></div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang='less'>
.btn-sort {
  float: right;
}

div .contents {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 3.6em;
}

div .title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 1.2em;
}

input[type="radio"] {
  display: none;
  margin: 10px;
}

input[type="radio"] + label {
  display: inline-block;
  margin: -2px;
  padding: 8px 19px;
  background-color: #f5f5f5;
  border: 1px;
  width: 110px;
  text-align: center;
}

input[type="radio"]:checked + label {
  background-image: none;
  background-color: #3598dc;
  color: #fff;
}
</style>

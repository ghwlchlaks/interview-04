<template>
  <div>
    <div>
      <p>{{article.no}}</p>
      <p>{{article.title}}</p>
      <p>{{article.contents}}</p>
      <p>{{article.email}}</p>
      <p>{{article.updated_at}}</p>
    </div>

    <div>댓글</div>
    <div v-if="replies.length>0">
      <div v-for="(reply, index) in replies" :key="index">
        <p>{{reply.no}}</p>
        <p>{{reply.contents}}</p>
        <p>{{reply.updated_at}}</p>
        <p>{{reply.email}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  methods: {
    getDetailData: function() {
      this.$http
        .get(
          `http://comento.cafe24.com/detail.php?req_no=${this.$route.query.num}`
        )
        .then(result => {
          if (result.data.code === 200 && result.status === 200) {
            this.article = Object.assign(
              this.article,
              result.data.detail.article
            );
            this.replies = this.replies.concat(result.data.detail.replies);
          }
        });
    }
  },
  data() {
    return {
      article: {
        no: "",
        title: "",
        contents: "",
        user_no: "",
        email: "",
        updated_at: "",
        category_no: ""
      },
      replies: []
    };
  },
  mounted() {
    this.getDetailData();
  }
};
</script>

<style lang="less" scoped>
</style>

<template>
  <div class="container panel">
    <div>
      <div>
        <div>{{article.title}}</div>
        <div class="text-right">{{article.email}}</div>
      </div>
      <div class="panel-body">{{article.contents}}</div>
      <div class="text-right">{{article.updated_at}}</div>
    </div>

    <div class="comments" v-if="replies.length>0">
      <h2>댓글</h2>
      <div class="comment-wrap" v-for="(reply, index) in replies" :key="index">
        <div class="comment-block">
          <div>{{reply.email}}</div>
          <div class="text-right">{{reply.no}}</div>
          <p class="comment-text">{{reply.contents}}</p>
          <div class="bottom-comment">
            <div class="text-right">{{reply.updated_at}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetailContents } from "../services";

export default {
  name: "detail",
  methods: {
    getDetailData: function() {
      getDetailContents(this.$route.query.num).then(result => {
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
.comments {
  margin: 2.5rem auto 0;
  max-width: 60.75rem;
  padding: 0 1.25rem;
  border: solid black 1px;
  border-radius: 25px;
}

.comment-wrap {
  margin-bottom: 1.25rem;
  display: table;
  width: 100%;
  min-height: 5.3125rem;
}

.comment-block {
  padding: 1rem;
  background-color: #fff;
  display: table-cell;
  vertical-align: top;
  border-radius: 0.1875rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
}

.comment-text {
  margin-bottom: 1.25rem;
}

.bottom-comment {
  color: #acb4c2;
  font-size: 0.875rem;
}

.panel {
  background-color: #f5f5f5;
  border-radius: 25px;
}
</style>

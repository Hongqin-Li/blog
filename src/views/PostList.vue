<template>
  <post-view>
    <main class="mark" style="overflow: visible;">
      <h2 class="doc-title">{{ title }}</h2>
      <p class="doc-info">{{ description }}</p>

      <div
        v-for="p in posts"
        :key="p.url"
        class="post-list-item full-width--portrait"
      >
        <span class="post-list-item__title">
          <router-link :to="p.url">{{ p.title }}</router-link>
          <i class="material-icons-round">keyboard_arrow_right</i>
        </span>
        <p>{{ p.excerpt }}</p>
        <div class="post-list-item__tag">
          <base-tag :items="p.tags.map(t => ({ name: t, to: `/tags/${t}` }))" />
          <span>{{ p.updated_at.split("T")[0] }}</span>
        </div>
      </div>
    </main>
  </post-view>
</template>

<script>
import BaseTag from "@/components/BaseTag";
import PostView from "./PostView";

import api from "@/obj/api";

// const assert = require("assert").strict;

export default {
  created() {
    this.refresh();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.refresh();
  },
  data: () => ({
    title: "",
    description: "",
    posts: []
  }),
  methods: {
    refresh() {
      api.get(this.$route.path).then(data => {
        this.title = data["name"];
        this.description = data["description"];
        this.posts = data["items"];
      });
    }
  },
  components: {
    BaseTag,
    PostView
  }
};
</script>

<style lang="scss">
.katex {
  // font-size: 1.1em;
}
</style>

<style lang="scss" scoped>
@import "@/scss/utils.scss";

.doc-title {
  display: inline-block;
  margin-bottom: 0.2em !important;
}

.doc-info {
  margin-bottom: 2em;
}

.post-list-item {
  padding: 1rem 1rem 0.1rem 1rem;
  margin-left: -0.5rem;
  margin-top: 1rem;
  background-color: white;

  box-shadow: 0px 0px 1.5em -1em rgba(0, 0, 0, 0.1);

  transition: transform 0.3s;
  &:hover {
    transform: scale(0.99);
  }

  @include portrait {
    &:hover {
      transform: none;
    }
    margin-top: 0.7rem;
  }
  > .post-list-item__title {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    > a {
      color: #0070c9;
      opacity: $active-opacity;
      font-size: 1.2em;
    }
    > i {
      color: #0070c9;
      transform: translateX(0);
      opacity: 0;
      transition: opacity 0.1s, transform 0.3s;
    }
    &:hover > i {
      transform: translateX(0.2em);
      opacity: $inactive-opacity;
      transition: opacity 0.1s 0.1s, transform 0.3s;
    }
  }
  > .post-list-item__tag {
    margin-bottom: 1em;
    margin-top: 1em;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    > span {
      margin-left: auto;
      margin-top: 1em;
      padding-left: 1em;
    }
  }
}
</style>

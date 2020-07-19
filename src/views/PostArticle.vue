<template>
  <post-view>
    <main class="mark">
      <h2 class="doc-title">{{ title }}</h2>
      <div class="doc-tag"><base-tag :items="tags" /></div>
      <p class="doc-info">{{ time }}</p>

      <div class="mark" v-html="html" style="margin: 0;" />
    </main>
  </post-view>
</template>

<script>
import BaseTag from "@/components/BaseTag";
import PostView from "./PostView";

import api from "@/obj/api";

import katex from "katex";
import "katex/dist/katex.min.css";

const assert = require("assert").strict;

export default {
  created() {
    this.refresh();
  },
  watch: {
    $route: function(v) {
      // console.log(this.$route.path, v);
      console.log("route", v);
      this.refresh();
    }
  },
  data: () => ({
    title: "",
    time: "",
    tags: [],
    html: ""
  }),
  methods: {
    refresh() {
      api.get(this.$route.path).then(d => {
        this.title = d["title"];
        this.time = `Last edited on ${d["updated_at"]}`;
        let data = d["html"];
        const regex = /<script type="math\/tex([^"]*)">(.*?)<\/script>/gs;
        data = data.replace(regex, (match, mode, tex) => {
          if (mode) {
            assert(mode === "; mode=display");
          }
          const r = katex.renderToString(tex, {
            displayMode: mode === "; mode=display" ? true : false
          });
          return r;
        });
        this.html = data;
        this.tags = d["tags"].map(t => ({ name: t, to: `/tags/${t}` }));
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
.katex-display {
  overflow-x: auto;
}
</style>

<style lang="scss" scoped>
@import "@/scss/utils.scss";
@import "@/scss/mark.scss";

.doc-title {
  display: inline-block;
  margin-bottom: 0.2em !important;
}
.doc-tag {
  margin-bottom: 1em;
  margin-top: 1em;
}
.doc-info {
}
</style>

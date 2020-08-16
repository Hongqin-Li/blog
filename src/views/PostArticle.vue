<template>
  <main class="mark">
    <h2 class="doc-title">{{ title }}</h2>
    <div class="doc-info">
      <div class="doc-info__span">
        <i class="material-icons">create</i><span>{{ time }}</span>
      </div>
      <div class="doc-info__span">
        <i class="material-icons">visibility</i><span>{{ nhits }}</span>
      </div>
      <div class="doc-tag"><base-tag :items="tags" /></div>
    </div>
    <hr style="margin: 0;" />

    <div class="mark" v-html="html" style="margin: 0;" />
    <Disqus />
  </main>
</template>

<script>
import BaseTag from "@/components/BaseTag";

import api from "@/obj/api";
import ga from "@/obj/ga.json";

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
    nhits: "",
    tags: [],
    html: ""
  }),
  methods: {
    refresh() {
      api.get(this.$route.path).then(d => {
        this.title = d["title"];
        this.time = d["updated_at"].split("T")[0];
        this.nhits = ga[this.$route.path] || "0";
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
        this.tags = d["tags"].map(t => ({ name: t["name"], to: t["url"] }));
      });
    }
  },
  components: {
    BaseTag
  }
};
</script>

<style lang="scss">
.katex-display {
  overflow: auto hidden;
  margin: 0;
}
</style>

<style lang="scss" scoped>
@import "@/scss/utils.scss";
@import "@/scss/mark.scss";

.doc-title {
  display: inline-block;
}
.doc-tag {
  margin-bottom: 1em;
}
.doc-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  > .doc-info__span {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
    > i {
      font-size: inherit;
    }
    > span {
      margin: 0 1.3em 0 0.3em;
    }
  }
}
</style>

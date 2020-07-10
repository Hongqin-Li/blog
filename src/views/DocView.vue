<template>
  <base-view>
    <div class="doc-container">
      <main class="mark">
        <h2 class="doc-title">{{ title }}</h2>
        <div class="doc-tag"><base-tag :items="tags" /></div>
        <p class="doc-info">{{ time }}</p>

        <div class="mark" v-html="html" style="margin: 0;" />
      </main>

      <nav class="mark">
        <h4 style="margin-bottom: .5rem;">Categories</h4>
        <base-nav :items="navCategories" />
        <h4 style="margin-bottom: .8rem;">Tags</h4>
        <div class="base-tag-container">
          <base-tag :items="navTags" />
        </div>
      </nav>

      <back-to-top-button />
    </div>
  </base-view>
</template>

<script>
import BaseView from "./BaseView";
import BaseNav from "@/components/BaseNav";
import BaseTag from "@/components/BaseTag";
import BackToTopButton from "@/components/BackToTopButton";

import api from "@/obj/api";

import katex from "katex";
import "katex/dist/katex.min.css";

const assert = require("assert").strict;

export default {
  created() {
    this.refresh();
    this.navCategories = api.navCategories;
    this.navTags = api.navTags;
  },
  watch: {
    $route: function(v) {
      //console.log(this.$route.path, v);
      console.log("route", v);
      this.refresh();
    }
  },
  data: () => ({
    title: "Static Blog Generator",
    time: "Edited on 2020.5.19 - 5 minutes",
    tags: [],
    html: "",
    navCategories: [],
    navTags: []
  }),
  methods: {
    refresh() {
      api.get(this.$route.path).then(({ default: d }) => {
        this.title = d["title"];
        this.time = `Last edited on ${d["last_modified"]}`;
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
    BaseView,
    BaseNav,
    BaseTag,
    BackToTopButton
  }
};
</script>

<style lang="scss">
.katex {
  font-size: 1em;
}
</style>

<style lang="scss" scoped>
@import "@/scss/utils.scss";
@import "@/scss/mark.scss";

.mark {
  @include mark;
}
.landscape-only {
  @include portrait {
    display: none;
  }
}

.doc-container {
  display: flex;
  flex-direction: row;
  padding: 3rem 2rem;

  > main {
    margin-right: 2rem;
    max-width: 71%;
    width: 100%;
    flex-shrink: 0;
    overflow: hidden;
  }
  > nav {
    flex-grow: 1;
    overflow: hidden;
  }

  @include portrait() {
    flex-direction: column;
    padding: 0;
    > main {
      margin-right: 0;
      max-width: 100vw;
    }
    > nav {
      border-top: 1px solid rgba(0, 0, 0, $divider-opacity);
    }
  }
}

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

.base-tag-container {
  margin-bottom: 3rem;
}
</style>

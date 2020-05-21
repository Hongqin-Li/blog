<template>
  <base-view>
    <div class="doc-container">


      <main class="mark">

        <h2 class="doc-title">{{ title }}</h2>
        <div class="doc-tag"><base-tag :items="tags"/></div>
        <p class="doc-info">{{ time }}</p>

        <div class="mark" v-html="html" style="margin: 0;"/>

      </main>
      
      <nav class="mark">
        <h4 style="margin-bottom: .5rem;">Categories</h4>
        <base-nav/>
        <h4 style="margin-bottom: .8rem;">Tags</h4>
        <div class="base-tag-container">
          <base-tag/>
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

export default {
  created() {
    this.refresh();
  },
  data: () => ({
    title: "Static Blog Generator",
    time: "Edited on 2020.5.19 - 5 minutes",
    tags: [ {name: "css", to: "/tags/css",}, {name: "blog", to: "/tags/blog"}],
    html: "<p>xxxx</p><h2>Hello</h2>"
  }),
  methods: {
    refresh() {
      
      console.log(this.$route.path, api);
      api[this.$route.path]().then(({default: d}) => {
        this.title = d["title"];
        this.html = d["html"];
      });
    },
  },
  components: {
    BaseView,
    BaseNav,
    BaseTag,
    BackToTopButton,
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/utils.scss";
@import "@/scss/mark.scss";

.mark { @include mark; }
.landscape-only { @include portrait { display: none; } }

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
  margin-bottom: .2em !important;
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

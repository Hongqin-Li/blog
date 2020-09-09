<template>
  <base-view>
    <div class="doc-container">
      <router-view />

      <nav class="mark">
        <h4 style="margin-bottom: .5rem;">Categories</h4>
        <base-nav :items="navCategories" />
        <h4 style="margin-bottom: .8rem;">Tags</h4>
        <div class="base-tag-container">
          <base-tag :items="navTags" />
        </div>
        <base-toc
          class="nav-toc"
          :items="$store.state.scrollspy.headers"
          :scrolli="$store.state.scrollspy.scrolli"
          :title="$store.state.scrollspy.title"
        />
      </nav>

      <back-to-top-button />
    </div>
  </base-view>
</template>

<script>
import BaseView from "./BaseView";
import BaseNav from "@/components/BaseNav";
import BaseTag from "@/components/BaseTag";
import BaseToc from "@/components/BaseToc";
import BackToTopButton from "@/components/BackToTopButton";

import api from "@/obj/api";

export default {
  created() {
    api.get("/categories").then(data => {
      this.navCategories = data;
    });
    api.get("/tags").then(data => {
      this.navTags = data;
    });
  },
  data: () => ({
    navCategories: [],
    navTags: []
  }),
  components: {
    BaseView,
    BaseNav,
    BaseTag,
    BaseToc,
    BackToTopButton
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils.scss";
@import "@/scss/mark.scss";

.landscape-only {
  @include portrait {
    display: none;
  }
}

.doc-container {
  display: flex;
  flex-direction: row;
  padding: 3rem 2rem;

  ::v-deep main {
    margin-right: 2rem;
    max-width: 71%;
    width: 100%;
    flex-shrink: 0;
    overflow: hidden;
  }
  > nav {
    flex-grow: 1;
  }

  @include portrait() {
    flex-direction: column;
    padding: 0;
    ::v-deep main {
      margin-right: 0;
      max-width: 100vw;
    }
  }
}

.nav-toc {
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
  ::v-deep div:last-child {
    margin-bottom: $medium-spacing;
  }
  @include no-scrollbar;
  @include portrait() {
    display: none;
  }
}

.base-tag-container {
  margin-bottom: 3rem;
}
</style>

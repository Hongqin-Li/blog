<template>
  <base-view>
    <div class="doc-container">
      <slot />

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
    overflow: hidden;
  }

  @include portrait() {
    flex-direction: column;
    padding: 0;
    ::v-deep main {
      margin-right: 0;
      max-width: 100vw;
    }
    > nav {
      border-top: 1px solid rgba(0, 0, 0, $divider-opacity);
    }
  }
}

.base-tag-container {
  margin-bottom: 3rem;
}
</style>

<template>
  <base-view>
    <div class="doc-container">


      <main class="mark">
        <h3>Hello</h3>
        <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

      </main>
      
      <nav>
        <base-nav class="landscape-only"/>
        <base-tag class="basetag-container"/>
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

export default {
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
  }
  > nav {
    padding-top: 2rem;
    flex-grow: 1;
    overflow: hidden;
  }
  
  @include portrait() {
    flex-direction: column;
    padding: 1rem 0;
    > main {
      margin-right: 0;
      max-width: 100vw;
    }
    > nav {
      padding-top: 0;
    }
  }

}

.basetag-container {
  margin-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, $divider-opacity);
  padding-top: 1rem;
  @include portrait {
    border-top: none;
    margin-top: 0;
  }
}

</style>

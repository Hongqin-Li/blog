<template>
  <base-view>
    <div class="doc-container">
      <nav>
      </nav>

      <main>
      </main>
      
      <back-to-top-button />
    </div>
  </base-view>
</template>

<script>
import BaseView from "./BaseView";
import BackToTopButton from "@/components/BackToTopButton";

export default {
  components: {
    BaseView,
    BackToTopButton,
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/utils.scss";

.doc-container {
  // FIXME
  min-height: 100vh;

}

</style>

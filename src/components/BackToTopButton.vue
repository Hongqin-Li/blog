<template>
  <transition name="scale">
    <button
      class="back-to-top-btn"
      @click="scrollToTop"
      v-if="showBtn"
    >
      <span>&RightUpVector;</span>
    </button>
  </transition>
</template>

<script>
import throttle from "lodash/throttle";
export default {
  created() {
    this.tOnScroll = throttle(this.onScroll, 500);
  },
  mounted() {
    window.addEventListener("scroll", this.tOnScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.tOnScroll);
  },
  data: () => ({
    showBtn: true,
  }),
  methods: {
    onScroll() {
      const thispos = window.pageYOffset;
      this.showBtn = thispos > 3 * 17;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/utils.scss";

$size: 3em;
.back-to-top-btn {
  @include no-select;
  outline: none;
  position: fixed; bottom: $size; right: $size;
  z-index: 1;
  display: flex; align-items: center; justify-content: center;
  width: $size; height: $size; border-radius: $size/2;
  border: 1px solid rgba(0, 0, 0, $divider-opacity);
  background: white;
  color: rgba(0, 0, 0, $active-opacity);
  cursor: pointer;
  box-shadow: 0px 0px 1em -0.5em rgba(0, 0, 0, $divider-opacity);
  &, & > span {
    transform: scale(1);
    opacity: 1;
    transition: transform .3s;
  }
  &:hover {
    transform: scale(1.1);
    & > span { transform: scale(1.2); }
  }
  @include portrait {
    bottom: 1.5rem; right: 1.5rem;
  }
}

.scale-enter-active, .scale-leave-active {
  transition: transform .3s, opacity .3s;
}
.scale-enter, .scale-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(1.1) rotate(30deg);
}
</style>

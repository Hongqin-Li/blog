<template>
  <div class="textarea-container">
    <textarea
      v-bind="$props"
      @input="handleInput($event.target.value)"
    ></textarea>
    <span></span>
  </div>
</template>

<script>
export default {
  props: ["value", "rows", "cols", "disabled", "placeholder"],
  methods: {
    handleInput(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/input.scss";
.textarea-container {
  @include input(black);
  > textarea {
    overflow-x: hidden; // FIX: firefox
  }
}
</style>

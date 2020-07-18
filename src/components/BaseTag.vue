<template>
  <div class="tag-container">
    <router-link
      v-for="t in items"
      :key="t.to"
      :to="t.to"
      class="tag-item"
      style="color: inherit;"
    >
      <div class="tag-name">{{ t.name }}</div>
      <div v-if="t.cnt" class="tag-cnt">{{ t.cnt }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [
        { name: "algorithm", to: "/tag1", cnt: "10" },
        { name: "lecture-notes", to: "/tag2", cnt: "10" }
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils.scss";

$spacing: $small-spacing;

.tag-container {
  @include no-select;
  font-size: 0.8em;
  display: flex;
  margin: -$spacing/2;
  flex-wrap: wrap;

  > .tag-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: $spacing/2;
    padding: $spacing/1.6 0 $spacing/1.6 $spacing;
    border-radius: 0.3em;
    border: 1px solid rgba(0, 0, 0, $divider-opacity);
    background: rgba(black, 0.03);
    &:hover {
      background: rgba(black, 0.06);
    }
    > .tag-name,
    > .tag-cnt {
      opacity: $active-opacity;
      margin-right: $spacing;
    }
  }
}
</style>

<template>
  <nav>
    <template v-if="title && title !== ''">
      <h5>{{ title }}</h5>
      <hr />
    </template>
    <div
      v-for="(i, idx) in items"
      :key="idx"
      class="base-toc"
      :style="{ 'padding-left': `${i.level + 1}em` }"
      :class="{ 'base-toc--active': scrolli == idx }"
    >
      <router-link :to="i.to">{{ i.name }}</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default: () => []
    },
    scrolli: {
      type: Number,
      default: -1
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/config.scss";
.base-toc {
  > a {
    color: inherit;
    transition: opacity 0.3s;
    &:hover {
      opacity: $inactive-opacity;
    }
  }
  font-size: 0.9em;
  padding: 0.3em;
  border-radius: 0.3em;
}
.base-toc--active {
  background: rgba(0, 0, 0, 0.03);
}
</style>

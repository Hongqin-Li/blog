<template>
  <div>
    <div @click="open = !open">
      <slot name="item" />
    </div>
    <input type="checkbox" class="trigger" v-model="open"/>
    <div
      :style="open ? {'height': `${boxHeight}`}: {'height': '0'}"
    >
      <div>
        <slot name="box"/>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ["boxHeight"],
  data: function() {
    return {
      open: false,
    }
  },
}
</script>

<style lang="scss" scoped>

.trigger {
  display: none;
}

.trigger + div {
  overflow: hidden;

  //outer expand
  height: 0;
  transition: height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) 0.4s;

  & > div {
    transform: translate3d(0, #{-2.5em*6}, 0);
    opacity: 0;
    //inner expand
    transition: transform 0s cubic-bezier(0.23, 1, 0.32, 1) 0.9s, opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;
  }
 
}
.trigger:checked + div {
  //outer collapse
  transition-delay: 0.2s;

  & > div {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    //inner collapse
    transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s, opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.4s;
  }
 
}

</style>

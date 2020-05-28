<template>
  <div class="modal" :class="{ 'modal-shown': show }">
    <div class="modal-back-trigger" @click="handleClose"></div>
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data: function() {
    return {
      show: false
    };
  },
  watch: {
    value: function(val) {
      this.show = val;
    }
  },
  methods: {
    handleClose: function() {
      this.show = false;
      this.$emit("input", this.show);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils.scss";

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translate(-50%, -50%);
  visibility: hidden;

  opacity: 0;
  transition: transform 0s 0s, opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.4s,
    visibility 0s 1.1s;
  > div.modal-content {
    opacity: 0;
    transform: scale(1.2);
    transition: transform 0s cubic-bezier(0.23, 1, 0.32, 1) 0.9s,
      opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;
  }
}

.modal-content {
  max-height: 100vh;
  min-height: 50vh;
  min-width: 30vw;
  max-width: 100%;
  overflow: auto;

  overscroll-behavior: contain;

  flex-shrink: 0;
  flex-grow: 0;
  // @include no-scrollbar;
  // border-radius: 1em;
}

.modal-back-trigger {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background: rgba(0, 0, 0, .48);
  background: white;
  cursor: pointer;
}

.modal-shown {
  visibility: visible;
  opacity: 1;
  transition: transform 0s 0s, opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0.2s,
    visibility 0s;
  > div.modal-content {
    opacity: 1;
    transform: scale(1);
    transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s,
      opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.4s;
  }
}

.modal-hidden {
}
.modal-enter,
.modal-leave-to {
}
.modal-leave,
.modal-enter-to {
}
</style>

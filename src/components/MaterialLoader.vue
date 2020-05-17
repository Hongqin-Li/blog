<template>
  <div class="loader"
    :style="{'width': `${size}`}"
  >
    <svg class="circular" viewBox="25 25 50 50">
      <circle 
        class="path" 
        cx="50" cy="50" r="20" 
        fill="none" 
        stroke-miterlimit="10"
        :stroke-width="strokeWidth" 
        :stroke="color" 
        :class="{'path--colorful': colorful,}"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    strokeWidth: {
      type: Number,
      default: 4,
    },
    size: {
      type: String,
      default: "2em",
    },
    color: {
      type: String,
      default: "#333333",
    },
    colorful: {
      type: Boolean,
      default: true,
    },
  }
};
</script>

<style lang="scss" scoped>
$green: #008744;
$blue: #0057e7;
$red: #d62d20;
$yellow: #ffa700;
$white: #eee;

.loader {
  position: relative;
  margin: 0 auto;
  width: 2em;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
}

.circular {
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
  // stroke-linecap: round;
}
.path--colorful {
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

@keyframes color {
  100%,
  0% {
    stroke: $red;
  }
  40% {
    stroke: $blue;
  }
  66% {
    stroke: $green;
  }
  80%,
  90% {
    stroke: $yellow;
  }
}
</style>

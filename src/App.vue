<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import BaseLayout from "./layouts/BaseLayout.vue";
export default {
  components: {
    // BaseLayout,
  }
};
</script>

// Customize font
<style>
@import url("https://fonts.googleapis.com/css?family=Rubik&display=swap");
@import url("https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp");
body * {
  font-family: "Rubik", sans-serif;
}
</style>

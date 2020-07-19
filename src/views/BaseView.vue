<template>
  <base-layout
    :title="title"
    :routes="routes"
    :result="searchResult"
    :loading="loading"
    :fullwidth="fullwidth"
    v-model="input"
  >
    <slot />
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import debounce from "lodash/debounce";
//import { filterLectures } from "@/api/lecture";

export default {
  created() {
    this.dUpdateSearchResult = debounce(this.updateSearchResult, 500);
  },
  props: ["fullwidth"],
  data() {
    return {
      title: "LHQ's Blog",
      routes: [
        { name: "Home", to: "/home" },
        { name: "Archives", to: "/archives" }
      ],
      searchResult: [],
      loading: false,
      input: ""
    };
  },
  watch: {
    input: function(val) {
      this.loading = true;
      this.dUpdateSearchResult(val);
    }
  },
  methods: {
    updateSearchResult: function(val) {
      //this.searchResult = getSearchResult(val);
      console.log(val);
      this.loading = false;
    }
  },
  components: {
    BaseLayout
  }
};
</script>

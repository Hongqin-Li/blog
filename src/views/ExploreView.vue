<template>
  <div>
    <my-modal v-model="showModal" class="landscape-only">
      <div style="max-width: 30rem; padding: 3rem 0;">
        <h3 style="font-size: 1.9em; padding: 0 1.2rem; font-weight: normal;">
          请选择授课老师
        </h3>
        <div
          class="explore-showlist"
          style="display: flex; flex-direction: column;"
        >
          <router-link
            v-for="t in modalTeacherList"
            :key="t[2]"
            :to="t[2]"
            class="explore-listitem"
            >{{ t[0] }}</router-link
          >
        </div>
      </div>
    </my-modal>

    <!-- Landscape View -->
    <div class="landscape-only scroll-snap-list">
      <div>
        <!-- REMOVE START -->
        <div class="page-topbar-container">
          <span>TODAY</span>
          <router-link to="/login?redirect=/explore">LOGIN</router-link>
        </div>
        <!-- REMOVE END -->

        <div class="page-container main-container">
          <div class="left-box">
            <h1 class="explore-title">EXPLORE</h1>
            <span class="explore-leading">高级</span>

            <div class="option-list">
              <div class="option-item">
                <label>
                  <input type="checkbox" />
                  <span>按课程名称排序</span>
                </label>
              </div>

              <div class="option-item">
                <label>
                  <input type="checkbox" />
                  <span>按学分数排序</span>
                </label>
              </div>

              <div class="option-item">
                <label>
                  <input type="checkbox" />
                  <span>显示学分</span>
                </label>
              </div>
            </div>
          </div>
          <div class="right-box">
            <div class="explore-input-container">
              <input
                v-model="searchInput"
                class="explore-input"
                placeholder="Search by class, teacher and code"
              />
            </div>
            <div class="explore-showlist">
              <transition name="fade">
                <div v-show="loading" class="explore-showlist__result">
                  <div class="explore-listitem">
                    <div
                      class="skeleton-loader-bar"
                      style="max-width: 100%;"
                    ></div>
                  </div>
                  <div class="explore-listitem">
                    <div
                      class="skeleton-loader-bar"
                      style="max-width: 100%;"
                    ></div>
                  </div>
                  <div class="explore-listitem">
                    <div
                      class="skeleton-loader-bar"
                      style="max-width: 100%;"
                    ></div>
                  </div>
                  <div class="explore-listitem">
                    <div
                      class="skeleton-loader-bar"
                      style="max-width: 100%;"
                    ></div>
                  </div>
                  <div class="explore-listitem">
                    <div
                      class="skeleton-loader-bar"
                      style="max-width: 90%;"
                    ></div>
                  </div>
                </div>
              </transition>
              <transition name="fade">
                <div v-show="!loading" class="explore-showlist__result">
                  <div
                    class="explore-listitem"
                    v-for="(teachers, lecture) in searchResult"
                    :key="lecture"
                    @click="openTeacherModal(teachers)"
                  >
                    {{ lecture }}
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <div v-for="(c, i) in categories" :key="c.name">
        <div class="page-title-container">
          <span class="page-leading">0{{ i + 1 }}</span>
          <span class="page-title">{{ c.name }}</span>
        </div>
        <div class="page-container page-columns">
          <div
            v-for="(teachers, lecture) in c.processedResult"
            :key="lecture"
            @click="openTeacherModal(teachers)"
          >
            {{ lecture }}
          </div>
        </div>
      </div>
    </div>

    <!-- Portrait View -->
    <div class="portrait-only">
      <h1 class="title">Explore</h1>

      <div class="query-bar">
        <div class="query-container">
          <input
            v-model="searchInput"
            class="search-bar"
            id="search-input"
            placeholder="Search by name, teacher or code"
          />
          <div class="category-bar">
            <label
              v-for="(c, idx) in categories"
              :key="c.name"
              class="category-button"
            >
              <input type="radio" :value="idx" v-model="tabIndex" />
              <span>{{ c.name }}</span>
            </label>
          </div>
        </div>
        <label for="search-input" class="search-icon-container">
          <transition name="fade">
            <my-loader
              v-show="loading"
              size="1.5em"
              class="search-icon-loader"
            />
          </transition>
          <transition name="fade">
            <i v-show="!loading" class="search-icon"></i>
          </transition>
        </label>
      </div>

      <div class="result-body">
        <div class="result-box">
          <!-- portrait list start -->
          <collapse-item
            v-for="(teachers, lecture) in searchResult"
            :key="lecture"
            :box-height="teachers.length * 2.8 + 'em'"
          >
            <template v-slot:item>
              <div class="list-item">
                <div>{{ lecture }}</div>
              </div>
            </template>
            <template v-slot:box>
              <div v-for="t in teachers" :key="t[2]" class="list-subitem">
                <router-link :to="t[2]">{{ t[0] }}</router-link>
              </div>
            </template>
          </collapse-item>
          <!-- portrait list end -->
        </div>
        <my-footer class="result-footer" />
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";

import CollapseItem from "@/components/CollapseItem.vue";
import MyModal from "@/components/Modal.vue";
import MyLoader from "@/components/MaterialLoader.vue";
import MyFooter from "@/components/BaseFooter.vue";

import {
  initLecture,
  filterLecturesByType,
  filterLectures
} from "@/api/lecture";

export default {
  async created() {
    this.dUpdateSearchResult = debounce(this.updateSearchResult, 500);
    await initLecture();
    for (let i = 0; i < this.categories.length; i += 1)
      this.categories[i].processedResult = this.getFilterResult(
        filterLecturesByType(this.categories[i].type)
      );
    this.dUpdateSearchResult(filterLectures(this.searchInput));
  },

  watch: {
    tabIndex: function(newi) {
      if (typeof newi === "number")
        this.searchResult = this.categories[newi].processedResult;
    },
    searchInput: function() {
      this.loading = true;
      this.dUpdateSearchResult(filterLectures(this.searchInput));
    }
  },

  data: function() {
    return {
      showModal: false,
      modalTeacherList: [],
      openSearch: false,
      loading: true,

      tabIndex: "",
      searchInput: "",
      searchResult: {
        Mathematics: [
          ["TA", "code a", "/lecture/codea/idx1"],
          ["TB", "code a", "/lecture/codea/idx2"]
        ],
        "Computer Science": [
          ["TA", "code b", "/lecture/codeb/idx1"],
          ["TB", "code b", "/lecture/codeb/idx2"]
        ]
      },

      categories: [
        { name: "思政", type: "Politics", processedResult: [] },
        { name: "英语", type: "English", processedResult: [] },
        { name: "体育", type: "Physics", processedResult: [] }
      ]
    };
  },

  methods: {
    openTeacherModal: function(ts) {
      this.modalTeacherList = ts;
      this.showModal = true;
    },
    getFilterResult: function(tuples) {
      let c2t = {};
      tuples.forEach(data => {
        if (!c2t[data.name]) c2t[data.name] = [];
        c2t[data.name].push([
          data.teacher,
          data.code,
          `/lecture/${data.code}/${data.idx}`
        ]);
      });
      return c2t;
    },
    updateSearchResult: function(tuples) {
      this.searchResult = this.getFilterResult(tuples);
      this.loading = false;
      this.tabIndex = "";
    }
  },

  components: {
    CollapseItem,
    MyModal,
    MyLoader,
    MyFooter
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/utils.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition-delay: 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@keyframes loader {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
.skeleton-loader-bar {
  @include skeleton-loader(loader);
  height: 1em;
}

.landscape-only {
  @include portrait() {
    display: none;
  }
}
.portrait-only {
  display: none;
  @include portrait() {
    display: block;
  }
}
.scroll-snap-list {
  $use-dense: false;
  @if $use-dense {
    height: calc(100vh - 112px);
  } @else {
    height: 100vh;
    overflow: auto;
    scroll-snap-type: y mandatory;
    > div {
      scroll-snap-align: center;
    }
  }
  position: relative;

  > div {
    position: relative;
    height: 100%;
    // border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    overflow: hidden;
  }
  > div:nth-child(odd) {
    background: white;
  }
  > div:nth-child(even) {
    background: #fafafa;
  }

  // Categories pages
  > div:first-child ~ div:nth-child(even) {
    > .page-title-container {
      transform: translateX(-50%);
      &::before {
        left: 0;
        transform: translate(-100%, 0);
      }
    }
    > .page-columns {
      align-items: flex-start;
    }
  }

  > div:first-child ~ div:nth-child(odd) {
    > .page-title-container {
      transform: translateX(50%);
      &::before {
        right: 0;
        transform: translate(100%, 0);
      }
    }
    > .page-columns {
      align-items: flex-start;
    }
  }
}

.page-container {
  position: relative;
  // border: 1px solid red;
  max-width: $main-width;
  height: 100%;
  width: 100%;
}
.page-title-container {
  flex-shrink: 0;
  position: relative;
  // border: 1px solid blue;
  height: 3rem;
  max-width: $main-width;
  display: flex;
  align-items: center;

  // Leading bar
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    width: 100vw;
    height: 2px;
    background: $primary-color;
    opacity: $disabled-opacity;
  }
  // leading number
  > .page-leading {
    font-size: 1.5em;
    margin-left: 1.5rem;
    color: $primary-color;
    opacity: 0.8;
  }
  > .page-title {
    font-size: 1.9em;
    margin: 0 1.5rem;
    opacity: $active-opacity;
  }
}
.page-columns {
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-x: auto;
  > div {
    padding: $small-spacing 5rem;
    opacity: $active-opacity;
    cursor: pointer;
    &:hover {
      opacity: $inactive-opacity;
    }
  }
}

.explore-listitem {
  padding: $small-spacing $small-spacing * 1.4;
  opacity: $active-opacity;
  cursor: pointer;
  &:hover {
    opacity: $inactive-opacity;
  }
}

// REMOVE START
.page-topbar-container {
  // border: 1px solid red;
  width: 100%;
  max-width: $main-width;
  height: 3rem;
  flex-shrink: 0;
  display: flex;
  > * {
    opacity: $active-opacity;
  }
  > *:nth-child(2) {
    margin-left: auto;
  }
  > a {
    cursor: pointer;
    &:hover {
      opacity: $inactive-opacity;
    }
  }
}
// REMOVE END

.main-container {
  height: calc(100% - 3rem);
  display: flex;
  > div {
    flex-basis: 0;
    flex-grow: 1;
    // border: 1px solid red;
    display: flex;
    flex-direction: column;
  }
  > .left-box {
    padding: 3rem 3rem 3rem 0;
  }
  > .right-box {
    padding: 3rem 0 3rem 3rem;
    position: relative;
  }
}

.explore-showlist {
  position: relative;
  background: #fafafa;
  border: 1px solid transparent; // FIX Edge
  padding: $small-spacing;
  flex-grow: 1;
  overflow: auto;
  @include no-scrollbar;
  > .explore-showlist__result {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    padding: $small-spacing;
  }
}

.explore-title {
  font-size: 2.7rem;
  opacity: $active-opacity;
}
.explore-leading {
  font-size: 1.9em;
  position: relative;
  align-self: flex-end;
  padding-left: 1.5rem;
  color: rgba(0, 0, 0, $active-opacity);
  // Leading bar
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    height: 2px;
    width: 100vw;
    background: $primary-color;
    opacity: $disabled-opacity;
    transform: translateX(-100%);
  }
}

.option-list {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  > .option-item {
    padding: $small-spacing 0;
    > label {
      cursor: pointer;
    }
    > label > input {
      display: none;
    }
    > label > span {
      position: relative;
      opacity: $active-opacity;
    }
    > label > span::after {
      content: "";
      position: absolute;
      right: -1em;
      top: 50%;
      height: 0.5em;
      width: 0.5em;
      border-radius: 50%;
      border: 2px solid $primary-color;
      opacity: $inactive-opacity;
      transform: translate(100%, -50%);
      transition: all 0.2s ease;
    }
    > label > input:checked + span::after {
      background: $primary-color;
      transform: translate(100%, -50%) scale(0.8);
    }
  }
}

.explore-input-container {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  > .explore-input {
    outline: none;
    border: none;
    padding: 3 * $small-spacing 1.4 * $small-spacing;
    width: 100%;
  }
}

.search-img {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40%;
}

// Portrait
$spacing: 1.6em;

$icon-width: 1em+2 * $spacing;
$height: 1em + 2 * $spacing;

.title {
  color: rgba(0, 0, 0, $active-opacity);
  font-size: 2.7em;
  padding: 3em 1.4rem 0.8em 1.4rem;
  margin: 0;
}

.query-bar {
  $use-sticky: true;
  @if $use-sticky {
    position: sticky;
    background: white;
  }

  top: 0;
  left: 0;
  display: flex;
  height: $height;
  align-items: center;
  overflow: hidden;
  z-index: 1;
  border-bottom: 1px solid rgba(0, 0, 0, $divider-opacity);
}

.query-container {
  position: relative;
  width: calc(100% - #{$icon-width});
}

.category-bar {
  height: $height;
  white-space: nowrap;
  overflow-x: auto;
  @include no-scrollbar;
}

.category-button {
  height: $height;
  display: inline-flex;
  cursor: pointer;
  margin-left: $spacing;

  align-items: center;
  > input {
    display: none;
  }

  > span {
    opacity: 0.3;
  }
  > span,
  > span::before {
    transition: opacity 0.2s;
  }
  // dot indicator
  > input + span::before {
    opacity: 0;
    transform: scale(0);
  }
  > input:checked {
    + span {
      position: relative;
      opacity: $active-opacity;
      &::before {
        position: absolute;
        left: 0.15em;
        bottom: -0.8em;
        content: "";
        background: currentColor;
        height: 0.3em;
        width: 0.3em;
        transform: scale(1);
        border-radius: 50%;
        opacity: 1;
      }
    }
  }
}

.search-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  height: $height;
  padding-left: $spacing;

  opacity: 0;
  transform: translateX(30%);
  transition: transform 1s cubic-bezier(0.12, 0.87, 0.15, 1) 0.6s,
    opacity 0.4s cubic-bezier(0.67, 0, 0.33, 1) 0.2s;

  // Category items
  & + .category-bar {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.1s ease 0.4s, transform 0.4s ease 0.2s;
  }

  &:focus {
    opacity: 1;
    transform: translateX(0);
    transition: transform 1s cubic-bezier(0.12, 0.87, 0.15, 1) 0.4s,
      opacity 0.4s cubic-bezier(0.67, 0, 0.33, 1) 0.4s;
    & + .category-bar {
      pointer-events: none;
      opacity: 0;
      transform: translateX(-20%);
      transition: opacity 0.2s cubic-bezier(0.2727, 0.0986, 0.8333, 1) 0.2s,
        transform 0.4s linear;
    }
  }
}
.search-icon-container {
  flex-shrink: 0;
  width: $icon-width;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  & > .search-icon-loader {
    position: absolute;
  }
  & > i.search-icon {
    display: inline-block;
    width: $icon-width;
    height: 2.75em;
    background: center no-repeat
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 44'%3E%3Cpath d='M15.27 28.29l-4.06-4.06a6.113 6.113 0 0 0 1.35-3.83c0-3.39-2.76-6.15-6.15-6.15-3.39 0-6.15 2.76-6.15 6.15s2.76 6.15 6.15 6.15c1.43 0 2.75-.5 3.8-1.33l4.06 4.06 1-.99zM6.4 25.33a4.93 4.93 0 0 1-4.92-4.92c0-2.71 2.2-4.92 4.92-4.92s4.92 2.21 4.92 4.92c.01 2.71-2.2 4.92-4.92 4.92z' fill='%23333333'/%3E%3C/svg%3E");
  }
}

.result-body {
  background: #fafafa;
  // REMOVE START
  > .result-footer {
    background: rgba(black, 0.03);
  }
  // REMOVE END
  > .result-box {
    padding: 1rem;
    min-height: calc(100vh - 10em);
  }
}

// REMOVE START
// $slot-height: 1.4em+ 2*$small-spacing;
$slot-height: 2.8em;

.list-item,
.list-subitem {
  height: $slot-height;
  display: flex;
  align-items: center;
  opacity: $active-opacity;
  cursor: pointer;

  > * {
    flex-grow: 1;
    padding: $small-spacing;

    // Force single line
    white-space: nowrap;
    overflow: hidden;
    // Append ... when overflow
    text-overflow: ellipsis;
  }

  &:hover > * {
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 0.3em;
  }
}

// indent
.list-subitem > * {
  padding-left: 1.6rem;
}
// REMOVE END
</style>

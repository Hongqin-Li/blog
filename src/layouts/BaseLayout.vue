<template>
  <!-- Header footer main layout -->
  <div class="hmf--dense" style="background: #fafafa;">
    <transition name="fade">
      <material-loader
        v-show="loading"
        style="
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        z-index: 11;
      "
      />
    </transition>

    <!-- Landscape Top Bar -->
    <header class="header--landscape">
      <div class="header-row" style="height: 3rem; align-items: center;">
        <span>{{ title }}</span>

        <span
          class="right-start search-span"
          v-click-outside="{
            handler: () => {
              openSearch = false;
            },
            isActive: openSearch
          }"
        >
          <input
            ref="input"
            type="text"
            spellcheck="false"
            placeholder="Search..."
            class="search-dropdown__input"
            :class="{ 'search-dropdown__input-active': openSearch }"
            v-model="searchInput"
          />
          <div class="search-dropdown__container" :style="{ '--nslots': 7 }">
            <div>
              <collapse-item
                v-for="t in result"
                :key="t.name"
                :box-height="t.children ? t.children.length * 2.5 + 'em' : '0'"
              >
                <template v-slot:item>
                  <div class="list-item">
                    <div>{{ t.name }}</div>
                  </div>
                </template>
                <template v-slot:box>
                  <div v-for="c in t.children" :key="c.to" class="list-subitem">
                    <router-link class="base-link" :to="c.to">{{
                      c.name
                    }}</router-link>
                  </div>
                </template>
              </collapse-item>
            </div>
          </div>
          <span v-for="r in routes" :key="r.name"
            ><router-link class="base-link" :to="r.to">{{
              r.name
            }}</router-link></span
          >
          <label class="search-span__trigger" @click="handleOpenSearch"
            ><i class="search-icon"></i
          ></label>
        </span>
      </div>
    </header>

    <!-- Portrait Top Bar -->
    <input
      type="checkbox"
      v-model="openDropdown"
      class="hmf--fullscreen-trigger"
    />

    <header
      class="header--portrait"
      :class="{ 'topbar--hidden': !showTopbar && !openDropdown }"
      style="color: rgba(0, 0, 0, .8);"
    >
      <!-- header row 1 -->
      <div class="header-row" style="height: 3em; align-items: center;">
        <span>{{ title }}</span>
        <label class="switch--arrow right-start">
          <input type="checkbox" v-model="openDropdown" /><span></span>
        </label>
      </div>

      <!-- header row 2(dropdown box) -->
      <div
        style="
          height: calc(100vh - 3rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-y: auto;
          padding: 0 1rem 0 1rem;
        "
      >
        <span
          class="search-span--portrait"
          spellcheck="false"
          style="
            font-size: 1rem;
            margin-right: 0;
            --slot-height: 2.3em;
            --dropdown-height: calc(100vh - 5.3rem);
          "
          :class="{ 'search-span--portrait-active': openSearchPortrait }"
          v-click-outside="{
            handler: () => {
              openSearchPortrait = false;
            },
            isActive: openSearchPortrait
          }"
          @click="handleOpenSearchPortrait"
        >
          <input
            v-model="searchInput"
            type="text"
            placeholder="Search..."
            ref="inputPortrait"
          />
          <div>
            <div>
              <collapse-item
                v-for="t in result"
                :key="t.name"
                :box-height="t.children ? t.children.length * 2.5 + 'em' : '0'"
              >
                <template v-slot:item>
                  <div class="list-item--portrait">
                    <div>{{ t.name }}</div>
                  </div>
                </template>
                <template v-slot:box>
                  <div
                    v-for="c in t.children"
                    :key="c.to"
                    class="list-subitem--portrait"
                  >
                    <router-link class="base-link" :to="c.to">{{
                      c.name
                    }}</router-link>
                  </div>
                </template>
              </collapse-item>
            </div>
          </div>
        </span>

        <base-nav
          :items="navRoutes"
          style="width: calc(100% - 1em); margin-top: 0.7rem; "
        />
        <hr class="header-nav-hr" />
        <base-nav
          :items="routes"
          style="width: calc(100% - 1em); margin-bottom: 2rem; "
        />
      </div>
    </header>

    <main v-if="fullwidth" style="max-width: none;">
      <slot>
        The main page here
      </slot>
    </main>
    <main v-if="!fullwidth">
      <slot>
        The main page here
      </slot>
    </main>

    <footer>
      <base-footer>
        <template v-slot:intro>
          Designed and Built by Hongqin Li<br />
          Powered by Light Minimalism
        </template>
        <template v-slot:links>
          <a>F.A.Q</a>
          <a>Contact Us</a>
          <a>Join Us</a>
        </template>
        <template v-slot:copyright>
          Copyright © 2020 Hongqin Li. All rights reserved.
        </template>
      </base-footer>
    </footer>
  </div>
</template>

<script>
// import {debounce} from "@/utils";
import throttle from "lodash/throttle";
// import axios from "axios";
import BaseNav from "@/components/BaseNav";
import BaseFooter from "@/components/BaseFooter";
import MaterialLoader from "@/components/MaterialLoader";
import CollapseItem from "@/components/CollapseItem";

import vClickOutside from "v-click-outside";

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    // fullwidth for main(without max-width)
    fullwidth: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    navRoutes: {
      type: Array,
      default: () => []
    },
    routes: {
      type: Array,
      default: () => [
        { name: "课表", to: "/explore" },
        { name: "课程", to: "/explore" },
        { name: "登入", to: "/login" }
      ]
    },
    result: {
      type: Array,
      default: () => [
        { name: "To Explore", to: "", children: [{ name: "sub", to: "/kk" }] }
      ]
    },
    loading: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    autohide: {
      type: Boolean,
      default: false
    }
  },
  created: function() {
    this.tOnScroll = throttle(this.onScroll, 500);
  },
  watch: {
    $route: function() {
      this.openSearch = false;
      this.openSearchPortrait = false;
      this.openDropdown = false;
    },
    searchInput: function(newi) {
      this.$emit("input", newi);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.tOnScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.tOnScroll);
  },
  methods: {
    // Hide topbar automatically
    onScroll() {
      if (!this.openDropdown && this.autohide) {
        const thispos = window.pageYOffset;
        if (this.lastScrollPosition < thispos && thispos > 3 * 17)
          this.showTopbar = false;
        else this.showTopbar = true;
        this.lastScrollPosition = thispos;
      }
    },
    handleOpenSearch() {
      this.openSearch = true;
      setTimeout(() => {
        this.$refs.input.focus();
      }, 1000);
    },
    handleOpenSearchPortrait() {
      this.openSearchPortrait = true;
      setTimeout(() => {
        this.$refs.inputPortrait.focus();
      }, 1000);
    }
  },
  data() {
    return {
      openSearch: false,
      openSearchPortrait: false,
      openDropdown: false,
      lastScrollPosition: 0,
      showTopbar: true,

      searchInput: ""
    };
  },
  components: {
    MaterialLoader,
    BaseNav,
    BaseFooter,
    CollapseItem
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
.search-span__trigger > .search-icon {
  width: 1em;
  height: 2.75em;
  background: center no-repeat
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 44'%3E%3Cpath d='M15.27 28.29l-4.06-4.06a6.113 6.113 0 0 0 1.35-3.83c0-3.39-2.76-6.15-6.15-6.15-3.39 0-6.15 2.76-6.15 6.15s2.76 6.15 6.15 6.15c1.43 0 2.75-.5 3.8-1.33l4.06 4.06 1-.99zM6.4 25.33a4.93 4.93 0 0 1-4.92-4.92c0-2.71 2.2-4.92 4.92-4.92s4.92 2.21 4.92 4.92c.01 2.71-2.2 4.92-4.92 4.92z' fill='%23666666'/%3E%3C/svg%3E");
}

.topbar--hidden {
  transform: translateY(-3rem) !important;
}
.header--portrait {
  position: fixed;
  display: none;
  @include portrait() {
    display: block;
  }
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  transform: translateY(0);

  @include frosted-glass;

  &,
  & > div {
    overflow: hidden;
  }
}
.header--landscape {
  background-color: white;
  z-index: 10;
  @include portrait() {
    display: none;
  }
}

@mixin nav-menu($line-height: 1.4em + $small-spacing) {
  & input {
    display: none;
  }

  & li {
    list-style: none;
    line-height: 1.4em;
  }
  & ul {
    padding-left: 2em;
  }

  & > ul {
    padding: 0;
    margin: 0;
  }

  //text & color & background
  & a,
  & input + label {
    white-space: nowrap; //FIX: force single line
    display: inline-block;
    padding: (($line-height)-1.4em)/2 ($line-height)-1.4em;
    text-decoration: none;
    outline: none;
    cursor: pointer;
  }
  // Support label in a
  & a > label {
    cursor: pointer;
  }

  //Collapse
  & li.section > input {
    & + label {
      & + ul {
        height: 0;
        //display: none;
        overflow: hidden;

        transition: height 0.7s cubic-bezier(0.23, 1, 0.32, 1);
      }
    }

    &:checked + label {
      & + ul {
        --line-height: #{$line-height};
        --eps: 0em;

        //height: auto;
        height: calc(var(--lines, 3) * var(--line-height) + var(--eps));
      }
    }
  }
}

nav.nav-menu--light {
  @include nav-menu;
  @include no-select;
  color: black;

  & a,
  & input + label {
    color: currentColor;
    opacity: $active-opacity;
    &:hover {
      opacity: $inactive-opacity;
    }
  }
}

//Portrait
@media (max-width: $break-width) {
  $line-height: 2.5em;
  nav.nav-menu--light {
    @include nav-menu($line-height);

    border: 1px solid rgba(0, 0, 0, $divider-opacity);
    border-left: none;
    border-right: none;
    border-top: none;

    & ul,
    li {
      width: 100%;
      padding-left: 0;
    }

    label,
    a {
      display: block;
      width: 100%;
    }

    li.section a {
      text-indent: 2em;
    }

    //Apple's collapse effect
    & li.section > input + label + ul {
      //outer expand
      transition: height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) 0.4s;

      & > div {
        transform: translate3d(0, #{-$line-height * 6}, 0);
        opacity: 0;
        //inner expand
        transition: transform 0s cubic-bezier(0.23, 1, 0.32, 1) 0.9s,
          opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;
      }
    }
    & li.section > input:checked + label + ul {
      //outer collapse
      transition-delay: 0.2s;

      & > div {
        transform: translate3d(0, 0, 0);
        opacity: 1;
        //inner collapse
        transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s,
          opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.4s;
      }
    }
  }
}

@mixin hmf--dense-bar {
  // display: block;

  //dense
  > * {
    margin-left: auto;
    margin-right: auto;
  }

  //dense appbar
  > div.header-row {
    position: relative;
    width: 100%;

    display: flex;
    align-items: flex-end;

    padding: calc(#{$medium-spacing} - 0.2em) $medium-spacing;
    & > * {
      line-height: 1.4em;
      margin-right: $medium-spacing;
    }
    & > *:last-child {
      margin-right: 0;
    }

    & > span {
      font-size: 1.2em;
      color: rgba(black, $active-opacity);
    }
    & > a {
      text-decoration: none;
      outline: none;
      cursor: pointer;

      font-size: 0.8em;
      color: black;
      opacity: $active-opacity;

      &:hover {
        opacity: $inactive-opacity;
      }
    }
    & > button.icon {
      margin-top: -10px;
      margin-bottom: -10px;
    }
    & > button {
      line-height: 1em;
    }

    //usage
    & > .left-end {
      margin-right: auto;
    }
    & > .right-start {
      margin-left: auto;
    }
    & > .middle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

//Classic layout: header, main and footer
.hmf--dense {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > main {
    flex-grow: 1;
    width: 100%;
    max-width: $main-width;

    align-self: center;
    @include portrait() {
      padding-top: 3rem;
    }
  }

  > header {
    border: 1px solid rgba(0, 0, 0, $divider-opacity);
    border-top: none;
    border-left: none;
    border-right: none;

    @include hmf--dense-bar;
  }

  //Dense header and footer
  > header > div,
  > footer > div {
    width: 100%;
    max-width: $main-width;
  }

  > footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(black, 0.03);
  }
}

.hmf--fullscreen-trigger {
  display: none;
  & + * {
    height: 3rem;
    transition: height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) 0.4s,
      transform 0.3s, background-color 0.5s 0.4s; // Support auto hide
    //nav
    & > *:nth-child(2) > * {
      transform: translateY(-6 * 3rem);
      opacity: 0;
      transition: transform 0s cubic-bezier(0.23, 1, 0.32, 1) 0.9s,
        opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;
    }
  }
  &:checked + * {
    @supports (
      (-webkit-backdrop-filter: saturate(180%) blur(20px)) or
        (backdrop-filter: saturate(180%) blur(20px))
    ) {
      background-color: rgba(255, 255, 255, 0.9) !important;
    }
    height: 100vh;
    transition-delay: 0.2s;

    //nav
    & > *:nth-child(2) > * {
      transform: translateY(0);
      opacity: 1;
      transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s,
        opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.4s;
    }
  }
}

// Header tookits
.search-span {
  height: 3rem;
  min-width: 20rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;

  $icon-width: 0.5em;

  // Hidden search box
  > input {
    @include button2span;
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 0.8em;
    padding-left: $icon-width + $small-spacing;
  }
  > label {
    display: inline-flex;
  }
  // Hidden search icon
  > input + i {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &::before {
      content: "";
      box-sizing: border-box;
      width: $icon-width;
      height: $icon-width;
      border-radius: 50%;
      border: 0.08em solid #666666;
    }
  }

  // Animations
  // Hidden search bar
  > input,
  > input + i {
    opacity: 0;
    transform: translateX(-100px);
    //transition: transform 1s cubic-bezier(0.12, 0.87, 0.15, 1) .4s;
    transition: transform 1s cubic-bezier(0.12, 0.87, 0.15, 1) 0.4s,
      opacity 0.4s cubic-bezier(0.67, 0, 0.33, 1) 0s;
  }

  // Background menu item
  > input ~ span,
  > input ~ label {
    padding-right: $medium-spacing;
  }
  > input ~ label:last-child {
    padding-right: 0;
  }
  > input ~ span,
  > input ~ label {
    //color: black;
    font-size: 0.9rem;
    cursor: pointer;

    opacity: 1;
    transform: scale(1);
    transition: opacity 0.1s ease 0.2s, transform 0.4s ease;
    > * {
      opacity: $active-opacity;
      &:hover {
        opacity: $inactive-opacity;
      }
    }
  }
}

$slot-height: 2.5em;
.search-dropdown__container {
  @include button2span;

  --nslots: 3;
  --slot-height: #{$slot-height};

  display: block;
  position: absolute;
  top: 3rem; // 1px for header border
  left: 0;
  width: 100%;
  overflow: hidden;
  background: white;
  border: 1px solid #e0e0e0;
  font-size: 0.8em;

  > div {
    @include no-scrollbar;
    overflow-y: auto;

    height: var(--dropdown-height, calc(var(--nslots) * var(--slot-height)));
    width: 100%;
  }
}

.list-item,
.list-subitem {
  height: $slot-height;
  display: flex;
  align-items: center;
  opacity: $active-opacity;
  cursor: pointer;

  > * {
    flex-grow: 1;
    padding: 0 1em;

    // Force single line
    white-space: nowrap;
    overflow: hidden;
    // Append ... when overflow
    text-overflow: ellipsis;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
}
// indent
.list-subitem > * {
  padding-left: 2em;
}

// Dropdown Animation
$hide-delay: 0.2s;
$show-delay: 0.3s;
$height: var(--dropdown-height, calc(var(--nslots) * var(--slot-height)));
.search-dropdown__input {
  + .search-dropdown__container {
    visibility: hidden;
    height: 0;
    opacity: 0;
    transform-origin: top center;
    transition: height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) $hide-delay + 0.2s,
      opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) $hide-delay,
      visibility 0s $hide-delay + 0.2s;
    > div {
      transform: translateY(-6 * 3rem);
      opacity: 0;
      transition: transform 0s cubic-bezier(0.23, 1, 0.32, 1) $hide-delay + 0.2s,
        opacity 0s cubic-bezier(0.23, 1, 0.32, 1) $hide-delay + 0.2s;
    }
  }
}

.search-dropdown__input-active {
  &,
  & + i {
    opacity: $active-opacity !important;
    transform: translateX(0) !important;
    transition: transform 1s cubic-bezier(0.12, 0.87, 0.15, 1) 0.4s,
      opacity 0.4s cubic-bezier(0.67, 0, 0.33, 1) 0.4s !important;
  }
  & ~ span,
  & ~ label {
    pointer-events: none !important;
    opacity: 0 !important;
    transform: scale(0.7) !important;
    transition: opacity 0.2s cubic-bezier(0.2727, 0.0986, 0.8333, 1) 0.2s,
      transform 0.4s linear !important;
  }
  & + .search-dropdown__container {
    visibility: visible !important;
    height: $height !important;
    opacity: 1 !important;

    transition: height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) $show-delay,
      opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) $show-delay,
      visibility 0s $show-delay !important;
    > div {
      transform: translateY(0) !important;
      opacity: 1 !important;
      transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1) $show-delay,
        opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) $show-delay + 0.2s !important;
    }
  }
}

.search-span--portrait {
  // Defined by user
  --nslots: 3;
  --slot-height: #{2 * $small-spacing + 1em};
  --dropdown-height: calc(100vh - 6rem);
  --border-color: none;

  @include button2span;

  height: var(--slot-height);
  position: relative;
  width: 100%;

  //text-align: left;

  // Font color
  color: rgba(black, $active-opacity);

  // Background
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background-color: currentColor;
    opacity: 0.06;
    pointer-events: none;
    border-radius: 0.2em;

    transition: transform 0.4s ease;
  }

  > input {
    display: inline-flex;
    align-items: center;
    outline: none;

    height: var(--slot-height);
    width: 100%;
    padding: 0 1.4 * $small-spacing;
    padding: 0 1.1em;
    text-align: left;

    //border: 1px solid rgba(black, $divider-opacity);
    border: 1px solid var(--border-color);
    //background-color: rgba(black, .08);
    border-radius: 0.3em;
    transition: width 0.3s ease;
    + span {
      position: absolute;
      right: 0;
      top: 0;
      width: 2em;
      height: 2em;
    }
  }
  > div {
    @include button2span;

    display: block;
    width: 100%;
    overflow: hidden;
    background: white;
    border: 1px solid var(--border-color);
    border-top: none;

    > div {
      @include no-scrollbar;
      overflow-y: auto;
      height: var(--dropdown-height, calc(var(--nslots) * var(--slot-height)));
      width: 100%;
    }
  }

  & {
    z-index: 1;
    transition: z-index 0s 0.7s;
  }

  // Dropdown Animation
  & > div {
    visibility: hidden;
    height: 0;
    opacity: 0;
    transform-origin: top center;
    transition: height 0s cubic-bezier(0.28, 0.11, 0.32, 1) 0.4s,
      opacity 0.2s 0.2s, visibility 0s 0.7s;
    > div {
      transform: translateY(-6 * 3rem);
      opacity: 0;
      transition: transform 0s cubic-bezier(0.23, 1, 0.32, 1) 0.2s,
        opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1);
    }
  }
}

.search-span--portrait-active {
  z-index: 9 !important;
  transition: z-index 0s 0s !important;
  // Input animation
  &::before {
    transform: translate(-50%, -50%) scaleX(1.2) !important;
  }

  > input {
    & ~ div {
      visibility: visible !important;
      opacity: 1 !important;
      height: var(
        --dropdown-height,
        calc(var(--nslots) * var(--slot-height))
      ) !important;

      transition: height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1), opacity 0s,
        visibility 0s !important;
      > div {
        transform: translateY(0);
        opacity: 1;
        transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1),
          opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s !important;
      }
    }
  }
}

.list-item--portrait,
.list-subitem--portrait {
  height: $slot-height;
  display: flex;
  align-items: center;
  opacity: $active-opacity;
  cursor: pointer;

  > * {
    flex-grow: 1;
    padding: 0 1em;

    // Force single line
    white-space: nowrap;
    overflow: hidden;
    // Append ... when overflow
    text-overflow: ellipsis;
  }

  &:hover {
    opacity: $inactive-opacity;
  }
}
// indent
.list-subitem--portrait > * {
  padding-left: 2em;
}

// The arrow trigger in the topbar
.switch--arrow {
  color: #333333;
  position: relative;
  cursor: pointer;
  width: 1em;
  height: 1em;
  > input {
    display: none;
  }
  > input + * {
    pointer-events: none;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, 0%);

    &::before,
    &::after {
      content: "";
      position: absolute;
      box-sizing: content-box;
      top: 70%;
      width: 0.7em;
      height: 0.1em;
      background: currentColor;
    }
    &::before {
      right: 50%;
      transform-origin: 120% center;
      transform: rotate(40deg);
    }
    &::after {
      left: 50%;
      transform-origin: -20% center;
      transform: rotate(-40deg);
    }

    &,
    &::before,
    &::after {
      transition: transform 1s cubic-bezier(0.86, 0, 0.07, 1),
        transform-origin 1s cubic-bezier(0.86, 0, 0.07, 1),
        -webkit-transform 1s cubic-bezier(0.86, 0, 0.07, 1),
        -webkit-transform-origin 1s cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  > input:checked + * {
    transform: translate(-50%, -100%);
    &::before {
      transform: rotate(-40deg);
    }
    &::after {
      transform: rotate(40deg);
    }
  }
}

.header-nav-hr {
  width: calc(100% - 4em);
  border-color: rgba(0, 0, 0, $divider-opacity);
  border-bottom: none;
}

// Fix a
.base-link {
  color: inherit;
  text-decoration: none;
}
</style>

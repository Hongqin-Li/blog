<template>
  <div>
    <div class="footer-row">
      <div class="intro">
        <slot name="intro">
          Designed and Built by Mr. Foo<br />
          Powered by <a>Light Minimalism</a>
        </slot>
      </div>
      <div class="link">
        <slot name="links">
          <a>F.A.Q</a>
          <a>Contact Us</a>
          <a>Join Us</a>
        </slot>
      </div>
    </div>

    <div class="footer-row">
      <div class="intro">
        <slot name="copyright">
          Copyright © 2020 Today. All rights reserved.
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/config.scss";

.footer-row {
  font-size: 0.8em;
  line-height: 1.6em;

  display: flex;
  flex-direction: row;
  padding: 0 $small-spacing;
  &:first-child {
    padding-top: 1em;
  }
  &:last-child {
    padding-bottom: $small-spacing;
  }
  > * {
    flex-basis: 0;
    flex-grow: 1;
    margin: $small-spacing;
  }
  > .intro,
  > .copyright {
    opacity: $inactive-opacity;
  }
  > .link {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    ::v-deep a {
      cursor: pointer;
      opacity: $active-opacity;
      &:hover {
        opacity: $inactive-opacity;
      }
    }
  }

  //mobile
  @media (max-width: $break-width) {
    flex-direction: column;
    > .link {
      align-items: flex-start;
    }
    > * {
      flex-basis: auto;
    }
  }
}
</style>

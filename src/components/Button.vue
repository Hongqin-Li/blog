<template>
  <button
    :style="{color: color}"
    @click="$emit('click')"
  >
    <slot>
      TEXT
    </slot>
  </button>
</template>

<script>
export default {
  props: {
    color: String,
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/utils.scss";

$height: 2.6em;
$inner-spacing: $small-spacing;

@mixin button-base {
    /* Always use font-size to control the size of button */
    /* font-size: default; */

    font-size: .8rem;

    height: 2.6em;

    //font-size: 1em;
    border-radius: .3em;

    letter-spacing: 0.08em;
    line-height: 1em;

    position: relative;
    display: inline-flex;
    align-items: center;
    //justify-content: center;
    vertical-align: middle;

    background-color: transparent; 
    border: none;
    outline: none;

    cursor: pointer;
    text-decoration: none;

    user-select: none;
    -moz-user-select: none;

    &::-moz-focus-inner {border: 0;}

    //Align elements inside the button, a subtle different
    padding: $inner-spacing  $inner-spacing*1.4;
    & > * { margin-right: $inner-spacing; }
    & > *:last-child { margin-right: 0;}

    //Normalize the icon
    & > * { font-size: 1em;}

    &::after, &::before {
        content: "";
        border-radius: inherit;
        border: 1px solid currentColor;

        position: absolute;
        width: 100%;
        height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    //background
    &::before {
        background-color: currentColor;
        z-index: 1;
        opacity: 0.04;
        transition: all .3s;
    }
    &:hover::before { opacity: .08; }
    &:active::before { opacity: .16;}
    //border
    &::after {
        opacity: $divider-opacity;
    }

    &:disabled { opacity: $disabled-opacity; pointer-events: none;}

}

button, button[light] {

    @include button-base;
    @include no-select;
    color: rgba($primary-color, $active-opacity);
}

button[text] {

    @include button-base;
    @include no-select;

    //Customization
    color: rgba($primary-color, $active-opacity);

    //Remove boreder and background
    &::before, &::after { opacity: 0; }

    &:hover::before { opacity: .04; }
    &:active::before { opacity: .12; }

}

button[outlined] {

    @include button-base;
    @include no-select;

    //Customization
    color: rgba($primary-color, $active-opacity);

    //Remove background
    &::before { opacity: 0; }

    &:hover::before { opacity: .04; }
    &:active::before { opacity: .12; }
}

button[flat] {

    @include button-base;
    @include no-select;

    //customization
    color: rgba(0, 0, 0, $active-opacity);
    background: white;

    //remove boreder and background
    border-radius: 0;
    &::before { opacity: 0; }
}

button[round] {

    @include button-base;
    @include no-select;

    //customization
    color: white;
    background-color: $primary-color;

    //remove boreder and background
    &::before, &::after { opacity: 0; }
    &::before { width: 100%; height: 100%;}

    border-radius: $height/2;
    padding: $inner-spacing  $inner-spacing*2;
    // @include elevation(2);
    
    // &:active { @include elevation(4);}
}

</style>

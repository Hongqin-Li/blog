<template>
  <button class="select" 
    :style="{'--nslots': Math.min(maxSlots, items.length)}"
    @click="$event.target.focus()"
  >
  <!-- nslots defines the dropdown height by slots, whose default value is 3. -->
    <div>{{selected}}</div>
    <div>
      <div>
        <label v-for="i in items" :key="i"><input type="radio" :value="i" v-model="selected"><span>{{i}}</span></label>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    items: Array,
    maxSlots: {
      type: Number,
      default: 5,
    },
    value: String,
  },
  data: function() {
    return {
      selected: null,
    }
  },
  created: function() {
    this.selected = this.value;
  },
  watch: {
    value: function(val) {
      this.selected = val;
      console.log("select change", val);
    },
    selected: function(val) {
      this.$emit("input", val);
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/scss/utils.scss";

@mixin dropdown-trigger($inactive, $active, $height) {
    $hide-delay: .3s;

    #{$inactive} {
        visibility: hidden;
        height: 0;
        opacity: 0;
        transform-origin: top center;
        transform: scale(0.9);
        transition: height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) $hide-delay+.2s,
                    opacity .2s cubic-bezier(0.23, 1, 0.32, 1) $hide-delay,
                    visibility 0s $hide-delay+.2s,
                    transform .2s cubic-bezier(0.23, 1, 0.32, 1) $hide-delay;
        > div {
            transform: translateY(-6*3rem); 
            opacity: 0;
            transition: transform 0s cubic-bezier(0.23, 1, 0.32, 1) $hide-delay+0.2s, 
                        opacity 0s cubic-bezier(0.23, 1, 0.32, 1) $hide-delay+0.2s;
        }
 
    }
    #{$active} {
        visibility: visible;
        height: $height;
        opacity: 1;
        transform: scale(1);

        transition: height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1),
                    opacity .2s cubic-bezier(0.23, 1, 0.32, 1),
                    visibility 0s,
                    transform 0s;
        > div {
            transform: translateY(0);
            opacity: 1;
            transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1), 
                        opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;
        }
    }
}

@mixin dropdown-trigger--collapse($inactive, $active, $height) {
    $hide-delay: .2s;

    #{$inactive} {
        visibility: hidden;
        height: 0;
        transition: height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) $hide-delay+.2s,
                    visibility 0s $hide-delay+.7s;
        > div {
            transform: translateY(-6*3rem); 
            opacity: 0;
            transition: transform 0s cubic-bezier(0.23, 1, 0.32, 1) $hide-delay+0.7s, 
                        opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) $hide-delay;
        }
 
    }
    #{$active} {
        visibility: visible;
        height: $height;
        transition: height 0.5s cubic-bezier(0.28, 0.11, 0.32, 1),
                    visibility 0s;
        > div {
            transform: translateY(0);
            opacity: 1;
            transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1) $hide-delay, 
                        opacity 0.7s cubic-bezier(0.23, 1, 0.32, 1) $hide-delay+0.2s;
        }
    }
}
.select {
    // Defined by user
    --nslots: 3;
    --slot-height: #{2*$small-spacing + 1em};
    //--dropdown-height: ...;
    --border-color: #e0e0e0;

    @include button2span;

    height: var(--slot-height);
    position: relative;

    // Font color
    color: rgba(black, $active-opacity);

    // Right-bottom corner mark
    $x: .8em;
    &::before {

        content: "";
        background-color: var(--border-color);
        position: absolute;
        right: .5px;
        bottom: $x;

        transform: translateX(50%) rotate(-45deg) translateX(-50%);

        height: 1px;
        width: 1.42*$x;
        transition: transform .3s;
    }
    &:hover::before {
        $k: 0.7;
        transform: translateX(50%) rotate(-45deg) translateX(-50%)
                   translateY($x/1.42*(1-$k)) scaleX($k);
    }

    &:focus::before {
        $k: 0.01;
        transform: translateX(50%) rotate(-45deg) translateX(-50%)
                   translateY($x/1.42*(1-$k)) scaleX($k);
    }
    > div:first-child {
        cursor: pointer;
    }

    > *:first-child { 
        display: inline-flex;
        align-items: center;

        height: var(--slot-height);
        width: 100%;
        padding: 0 1.4*$small-spacing;
        text-align: left;


        //border: 1px solid rgba(black, $divider-opacity);
        border: 1px solid var(--border-color);
        background-color: white;
        &:focus {
            outline: none;
        }

    }
    > *:first-child + * {
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
            height: var(--dropdown-height, calc(var(--nslots)* var(--slot-height)));
            width: 100%;
            display: flex;
            flex-direction: column;
            > * {
                cursor: pointer;
                > span { 
                    display: inline-flex;
                    width: 100%;
                    align-items: center;
                    height: var(--slot-height);
                    padding: 0 1.4*$small-spacing;
                }
                > input { display: none; }
                > input + span:hover, > input:checked + span {
                    background: rgba(black, .04);
                }
                > input + span:active {
                    background: rgba(black, .08);
                }
            }
        }
    }
    // Fix tag container
    & > .tag-container:first-child {
        padding-left: 0.9*$small-spacing;
    }

    & {
        z-index: 1;
        transition: z-index 0s .7s;
    }
    &:focus {
        z-index: 9;
        transition: z-index 0s 0s;
    }

    // Animation
    @include dropdown-trigger("& > *:first-child + *", "& > *:first-child:focus + *, &:focus > *:first-child + *", var(--dropdown-height, calc(var(--nslots) * var(--slot-height))));
}

</style>

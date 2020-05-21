<template>
  <div>
    <collapse-item v-for="t in items" :key="t.name" :box-height="t.children ? t.children.length*1.8 + 'em': '0'">
      <template v-slot:item="{ open }">
        <div class="list-item">
          <div @click="if (t.to) $router.push(t.to);">
            <div class="list-item-anchor" :class="{ 'list-item-anchor-active': open }">
              <i v-if="t.children" class="material-icons-round">keyboard_arrow_right</i>
            </div>
            <div class="single-line">{{t.name}}</div>
          </div>
        </div>
      </template>
      <template v-slot:box>
        <div v-for="c in t.children" :key="c.to" class="list-subitem">
          <div @click="if (c.to) $router.push(c.to);" class="single-line">{{ c.name }}</div>
        </div>
      </template>
    </collapse-item>
  </div>
</template>

<script>
import CollapseItem from "./CollapseItem";

export default {
  props: {
    items: {
      type: Array,
      default: () => [
        {
          name: "Item with children", children: [
            { name: "subitem 1", to: "/", },
          ],
        },
        {
          name: "Item without children and overflow", to: "/kk",
        },
      ],
    }
  },
  components: { CollapseItem }
}
</script>

<style lang="scss" scoped>
@import "@/scss/utils.scss";

.single-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

$slot-height: 1.8em;
$indent: 1.6em;
.list-item, .list-subitem {
  @include no-select;

  height: $slot-height;
  display: flex;
  align-items: center;
  cursor: pointer;


  > * {
    flex-grow: 1;
    height: $slot-height;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  &:hover > * {
    background-color: rgba(0, 0, 0, .03);
    border-radius: .3em;
  }
}
.list-item-anchor {
  position: relative;
  flex-shrink: 0;
  width: $indent;
  display: flex;
  align-items: center;
  justify-content: center;
  > i {
    font-size: 1.2em;
    transform: rotate(0deg);
    transition: transform 0.5s cubic-bezier(0.28, 0.11, 0.32, 1) 0.4s;
  }
}
.list-item-anchor-active {
  > i {
    transform: rotate(90deg);
    transition-delay: .2s;
  }
}

// indent
.list-subitem > * {
  padding: 0 $indent;
}
// REMOVE END


</style>

<template>
  <!-- <img :src="color.icon" /> -->
  <a>
    <img :src="color.icon" />
    <div class="rgbBox" :style="background"><p /></div>
    {{ color.color.name }}
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Color } from "./ColorDefinition";

@Component
export default class DyeCard extends Vue {
  @Prop(Object) color!: Color;

  get background(): string {
    return `background-color: rgb(${this.color.color.cloth.toString()});`;
  }
}
</script>

<style scoped lang="scss">
a {
  width: 64px;
  text-decoration: none;
  padding: 12px;
  color: #490064;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  img {
    height: 64px;
  }
}
.rgbBox {
  width: 64px;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>

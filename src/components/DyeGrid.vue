<template>
  <div class="photo-container">
    <img
      is="DyeSmall"
      v-for="color in colors"
      :key="color.color.id"
      :color="color"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import DyeSmall from "./DyeSmall.vue";

@Component({
  components: {
    DyeSmall,
  },
})
export default class DyeGrid extends Vue {
  colors = [];

  async mounted(): Promise<void> {
    const response = await axios.get("/api/colors");
    this.colors = response.data;
  }
}
</script>

<style scoped lang="scss">
photo-container {
  width: 100%;
  display: grid;
  justify-content: space-around;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(auto-fill, 60px);
  grid-template-rows: repeat(auto-fill, 60px);
}
</style>

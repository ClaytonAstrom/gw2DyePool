<template>
  <div class="dyeGrid">
    <div class="search-wrapper">
      <input v-model="search" type="text" placeholder="Search for a dye.." />
      <label>Dye Search:</label>
    </div>
    <div class="wrapper">
      <div class="scrollable">
        <div
          is="DyeCard"
          v-for="color in filteredList"
          :key="color.color.id"
          class="card"
          :color="color"
          @click.native="isVisible = true"
        ></div>
      </div>
    </div>
    <div v-show="isVisible" class="dyeExpandedView"><p></p></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import DyeCard from "./DyeCard.vue";
import { Color } from "./ColorDefinition";

@Component({
  components: {
    DyeCard,
  },
})
export default class DyeGrid extends Vue {
  colors: Color[] = [];

  isVisible = false;

  search = "";

  get filteredList(): Color[] {
    return this.colors.filter((color) => {
      return color.color.name.toLowerCase().includes(this.search.toLowerCase());
    });
  }

  async mounted(): Promise<void> {
    const response = await axios.get("/api/colors");
    this.colors = response.data;
  }
}
</script>

<style scoped lang="scss">
.dyeGrid {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.search-wrapper {
  margin: 10px 60px 10px 0px;
  position: relative;
  label {
    position: absolute;
    font-size: 12px;
    color: rgb(0, 0, 0);
    top: 8px;
    left: 12px;
    z-index: -1;
    transition: 0.15s all ease-in-out;
  }
  input {
    width: 650px;
    padding: 4px 12px;
    color: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(0, 0, 0, 0.349);
    transition: 0.15s all ease-in-out;
    background: white;
    &:focus {
      outline: none;
      transform: scale(1.05);
      & + label {
        font-size: 10px;
        transform: translateY(-24px) translateX(-12px);
      }
    }
    &::-webkit-input-placeholder {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
      font-weight: 100;
    }
  }
}

.wrapper {
  overflow: hidden;
}
.scrollable {
  overflow-y: auto;
  display: flex;
  max-width: 800px;
  max-height: 50vh;
  flex-wrap: wrap;
  padding-top: 12px;
}
.card {
  box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px,
    rgba(0, 0, 0, 0.117647) 0px 1px 4px;
  width: 75px;
  margin: 12px;
  transition: 0.15s all ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
}

.dyeExpandedView {
  width: 780px;
  background-color: rgb(145, 218, 218);
  margin: 20px;
}
</style>

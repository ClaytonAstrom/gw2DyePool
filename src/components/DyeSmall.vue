<template>
  <img :src="color.icon" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    color: Object,
  },
})
export default class DyeGrid extends Vue {}
</script>

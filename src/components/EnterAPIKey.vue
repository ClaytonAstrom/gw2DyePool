<template>
  <form id="apiForm" @submit.prevent="checkAPIKey">
    <p>Enter an API key with account and unlock permissions</p>
    <input id="apiKeyInput" v-model="apiKey" placeholder="API Key" />
    <p>
      <input type="submit" value="Submit" />
    </p>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class EnterAPIKey extends Vue {
  apiKey = "";

  async checkAPIKey(): Promise<void> {
    const response = await axios.post("/api/account", {
      apiKey: this.apiKey,
    });
    console.log(response);
  }
}
</script>

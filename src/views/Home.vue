<script setup lang="ts">
import router from "../router";

const onClicked = () => {
  router.push({ path: "/solar" });
};
</script>

<template>
  <div class="wrapper">
    <div class="home-button">
      <button @click="onClicked">Start Solar System</button>
    </div>
  </div>
</template>

<style scoped>
.home-button button {
  width: 10rem;
  height: 2rem;
  font-family: "Courier New", Courier, monospace;
  font-style: oblique;
  font-weight: bold;
}

.home-button {
  text-align: center;
  color: aliceblue;
  margin: 3px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "test",
  data() {
    return {
      input: "test"
    };
  }
};
</script>
<style>
html,
body,
#app {
  height: 100vh;
  padding: 24px;
  background-color: #f9f9fc;
}
</style>

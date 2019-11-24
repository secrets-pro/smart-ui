<template>
  <div>
    <sm-alert :type="type" v-for="(type, index) in types" :key="index">
      this is {{ type }}
    </sm-alert>
  </div>
</template>
<script>
export default {
  name: "demo-alert",
  data() {
    return {
      types: ["info", "error", "warn", "success"]
    };
  }
};
</script>

<template>
  <div>
    <div v-for="(type, index) in statuses" :key="index">
      <sm-status :type="type"></sm-status>
      <span :class="[`color-${type}`]">{{type}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "demo-status",
  data() {
    return {
      statuses: ["success", "warning", "error"]
    };
  }
};
</script>

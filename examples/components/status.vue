<template>
  <div>
    <sm-status :type="type" v-for="(type, index) in statuses" :key="index">{{
      type
    }}</sm-status>
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

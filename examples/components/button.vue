<template>
  <div>
    <sm-button-group>
      <sm-button circle :type="type" v-for="(type, index) in types" :key="index">{{ type }}</sm-button>
    </sm-button-group>
    <sm-button type="primary" circle icon="md-add">add</sm-button>
  </div>
</template>
<script>
export default {
  name: "demo-button",
  data() {
    return {
      types: ["primary", "success", "danger", "error", "warning", "dark"]
    };
  }
};
</script>

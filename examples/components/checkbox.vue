<template>
  <div>
    <sm-checkbox v-model="model">是否选择</sm-checkbox>
    <div>
      {{ models }}
      <sm-checkbox-group v-model="models">
        <sm-checkbox name="hello" true-value="1">hello</sm-checkbox>
        <sm-checkbox name="world" true-value="2">world</sm-checkbox>
        <sm-checkbox name="world2">world2</sm-checkbox>
      </sm-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  name: "xxx",
  data() {
    return {
      model: false,
      models: ["2"]
    };
  }
};
</script>

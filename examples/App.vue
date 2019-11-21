<template>
  <div>
    <sm-ionic type="ios-add"></sm-ionic>
    <br />

    <sm-input style="width:200px;" readonly v-model="input">
      <sm-ionic type="ios-add" slot="suffix"></sm-ionic>
    </sm-input>
    <br />
    <sm-select
      style="width:200px;"
      v-model="select"
      :options="options"
    ></sm-select>
  </div>
</template>
<script>
export default {
  name: "test",
  data() {
    return {
      input: "test",
      select: "",
      options: [
        {
          text: "text",
          value: "1"
        },
        {
          text: "text2",
          value: "2"
        }
      ]
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
}
* {
  padding: 0;
  margin: 0;
}
</style>

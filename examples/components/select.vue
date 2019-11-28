<template>
  <div>
    <sm-select style="width:200px;" v-model="select">
      <sm-option value="xxx" label="xxxx"></sm-option>
      <sm-option value="xxx1" label="xxxx1"></sm-option>
      <sm-option value="xxx2">xxxx2</sm-option>
    </sm-select>
    <sm-input v-model="select"></sm-input>
  </div>
</template>
<script>
export default {
  name: "demo-select",
  data() {
    return {
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

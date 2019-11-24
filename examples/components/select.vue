<template>
  <sm-select
    style="width:200px;"
    v-model="select"
    :options="options"
  ></sm-select>
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

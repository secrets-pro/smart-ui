<template>
  <sm-label :datas="datas" :inline="inline" :width="200"></sm-label>
</template>
<script>
export default {
  name: "demo-label",
  data() {
    return {
      inline: false,
      datas: {
        name: "hello",
        keyword: "Vue,javascript"
      }
    };
  }
};
</script>

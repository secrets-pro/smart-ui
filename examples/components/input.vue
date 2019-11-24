<template>
  <sm-input style="width:200px;" v-model="input" placeholder="请输入">
    <sm-ionic type="ios-add" slot="suffix"></sm-ionic>
  </sm-input>
</template>
<script>
export default {
  name: "page-input",
  data() {
    return {
      input: ""
    };
  }
};
</script>

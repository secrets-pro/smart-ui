<template>
  <div style="border:1px dashed green;">
    <sm-breadcrumb :items="items"></sm-breadcrumb>
  </div>
</template>
<script>
export default {
  name: "demo-breadcrumb",
  data() {
    return {
      items: [
        {
          label: "page1"
        },
        {
          label: "page2"
        }
      ]
    };
  }
};
</script>
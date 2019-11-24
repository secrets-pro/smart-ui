<template>
  <div>
    <router-link
      :to="`/${link}`"
      v-for="(link, index) in components"
      :key="index"
    >
      {{ link }}</router-link
    >
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      components: [
        "ionic",
        "input",
        "alert",
        "select",
        "label",
        "status",
        "button"
      ]
    };
  }
};
</script>

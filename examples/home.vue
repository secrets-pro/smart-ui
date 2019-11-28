<template>
  <div>
    <span class>
      <router-link
        class="link"
        :to="`/${link}`"
        v-for="(link, index) in components"
        :key="index"
      >{{ link }}</router-link>
    </span>
  </div>
</template>
<script>
//const components = router.routes.map(el => el.meta.title);
export default {
  name: "home",
  data() {
    return {
      components: []
    };
  },
  mounted() {
    const components = this.$router.options.routes.map(el => el.meta.title);
    this.components = components;
  }
};
</script>
<style lang="less">
.link {
  display: inline-block;
  padding: 12px;
}
</style>
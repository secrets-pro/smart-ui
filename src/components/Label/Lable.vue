<template>
  <div :class="{ 'sm-label': true, inline }">
    <div
      class="sm-label-list"
      v-for="(item, index) in currentData"
      :key="index"
    >
      <div class="label-item" :style="{ width: width ? width + 'px' : '' }">
        <span>{{ index }}</span>
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "sm-label",
  props: {
    datas: Object,
    inline: Boolean,
    width: Number
  },
  data() {
    return {
      currentData: this.datas
    };
  },
  watch: {
    datas(n) {
      this.currentData = n;
    }
  }
};
</script>

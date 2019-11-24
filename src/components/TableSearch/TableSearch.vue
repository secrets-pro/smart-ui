<template>
  <div class="sm-search">
    <input
      ref="input"
      class="form-control"
      @keyup.enter="enter"
      @input="input"
      :value="currentValue"
      @focus="focus"
      :disabled="currentDisable"
      :placeholder="placeholder"
    />
    <span>
      <span>
        <sm-icon type="search" size="18"></sm-icon>
      </span>
    </span>
  </div>
</template>
<script>
export default {
  name: "sm-search-input",
  props: {
    value: [String, Object],
    disabled: Boolean,
    filters: {
      type: Array,
      default() {
        return [];
      }
    },
    placeholder: {
      type: String,
      default() {
        return "请输入搜索条件";
      }
    }
  },

  watch: {
    value(n) {
      if (typeof n === "string") {
        this.currentValue = n;
      }
    }
  },
  computed: {
    noFilters() {
      return this.currentFilters.filter(el => !el.checked);
    }
  },
  data() {
    return {
      currentValue: this.value,
      currentDisable: this.disabled,
      tags: [],
      options: [],
      currentFilters: this.filters.map((el, index) => {
        return { ...el, checked: false, id: index };
      }),
      showFilter: true,
      lastFilterIndex: -1
    };
  },
  methods: {
    chooseItem(index) {
      if (this.options.length) {
        let choosed = this.currentFilters[this.lastFilterIndex - 0];

        this.tags.push({
          label: choosed.label + ":" + this.options[index].label,
          value: this.options[index].value,
          name: choosed.name,
          id: choosed.id,
          prefix: choosed.prefix
        });
        choosed.checked = true;
        this.options = [];
        this.currentValue = "";
        this.$refs.dropdown.active = true;
        this.triggerSearch();
        this.showFilter = true;
      } else {
        let choosed = this.currentFilters[index - 0];
        this.currentValue = choosed.label + ":";
        this.lastFilterIndex = index - 0;
        if (choosed.options) {
          this.options = choosed.options;
          this.$refs.dropdown.active = true;
          this.showFilter = true;
        } else {
          this.$refs.input.focus();
          this.$refs.dropdown.active = false;
          this.showFilter = false;
        }
      }
    },
    focus() {},
    enter() {
      if (this.options.length) {
        return;
      }
      if (this.filters.length) {
        if (!this.showFilter) {
          let choosed = this.currentFilters[this.lastFilterIndex];
          if (!choosed.checked) {
            let v = this.$refs.input.value;
            this.tags.push({
              label: v,
              value: v.replace(choosed.label + ":", ""),
              name: choosed.name,
              id: choosed.id,
              prefix: choosed.prefix
            });
            choosed.checked = true;
            this.currentValue = "";
            this.lastFilterIndex = -1;
            this.$refs.input.blur();
            this.triggerSearch();
          }
          this.showFilter = true;
        }
      } else {
        let value = this.$refs.input.value;
        this.$emit("input", value);
        this.$emit("search", value);
      }
    },
    closeIcon(index) {
      let cu = this.tags[index];
      let { id } = cu;
      this.currentFilters[id].checked = false;
      this.tags.splice(index, 1);
      this.$refs.dropdown.active = false;
      this.triggerSearch();
    },
    input() {
      let v = this.$refs.input.value;
      if (this.filters.length) {
        if (!v) {
          this.focus();
          this.lastFilterIndex = -1;
        }
      } else {
        this.currentValue = v;
        this.$emit("input", v);
      }
    },
    clear() {
      let v = "";
      if (this.filters.length) {
        this.lastFilterIndex = -1;
        this.tags = [];
        this.currentFilters = this.filters.map((el, index) => {
          return { ...el, checked: false, id: index };
        });
        this.options = [];
        this.$emit("input", {});
      } else {
        this.$emit("input", v);
      }
      this.$emit("clear");
      this.currentValue = v;
    },
    triggerSearch() {
      let result = {};
      this.tags.forEach(el => {
        let value = el.value;
        if (el.prefix) {
          value = el.prefix + el.value;
        }
        result[[el.name]] = value;
      });
      this.$emit("input", result);
      this.$emit("search", result);
    }
  }
};
</script>

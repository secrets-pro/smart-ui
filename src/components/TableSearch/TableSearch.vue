<template>
  <div
    class="sm-search"
    :class="{ filters: !!filters.length, disabled: currentDisable }"
  >
    <span class="left-icon">
      <sm-icon type="search" size="16"></sm-icon>
    </span>
    <div class="filters">
      <span class="tag" v-for="(item, index) in tags" :key="index">
        {{ item.label }}

        <clearsvg width="12" height="12" @click="closeIcon(index)" />
      </span>
      <div class="autosuggest">
        <sm-dropdown
          style="width:100%;"
          :styles="{ minWidth: '200px' }"
          placement="right"
          ref="dropdown"
          v-if="filters.length"
          @on-click="chooseItem"
          trigger="custom"
        >
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
          <template slot="content" v-if="!options.length">
            <sm-dropdown-item
              :name="'' + item.id"
              v-for="(item, index) in noFilters"
              :key="index"
              >{{ item.label }}</sm-dropdown-item
            >
          </template>
          <template slot="content" v-if="options.length">
            <sm-dropdown-item
              :name="'' + index"
              v-for="(item, index) in options"
              :key="index"
              >{{ item.label }}</sm-dropdown-item
            >
          </template>
        </sm-dropdown>
        <input
          v-else
          ref="input"
          class="form-control"
          @keyup.enter="enter"
          :disabled="currentDisable"
          :value="currentValue"
          :placeholder="placeholder"
          @input="input"
        />
      </div>
    </div>
    <span
      class="right-icon"
      @click="clear"
      v-show="currentValue || tags.length"
    >
      <clearsvg />
    </span>
  </div>
</template>
<script>
import Icon from "../Icon/Icon.vue";
import DropDown from "../DropDown/DropDown.vue";
import DropDownItem from "../DropDown/DropDownItem.js";
import clearicon from "./clearicon.vue";
export default {
  name: "sm-search-input",
  components: {
    "sm-icon": Icon,
    "sm-dropdown": DropDown,
    "sm-dropdown-item": DropDownItem,
    clearsvg: clearicon
  },
  props: {
    value: String,
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
      this.currentValue = n;
    },
    filters(n) {
      if (n) {
        this.currentFilters = n.map((el, index) => {
          return { ...el, checked: false, id: index };
        });
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
    focus() {
      if (this.showFilter) {
        this.$refs.dropdown.active = true;
      }
    },
    enter() {
      if (this.options.length) {
        return;
      }
      if (this.filters.length) {
        if (!this.showFilter) {
          let choosed = this.currentFilters[this.lastFilterIndex];
          if (choosed && !choosed.checked) {
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
        this.options = [];
        this.lastFilterIndex = -1;
        this.tags = [];
        this.currentFilters = this.filters.map((el, index) => {
          return { ...el, checked: false, id: index };
        });

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

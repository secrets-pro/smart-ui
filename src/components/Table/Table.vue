<template>
  <!--v-show="this.currentData && this.currentData.length > 0"-->
  <div class="sm-table-container" :class="{ [type]: type }">
    <sm-spin size="large" fix v-show="spin">
      <sm-loading></sm-loading>
    </sm-spin>
    <div
      v-if="$slots.header || $slots.tool"
      class="sm-table-header"
      :class="{ hasTitle: type !== 'simple' }"
    >
      <div class="label">
        <slot name="header"></slot>
      </div>
      <div class="tool">
        <slot name="tool"></slot>
      </div>
      <div class="operate" v-if="$slots.operate && showOperate">
        <slot name="operate"></slot>
      </div>
    </div>
    <div
      class="sm-table-title"
      :class="{ hasHeader: $slots.header }"
      v-if="type !== 'simple'"
    >
      <div class="level">
        <slot name="searchext"></slot>
        <div class="level-item" v-if="showSearch">
          <ts
            v-model="search"
            @search="handleEnter"
            @clear="handleEnter"
            :placeholder="searchPlaceholder"
            :filters="filters"
          />
        </div>
        <div class="level-right">
          <div class="buttons">
            <sm-button type="primary" icon="refresh" @on-click="refresh(page)"
              >刷新</sm-button
            >
            <slot name="extra" />
            <sm-button
              v-if="compare"
              type="info"
              icon="compare"
              @on-click="showCheckbox"
              >版本比对</sm-button
            >
          </div>
        </div>
      </div>
    </div>

    <Table
      v-if="!$scopedSlots.default"
      ref="tableCom"
      :fixed="fixed"
      :height="height"
      :columns="columns"
      :selectAll="selectAll"
      :setting-cloumns="showColumns"
      :data="currentData"
      @on-choosed-item="choosedItem"
      :class="{ nopagination: !pagination }"
    ></Table>
    <div
      class="sm-table-custom"
      v-else
      v-for="(item, index) in currentData"
      :key="index"
    >
      <slot :data="item" :columns="columns" />
    </div>
    <div class="sm-table-empty" v-if="!currentData.length">
      <slot name="empty">暂无数据</slot>
    </div>
    <div v-if="!pagination" class="sm-table-nopagination"></div>
    <sm-pagination
      v-if="pagination"
      :page="page"
      :pageSize="pageSize"
      :total="total"
      @on-page-change="pageTo"
    ></sm-pagination>
    <Modal width="90%" v-model="codediff" title="代码比对">
      <div
        class="level"
        style="background: #242e42;color: #fff;margin: auto 1px"
      >
        <div class="level-item" style="justify-content: center;">
          {{ originVersion }}
        </div>
        <div class="level-item" style="justify-content: center;">
          {{ targetVersion }}
        </div>
      </div>
      <sm-codediff :origin="origin" :target="target"></sm-codediff>
      <div slot="footer">
        <sm-button @on-click="codediff = false" type="dark">取消</sm-button>
      </div>
    </Modal>
  </div>
</template>
<script>
import Table from "./table.js";
import tableSearch from "../TableSearch/TableSearch.vue";
import Pagination from "./Pagination.vue";
import Button from "../Button/Button";
export default {
  name: "sm-table",
  props: {
    type: String,
    sortBy: String,
    sort: Function,
    columns: {
      type: Array,
      required: true
    },
    url: String,
    showSearch: Boolean,
    pagination: Boolean,
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    searchParams: {
      type: Object,
      default() {
        return {};
      }
    },
    searchPlaceholder: String,
    filters: {
      type: Array,
      default() {
        return [];
      }
    },
    fixed: Boolean,
    height: String,
    selectAll: Boolean,
    compare: String // 开启代码比对 每行数据的具体字段
  },
  data() {
    return {
      originVersion: "",
      targetVersion: "",
      codediff: false,
      showOperate: false,
      origin: null,
      target: null,
      currentUrl: this.url,
      search: "",
      currentData: this.data,
      page: 1,
      pageSize: 10,
      total: 0,
      spin: false,
      showColumns: [],
      currwntSortBy: this.sortBy
    };
  },
  watch: {
    sortBy(n) {
      this.currwntSortBy = n;
      this.refresh();
    },
    data(n) {
      this.currentData = n;
    },
    url(n) {
      this.currentUrl = n;
    }
  },
  computed: {},
  methods: {
    showCheckbox() {
      if (this.columns[0].type !== "checkbox") {
        this.columns.unshift({
          type: "checkbox"
        });
      } else {
        this.columns.shift();
      }
    },
    setUrl(url) {
      this.currentUrl = url;
      this.refresh(1);
    },
    choosedItem() {
      //this.showOperate = status;
      let checked = this.$refs.tableCom.getChecked();

      if (checked.length === 2) {
        // 选中2个后 就不想允许选择了
        let originO = this.currentData[checked[0]];
        let targetO = this.currentData[checked[1]];
        let origin = originO[this.compare];
        let target = targetO[this.compare];
        if (typeof origin === "string") {
          origin = JSON.parse(origin);
        }
        if (typeof target === "string") {
          target = JSON.parse(target);
        }

        this.target = target;
        this.origin = origin;
        this.originVersion = "版本:#" + originO.id;
        this.targetVersion = "版本:#" + targetO.id;
        this.$nextTick(() => {
          this.codediff = true;
        });
      }
    },
    dymics() {
      let dyms = this.columns
        .filter(el => el.dymic)
        .map(el => {
          return {
            key: el.key,
            title: el.title
          };
        });
      return dyms;
    },
    loading(flag) {
      flag = !!flag;
      if (this.spin === flag) {
        return;
      }

      this.spin = flag;
    },
    getCheckedIndex() {
      return this.$refs.tableCom.getChecked();
    },
    pageTo(page) {
      if (this.currentUrl) {
        this.page = page;
        this.getData(this.search);
      }
    },
    handleEnter(value) {
      this.page = 1;
      this.getData(value);
    },
    async getData(value) {
      let params = {
        ...this.searchParams
      };
      if (typeof value === "string") {
        params.searchValue = value;
        if (value) {
          params.name = value;
        }
      } else if (typeof value === "object") {
        params = Object.assign(params, value);
      }
      if (this.currwntSortBy) {
        params.sortby = this.currwntSortBy;
      } else {
        params.sortby = "-createTime";
      }
      if (this.pagination) {
        Object.assign(params, {
          page: this.page,
          pageSize: this.pageSize
        });
      }
      if (!this.currentUrl || this.currentUrl.indexOf("undefined") > -1) {
        console.error("search url :" + this.currentUrl);
        return;
      }

      let resp = await this.getRemoteData(this.currentUrl, params, {
        loading: true
      });

      if (resp) {
        let data = resp.data || [];
        if (this.sort) {
          this.currentData = data.sort(this.sort);
        } else {
          this.currentData = data;
        }
        // console.log("http", resp.data);
        this.currentData = resp.data || [];
        this.$emit("on-refresh", JSON.parse(JSON.stringify(resp.data)));
      }
      if (this.pagination) {
        if (resp && !isNaN(resp.total)) {
          this.total = resp.total;
        }
      }
    },
    //刷新
    refresh(page) {
      if (!this.currentUrl) {
        //没url的时候可以自己去实现数据获取给data赋值
        this.$emit("on-refresh", page || 1);
      } else {
        this.pageTo(page || this.page);
      }
    }
  },
  components: {
    Table,
    ts: tableSearch,
    "sm-button": Button,
    "sm-pagination": Pagination
  },
  mounted() {
    this.pageTo(1);
    this.showColumns = this.dymics().map(el => el.key);
  },
  destroyed() {
    this.currentData = [];
  }
};
</script>

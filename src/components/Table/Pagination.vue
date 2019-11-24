<template>
  <div class="sm-table-foot">
    <div
      class="level"
      :style="{ 'justify-content': hasTotal ? 'space-between' : 'flex-end' }"
    >
      <div class="level-left">
        <div class="pagination" v-if="totalPage > 0 || type === 'simple'">
          <ul>
            <li v-show="type !== 'simple'">
              <a
                class="page"
                @click="pageTo(1)"
                :class="{ disabled: currentPage === 1 }"
              >
                <sm-icon size="18" type="first_page"></sm-icon>
              </a>
            </li>
            <li>
              <a
                class="page"
                :class="{ disabled: currentPage === 1 }"
                @click="pageTo(currentPage - 1)"
              >
                <sm-icon size="18" type="keyboard_arrow_left"></sm-icon>
                {{ type === "simple" ? "上一页" : "" }}
              </a>
            </li>
            <li v-for="i in recent5()" :key="i">
              <a @click="pageTo(i)" :class="{ active: currentPage === i }">{{
                i
              }}</a>
            </li>

            <li>
              <a
                class="page"
                @click="pageTo(currentPage + 1)"
                :class="{ disabled: currentPage === totalPage }"
              >
                {{ type === "simple" ? "下一页" : "" }}
                <sm-icon size="18" type="keyboard_arrow_right"></sm-icon>
              </a>
            </li>
            <li v-show="type !== 'simple'">
              <a
                class="page"
                @click="pageTo(totalPage)"
                :class="{ disabled: currentPage === totalPage }"
              >
                <sm-icon size="18" type="last_page"></sm-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="level-right">
        <div v-if="currentTotal">
          当前第{{ currentPageSize * (currentPage - 1) + 1 }}-{{
            currentTotal > currentPage * currentPageSize
              ? currentPage * currentPageSize
              : currentTotal
          }}
        </div>
        <div style="padding-left:8px;" v-if="hasTotal">
          共 {{ currentTotal }} 个条目
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "sm-pagination",
  props: {
    page: Number,
    pageSize: Number,
    total: Number,
    type: String,
    hasTotal: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      totalPage: 0,
      currentPage: this.page,
      currentTotal: this.total,
      currentPageSize: this.pageSize || 10,
      lastrecent5: null
    };
  },
  watch: {
    total(value) {
      this.currentTotal = value;
      this.setTotalPage();
    },
    page(value) {
      this.currentPage = value;
    },
    pageSize(value) {
      this.currentPageSize = value;
    }
  },
  mounted() {
    this.setTotalPage();
  },
  methods: {
    setPage(page) {
      this.currentPage = page;
    },
    //最近5页
    recent5() {
      let begin = Math.floor(this.currentPage / 6);
      let end = begin + 1;
      let result = [];
      for (let i = begin * 5 + 1; i <= end * 5 && i <= this.totalPage; i++) {
        result.push(i);
      }
      if (!this.lastrecent5 && result.length) {
        this.lastrecent5 = result;
      }
      if (!result.length && this.lastrecent5) {
        return this.lastrecent5;
      }
      return result;
    },
    pageTo(page) {
      if (this.type === "simple") {
        if (page <= 0) {
          page = 1;
        }
      } else {
        if (page > this.totalPage) {
          return;
        }
        if (page <= 0) {
          page = 1;
        }
      }
      console.log(this.currentPage, page);
      if (this.currentPage != page) {
        this.currentPage = page;
        this.$emit("on-page-change", page);
      }
    },
    setTotalPage() {
      let s = this.currentTotal / this.currentPageSize;
      let z = Math.floor(s);
      this.totalPage = s > z ? z + 1 : z;
    }
  }
};
</script>

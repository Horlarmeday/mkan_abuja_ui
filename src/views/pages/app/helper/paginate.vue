<template>
  <div>
    <!--begin: Pagination-->
    <div class="kt-pagination  kt-pagination--brand">
      <ul class="kt-pagination__links">
        <li class="kt-pagination__link--first">
          <a type="button" @click="onClickFirstPage" :disabled="isInFirstPage"
            ><i class="flaticon2-fast-back kt-font-brand"></i
          ></a>
        </li>
        <li class="kt-pagination__link--next">
          <a
            type="button"
            @click="onClickPreviousPage"
            :disabled="isInFirstPage"
            ><i class="flaticon2-back kt-font-brand"></i
          ></a>
        </li>
        <li v-for="page in pages" :key="page.name">
          <a
            type="button"
            @click="onClickPage(page.name)"
            :disabled="page.isDisabled"
            :class="isPageActive(page.name) ? active : ''"
          >
            {{ page.name }}</a
          >
        </li>
        <li class="kt-pagination__link--prev">
          <a type="button" @click="onClickNextPage" :disabled="isInLastPage"
            ><i class="flaticon2-next kt-font-brand"></i
          ></a>
        </li>
        <li class="kt-pagination__link--last">
          <a type="button" @click="onClickLastPage" :disabled="isInLastPage"
            ><i class="flaticon2-fast-next kt-font-brand"></i
          ></a>
        </li>
      </ul>
      <div class="kt-pagination__toolbar">
        <select class="form-control kt-font-brand" style="width: 60px;">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span class="pagination__desc">
          Displaying {{ perPage }} of {{ total }} records
        </span>
      </div>
    </div>

    <!--end: Pagination-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'kt-pagination__link--active'
    }
  },
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons
      }
      // When in between
      return this.currentPage - 1
    },
    pages() {
      const range = []

      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i += 1
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        })
      }

      return range
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    }
  },
  methods: {
    isPageActive(page) {
      return this.currentPage === page
    },
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages)
    }
  }
}
</script>

<style lang="css" scoped>
.isDisabled {
  color: currentColor;
  cursor: not-allowed;
  opacity: 0.5;
  text-decoration: none;
}
</style>

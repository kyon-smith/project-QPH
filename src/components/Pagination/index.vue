<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$bus.$emit('getPageNo',pageNo-1)">上一页</button>

    <template v-if="startEnd.flag!=='short'&&startEnd.flag!=='start'">
      <button @click="$bus.$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
      <button v-if="startEnd.start !== 2">···</button>
    </template>

    <button v-for="page in (startEnd.end-startEnd.start+1)"
            @click="$bus.$emit('getPageNo',page + startEnd.start - 1)"
            :class="{active:pageNo==page + startEnd.start - 1}">
      {{ page + startEnd.start - 1 }}
    </button>


    <template v-if="startEnd.flag!=='short'&&startEnd.flag!=='end'">
      <button v-if="startEnd.end !== totalPage-1">···</button>
      <button @click="$bus.$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    </template>

    <button :disabled="pageNo==totalPage" @click="$bus.$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    startEnd() {
      const {pageNo, continues, totalPage} = this
      let start = 0, end = 0, flag = ''
      if (continues >= totalPage) {
        start = 1
        end = totalPage
        flag = 'short'
      } else if (continues < totalPage) {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if (start <= 1) {
          start = 1
          end = continues
          flag = 'start'
        }
        if (end >= totalPage) {
          end = totalPage
          start = totalPage - continues + 1
          flag = 'end'
        }
      }
      return {start, end, flag}
    }
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>

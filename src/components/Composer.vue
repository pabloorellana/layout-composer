<template>
  <div id="composer" class="row">
    <div class="table-container">
      <table-generator
        :rows="rows"
        :columns="columns"
        @table-changed="onTableChange"
        ></table-generator>
    </div>
  </div>
</template>
<script>
import * as dragula from 'dragula'
import TableGenerator from "@/components/TableGenerator";
console.log(dragula)
export default {
  components: {
    TableGenerator
  },
  data () {
    return {
      rows: 6,
      columns: 4 
    }
  },
  methods: {
    onTableChange (d) {
      console.log(d)
    }
  }
}
</script>
<style lang="less" scoped>
#composer {
  background-color: #fff;

  .table-container {
    background-color: #000;
    margin: 15px auto;
    width: 400px;
    height: 600px;
  }
}
</style>


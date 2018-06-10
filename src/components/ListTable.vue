<template>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="name" label="活动名称">
    </el-table-column>
    <el-table-column prop="name" label="活动类型">
    </el-table-column>
    <el-table-column prop="name" label="活动起止时间">
    </el-table-column>
    <el-table-column prop="name" label="参与人数">
    </el-table-column>
    <el-table-column prop="name" label="累计PV量">
    </el-table-column>
    <el-table-column prop="name" label="累计UV量">
    </el-table-column>
    <el-table-column fixed="right" label="操作">
      <template slot-scope="scope">
        <slot></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: ['list']
};
</script>


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
        <router-link to="/enroll-config/123">修改配置</router-link>
        <br/>
        <router-link to="/enroll-link/123">链接管理</router-link>
        <br/>
        <router-link to="/enroll-info/123">报名信息</router-link>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: ['list']
}
</script>


<template>
  <div class="enroll">
    <div class="list-top-btns">
      <el-button type="primary">下载报名信息</el-button>
    </div>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="nickname" label="姓名">
      </el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.headimgurl" alt="" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="地区">
        <template slot-scope="scope">
          <span>{{scope.row.province + ' ' + scope.row.city}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="附件">
        <template slot-scope="scope">
          <a href="#">附件1</a>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { actUserList } from '@/api';

export default {
  name: 'enroll-info',
  data() {
    return {
      list: []
    };
  },
  mounted() {
    actUserList().then(res => {
      const { arr } = res.data;
      this.list = arr;
    });
  }
};
</script>

<style lang="less">
</style>


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
          <!-- <a href="#">附件1</a> -->
        </template>
      </el-table-column>
    </el-table>

    <div class="page-wrap">
      <span>第 {{page}} 页</span>
      <el-button v-if="page > 1" @click="getData(page - 1)">上一页</el-button>
      <el-button v-if="hasNextPage" @click="getData(page + 1)">下一页</el-button>
    </div>

  </div>
</template>

<script>
import { actUserList } from '@/api';

export default {
  name: 'enroll-info',
  data() {
    return {
      count: 0,
      page: 0,
      pageSize: 0,
      list: []
    };
  },
  mounted() {
    this.getData(1);
  },
  computed: {
    hasNextPage() {
      return this.count > this.pageSize * this.page;
    }
  },
  methods: {
    getData(page) {
      actUserList(page).then(res => {
        const { arr } = res.data;
        this.list = arr;
        this.page = res.data.page;
        this.count = res.data.count;
        this.pageSize = res.data.pageSize;
      });
    }
  }
};
</script>

<style lang="less">
</style>


<template>
  <div class="vote">
    <div class="list-top-btns">
      <el-button type="primary" @click="createAct">创建活动</el-button>
    </div>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="活动名称">
      </el-table-column>
      <!-- <el-table-column prop="type" label="活动类型">
      </el-table-column> -->
      <el-table-column label="活动起止时间">
        <template slot-scope="scope">
          {{scope.row.starttime}}-{{scope.row.endtime}}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="join" label="参与人数">
      </el-table-column>
      <el-table-column prop="pv" label="累计PV量">
      </el-table-column>
      <el-table-column prop="uv" label="累计UV量">
      </el-table-column> -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <router-link :to="`/vote-config/${scope.row.id}`">修改配置</router-link>
          <br/>
          <router-link :to="`/vote-link/${scope.row.id}`">链接管理</router-link>
          <br/>
          <router-link :to="`/vote-info/${scope.row.id}`">报名信息</router-link>
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
import { actList } from '@/api';
import moment from 'moment';

export default {
  name: 'vote',
  data() {
    return {
      count: 0,
      page: 0,
      pageSize: 0,
      list: []
    };
  },
  computed: {
    hasNextPage() {
      return this.count > this.pageSize * this.page;
    }
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    createAct() {
      this.$router.push('/vote-config/create');
    },

    getData(page) {
      actList(page, null, 'vote').then(res => {
        this.page = res.data.page;
        this.count = res.data.count;
        this.pageSize = res.data.pageSize;
        this.list = res.data.arr.map(item => {
          return {
            ...item,
            starttime: moment(item.starttime).format('YYYY-MM-DD HH:mm:ss'),
            endtime: moment(item.endtime).format('YYYY-MM-DD HH:mm:ss')
          };
        });
      });
    }
  }
};
</script>

<style lang="less">
</style>


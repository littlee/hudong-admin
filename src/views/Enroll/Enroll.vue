<template>
  <div class="enroll">
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
          <router-link :to="`/enroll-config/${scope.row.id}`">修改配置</router-link>
          <br/>
          <router-link :to="`/enroll-link/${scope.row.id}`">链接管理</router-link>
          <br/>
          <router-link :to="`/enroll-info/${scope.row.id}`">报名信息</router-link>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { actList } from '@/api';
import moment from 'moment';

export default {
  name: 'enroll',
  data() {
    return {
      list: []
    };
  },
  mounted() {
    actList().then(res => {
      this.list = res.data.arr.map(item => {
        return {
          ...item,
          starttime: moment(item.starttime).format('YYYY-MM-DD HH:mm:ss'),
          endtime: moment(item.endtime).format('YYYY-MM-DD HH:mm:ss')
        };
      });
    });
  },
  methods: {
    createAct() {
      this.$router.push('/enroll-config/create');
    }
  }
};
</script>

<style lang="less">
</style>


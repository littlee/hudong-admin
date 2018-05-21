<template>
  <div class="enroll">
    <div class="list-top-btns">
      <el-button type="primary" @click="download">下载报名信息</el-button>
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
          <div v-for="(fo, index) in scope.row.form" :key="`link-block-${index}`" class="file-links">
            <template v-for="(file, fIdx) in fo.answers">
              <a :href="file.value" :key="`link-${fIdx}`" target="_blank">
                {{file.name}}
              </a>
              <br :key="`link-br-${fIdx}`" />
            </template>
          </div>
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
import config from '@/config';

export default {
  name: 'enroll-info',
  data() {
    return {
      activity_id: null,
      count: 0,
      page: 0,
      pageSize: 0,
      list: []
    };
  },
  mounted() {
    this.activity_id = this.$route.params.id;
    this.getData(1);
  },
  computed: {
    hasNextPage() {
      return this.count > this.pageSize * this.page;
    }
  },
  methods: {
    getData(page) {
      actUserList(this.activity_id, page).then(res => {
        const { arr } = res.data;
        this.list = arr.map(item => {
          return {
            ...item,
            form: item.form.filter(fo => {
              return fo.type === 'extra_file';
            })
          };
        });
        this.page = res.data.page;
        this.count = res.data.count;
        this.pageSize = res.data.pageSize;
      });
    },

    download() {
      window.location = config.api_prefix + '/collect/activity/user/download';
    }
  }
};
</script>

<style lang="less">
</style>


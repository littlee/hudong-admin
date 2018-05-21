<template>
  <div class="enroll-link">
    <div class="list-top-btns">
      <el-button type="primary" @click="openDia">
        添加
      </el-button>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="活动名称">
      </el-table-column>
      <el-table-column prop="url" label="活动链接">
      </el-table-column>
      <el-table-column label="用途说明">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.remark" :disabled="!scope.row.editing">
            <div slot="append">
              <el-button type="primary" @click="scope.row.editing = true" v-if="!scope.row.editing">
                编辑
              </el-button>
              <el-button type="primary" v-if="scope.row.editing" @click="saveRemark(scope.row)">
                保存
              </el-button>
            </div>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="del(scope.row)" disabled="submitting">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="page-wrap">
      <span>第 {{page}} 页</span>
      <el-button v-if="page > 1" @click="getData(page - 1)">上一页</el-button>
      <el-button v-if="hasNextPage" @click="getData(page + 1)">下一页</el-button>
    </div>

    <el-dialog title="新建渠道" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用途说明">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  channelList,
  updateChannel,
  createChannel,
  deleteChannel
} from '@/api';

export default {
  name: 'enroll-link',
  data() {
    return {
      submitting: false,
      dialogFormVisible: false,
      count: 0,
      page: 0,
      pageSize: 0,
      list: [],
      form: {
        activity_id: '',
        name: '',
        remark: ''
      }
    };
  },
  computed: {
    hasNextPage() {
      return this.count > this.pageSize * this.page;
    }
  },
  mounted() {
    this.form.activity_id = this.$route.params.id;
    this.getData(1);
  },
  methods: {
    getData(page) {
      channelList(this.form.activity_id, page).then(res => {
        this.page = res.data.page;
        this.count = res.data.count;
        this.pageSize = res.data.pageSize;
        this.list = res.data.arr.map(item => {
          return {
            ...item,
            editing: false
          };
        });
      });
    },

    saveRemark(row) {
      let data = Object.assign({}, row);
      updateChannel(data.id, data).then(res => {
        this.getData(this.page);
      });
    },

    openDia() {
      this.dialogFormVisible = true;
      this.form.name = '';
      this.form.remark = '';
    },

    submit() {
      this.submitting = true;
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = Object.assign({}, this.form);
          createChannel(data)
            .then(res => {
              this.submitting = false;
              this.dialogFormVisible = false;
              this.getData(1);
            })
            .catch(err => {
              this.submitting = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    del(row) {
      this.submitting = true;
      deleteChannel(row.id)
        .then(res => {
          this.submitting = false;
          this.getData(this.page);
        })
        .catch(err => {
          this.submitting = false;
        });
    }
  }
};
</script>

<style lang="less">
</style>


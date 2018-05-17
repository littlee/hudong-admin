<template>
  <div class="enroll-link">
    <div class="list-top-btns">
      <el-button type="primary">
        添加
      </el-button>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="活动名称">
      </el-table-column>
      <el-table-column prop="name" label="活动链接">
      </el-table-column>
      <el-table-column label="用途说明">
        <template slot-scope="scope">
          <el-input size="small">
            <div slot="append">
              <el-button type="primary">编辑</el-button>
            </div>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'enroll',
  data() {
    return {
      list: [
        {
          name: 'xx'
        }
      ]
    };
  }
};
</script>

<style lang="less">
</style>


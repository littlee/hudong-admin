<template>
  <div class="enroll">
    <div class="list-top-btns">
      <el-button type="primary">下载报名信息</el-button>
    </div>

    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="name" label="联系方式">
      </el-table-column>
      <el-table-column prop="name" label="邮箱地址">
      </el-table-column>
      <el-table-column fixed="right" label="附件">
        <template slot-scope="scope">
          <a href="#">附件1</a>
          <br/>
          <a href="#">附件2</a>
          <br/>
          <a href="#">附件3</a>
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


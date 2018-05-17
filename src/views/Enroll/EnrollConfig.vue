
<template>
  <div class="enroll-config">
    <h1>config {{id}}</h1>
    <el-form ref="form" :model="form">
      <el-form-item label="活动名称">
        <el-input v-model="form.name" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="分享文案">
        <el-input v-model="form.name" type="textarea" :rows="4" style="width:400px"></el-input>
      </el-form-item>

      <div>
        <img src="http://placehold.it/200x200" alt="">
        <br/>
        <el-button>添加封面</el-button>
        <div>建议尺寸</div>
      </div>

      <el-form-item label="开启附件上传功能">
        <el-switch v-model="form.enableUpload" active-color="#13ce66">
        </el-switch>
      </el-form-item>

      <el-form-item label="允许用户上传附件数量">
        <el-select v-model="form.anme" placeholder="请选择">
          <el-option :value="1">1</el-option>
          <el-option :value="2">2</el-option>
          <el-option :value="3">3</el-option>
        </el-select>
      </el-form-item>

      <div class="text-center">
        <el-button type="primary">确认并创建详情页</el-button>
      </div>

    </el-form>

  </div>
</template>

<script>
export default {
  name: 'enroll-config',
  data() {
    return {
      id: '',
      form: {
        enableUpload: false,
        name: ''
      }
    };
  },
  mounted() {
    this.id = this.$route.params.id;
  }
};
</script>

<style lang="less">
</style>


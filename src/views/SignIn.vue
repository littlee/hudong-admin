<template>
  <div class="sign-in">
    <h1 class="text-center">登录</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'sign-in',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  mounted() {
    this.$emit('signInMount');
  },
  destroyed() {
    this.$emit('signInDestroy');
  },
  methods: {
    onSubmit() {
      console.log('submit')
    }
  }
};
</script>

<style lang="less">
.sign-in {
  padding: 100px 0;
  width: 400px;
  margin: auto;
}
</style>


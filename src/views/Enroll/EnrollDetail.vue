
<template>
  <div class="enroll-detail">
    <h1>detail {{id}}</h1>
    <el-button type="primary">下一步</el-button>
  </div>
</template>

<script>
export default {
  name: 'enroll-detail',
  data() {
    return {
      id: ''
    };
  },
  mounted() {
    this.id = this.$route.params.id;
  }
};
</script>

<style lang="less">
</style>


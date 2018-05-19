
<template>
  <div class="enroll-detail">
    <el-button type="primary" @click="submit">下一步</el-button>
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
  },
  methods: {
    submit() {
      this.$router.push('/enroll')
    }
  }
};
</script>

<style lang="less">
</style>


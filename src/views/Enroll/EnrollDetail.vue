
<template>
  <div class="enroll-detail">

    <el-button type="primary" @click="submit">下一步</el-button>

    <el-row>
      <el-col :span="10">
        <iframe id="pre-iframe" class="preview-iframe" src="http://localhost:3000/?mock=1&editMode=1&page=Detail" frameborder="0" width="320" height="504" @load="iframeLoad"></iframe>
      </el-col>
      <el-col :span="12">
        <button>send</button>
      </el-col>
    </el-row>
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
      this.$router.push('/enroll');
    },
    iframeLoad() {
      console.log('ok');
    }
  }
};
</script>

<style lang="less" scoped>
.preview-iframe {
  border: 1px solid #666;
}
</style>



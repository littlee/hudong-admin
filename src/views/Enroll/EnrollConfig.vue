
<template>
  <div class="enroll-config">
    <el-form ref="form" :model="form">
      <el-form-item label="活动名称" required>
        <el-input v-model="form.name" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="分享标题" required>
        <el-input v-model="form.share_config.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="分享文案" required>
        <el-input v-model="form.share_config.desc" type="textarea" :rows="4" style="width:400px"></el-input>
      </el-form-item>

      <el-form-item label="活动时间" required>
        <el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="form.time">
        </el-date-picker>
      </el-form-item>

      <div>
        <ImgUpload v-model="form.images_config.home_bg" btnText="添加封面" :defaultValue="form.images_config.home_bg" />
        <ImgUpload v-model="form.images_config.result_bg" btnText="添加结果页" :defaultValue="form.images_config.result_bg" />
        <ImgUpload v-model="form.images_config.content_bg" btnText="添加内容页背景" :defaultValue="form.images_config.content_bg" />
      </div>
      <div>
        <ImgUpload v-model="form.share_config.icon" btnText="添加分享图标" :defaultValue="form.share_config.icon" />
        <ImgUpload v-model="form.images_config.home_btn" btnText="添加首页按钮" :defaultValue="form.images_config.home_btn" />
        <ImgUpload v-model="form.images_config.detail_btn" btnText="添加详情页按钮" :defaultValue="form.images_config.detail_btn" />
      </div>

      <!-- <el-form-item label="开启附件上传功能">
        <el-switch v-model="form.enableUpload" active-color="#13ce66">
        </el-switch>
      </el-form-item>

      <el-form-item label="允许用户上传附件数量">
        <el-select v-model="form.anme" placeholder="请选择">
          <el-option :value="1">1</el-option>
          <el-option :value="2">2</el-option>
          <el-option :value="3">3</el-option>
        </el-select>
      </el-form-item> -->

      <div class="text-center">
        <el-button type="primary" @click="submit" :disabled="submitting">确认并创建详情页</el-button>
      </div>

    </el-form>

  </div>
</template>

<script>
import ImgUpload from '../../components/ImgUpload.vue';
import { createAct, getAct, updateAct } from '@/api';
import moment from 'moment';

function formatTime(t) {
  return moment(t).format('YYYY-MM-DD HH:mm:ss');
}

const defaultQuestion = [
  {
    type: 'input',
    title: '姓名',
    required: true
  },
  {
    type: 'input',
    title: '手机号',
    required: true
  },
  {
    type: 'input',
    title: '就读学校',
    required: true
  },
  {
    type: 'input',
    title: '就读专业',
    required: true
  },
  {
    type: 'extra_file',
    title: '上传附件',
    required: true,
    min_num: 2,
    max_num: 3
  }
];

export default {
  name: 'enroll-config',
  components: {
    ImgUpload
  },
  data() {
    return {
      id: '',
      form: {
        name: '',
        share_config: {
          title: '',
          desc: '',
          icon: ''
        },
        images_config: {
          home_bg: '',
          result_bg: '',
          content_bg: '',
          home_btn: '',
          detail_btn: ''
        },
        time: []
      },
      submitting: false
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    if (this.id) {
      getAct(this.id).then(res => {
        this.form.name = res.data.name;
        this.form.share_config = res.data.share_config;
        this.form.images_config = res.data.images_config;
        this.form.time = [res.data.starttime, res.data.endtime];

        this.form.status = res.data.status;
      });
    }
  },

  methods: {
    submit() {
      this.submitting = true;
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = Object.assign({}, this.form);
          data.starttime = formatTime(data.time[0]);
          data.endtime = formatTime(data.time[1]);
          delete data['time'];
          data.questions_config = defaultQuestion;

          if (this.id) {
            updateAct(this.id, data).then(res => {
              this.submitting = false;
              this.$router.push('/enroll-detail/create');
            }).catch(err => {
              this.submitting = false;
            });
          } else {
            createAct(data).then(res => {
              this.submitting = false;
              this.$router.push('/enroll-detail/create');
            }).catch(err => {
              this.submitting = false;
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>



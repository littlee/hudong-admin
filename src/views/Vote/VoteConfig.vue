
<template>
  <div class="vote-config">
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

      <el-form-item label="投票形式" required>
        <el-select v-model="form.vote_type" placeholder="请选择">
          <el-option label="每天投票" value="every"></el-option>
          <el-option label="每个周期" value="all"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="可投票次数" required>
        <el-input v-model="form.vote_count" style="width:100px"></el-input>
      </el-form-item>

      <div class="upload-row">
        <ImgUpload v-model="form.images_config.home_bg" btnText="添加封面" :defaultValue="form.images_config.home_bg" />
        <ImgUpload v-model="form.images_config.result_bg" btnText="添加结果页" :defaultValue="form.images_config.result_bg" />
        <ImgUpload v-model="form.images_config.content_bg" btnText="添加内容页背景" :defaultValue="form.images_config.content_bg" />
      </div>
      <div class="upload-row">
        <ImgUpload v-model="form.share_config.icon" btnText="添加分享图标" :defaultValue="form.share_config.icon" />
        <ImgUpload v-model="form.images_config.home_btn" btnText="添加首页按钮" :defaultValue="form.images_config.home_btn" />
        <ImgUpload v-model="form.images_config.detail_btn" btnText="添加详情页按钮" :defaultValue="form.images_config.detail_btn" />
      </div>

      <div class="text-center">
        <el-button type="primary" @click="submit" :disabled="submitting">确认并创建详情页</el-button>
      </div>

    </el-form>

  </div>
</template>

<script>
import ImgUpload from '../../components/ImgUpload.vue';
import { getAct } from '@/api';
import moment from 'moment';
import config from '@/config';

function formatTime(t) {
  return moment(t).format('YYYY-MM-DD HH:mm:ss');
}

const defaultQuestion = [
  {
    title: '标题',
    vote_num: 0,
    add_vote_num: 0
  }
];

export default {
  name: 'vote-config',
  components: {
    ImgUpload
  },
  data() {
    return {
      id: '',
      form: {
        name: '',
        vote_type: 'every', // all
        vote_count: 0,
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
      getAct(this.id, 'vote').then(res => {
        this.form.name = res.data.name;
        this.form.share_config = res.data.share_config;
        this.form.images_config = res.data.images_config;
        this.form.time = [res.data.starttime, res.data.endtime];
        this.form.status = res.data.status;
        
        this.form.questions_config = res.data.vote_config;
        this.form.vote_type = res.data.vote_type;
        this.form.vote_count = res.data.vote_count;
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
          if (!this.id) {
            data.questions_config = defaultQuestion;
          }

          localStorage.setItem(config.config_data_key, JSON.stringify(data));

          if (this.id) {
            this.$router.push('/vote-detail/' + this.id);
          } else {
            this.$router.push('/vote-detail/create');
          }
        } else {
          this.submitting = false;
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.upload-row {
  margin-bottom: 15px;
}
</style>



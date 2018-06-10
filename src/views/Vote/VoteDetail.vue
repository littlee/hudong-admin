<template>
  <div class="enroll-detail">
    <div class="submit-btn">
      <el-button type="primary" @click="submit" :disabled="submitting">保存</el-button>
    </div>

    <el-row>
      <el-col :span="10">
        <iframe ref="preFrame" id="pre-iframe" class="preview-iframe" :src="`${previewUrl}?editMode=1&page=Detail&type=vote`" frameborder="0" width="375" height="603" @load="iframeLoad"></iframe>
      </el-col>
      <el-col :span="13">
        <div class="qu-add">
          <div class="pull-left">
            <el-button type="success" @click="preview">预览</el-button>
          </div>

          <el-button type="primary" @click="add">
            添加
          </el-button>
        </div>

        <div v-for="(qu, index) in not_del_questions_config" :key="`qu-${index}`" class="qu-block">
          <div class="qu-type">第 {{index + 1}} 个</div>
          <el-form>
            <el-form-item label="标题：" label-width="4em">
              <el-input v-model="qu.title"></el-input>
            </el-form-item>
            <el-form-item label="描述：" label-width="4em">
              <el-input v-model="qu.description"></el-input>
            </el-form-item>
            <el-form-item label="图片描述：">
              <ImgUpload v-model="qu.imageurl" :defaultValue="qu.imageurl" hasClear :size="120" :hasBtn="false" />
            </el-form-item>
            <el-form-item label="新增投票数：" label-width="7em">
              <el-input v-model="qu.add_vote_num"></el-input>
            </el-form-item>
            <div class="form-text">用户投票数：{{qu.vote_num}}</div>
            <div class="form-text">总票数：{{parseInt(qu.vote_num) + parseInt(qu.add_vote_num)}}</div>
          </el-form>

          <div class="qu-block-opt">
            <el-button-group>
              <el-button size="small" type="primary" v-if="index !== 0" title="上移" @click="moveUp(index)">
                <i class="el-icon-upload2"></i>
              </el-button>
              <el-button size="small" type="primary" v-if="index !== not_del_questions_config.length - 1" title="下移" @click="moveDown(index)">
                <i class="el-icon-download"></i>
              </el-button>
              <el-button size="small" type="danger" title="删除" @click="remove(index)">
                <i class="el-icon-circle-close"></i>
              </el-button>
            </el-button-group>
          </div>
        </div>

      </el-col>
    </el-row>
    <div class="submit-btn">
      <el-button type="primary" @click="submit" :disabled="submitting">保存</el-button>
    </div>
  </div>

</template>

<script>
import ImgUpload from '../../components/ImgUpload.vue';
import config from '@/config';
import { createAct, updateAct } from '@/api';

function arrayMove(arr, oldIndex, newIndex) {
  let newArr = arr.slice();
  let temp = newArr[newIndex];
  newArr[newIndex] = newArr[oldIndex];
  newArr[oldIndex] = temp;
  return newArr;
}

export default {
  name: 'enroll-detail',
  components: {
    ImgUpload
  },
  data() {
    return {
      id: '',
      previewUrl: config.preview_url,
      submitting: false,
      questions_config: []
    };
  },

  computed: {
    not_del_questions_config: function() {
      return this.questions_config.filter(item => item.isdel !== 1);
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    if (localStorage.getItem(config.config_data_key)) {
      this.questions_config = JSON.parse(
        localStorage.getItem(config.config_data_key)
      ).questions_config;
    }
  },
  methods: {
    submit() {
      this.submitting = true;
      let data = JSON.parse(localStorage.getItem(config.config_data_key));
      data.vote_config = this.questions_config;

      if (this.id) {
        updateAct(this.id, data, 'vote')
          .then(res => {
            this.submitting = false;
            this.$router.push('/vote');
          })
          .catch(err => {
            this.submitting = false;
          });
      } else {
        createAct(data, 'vote')
          .then(res => {
            this.submitting = false;
            this.$router.push('/vote');
          })
          .catch(err => {
            this.submitting = false;
          });
      }
    },
    iframeLoad() {
      if (localStorage.getItem(config.config_data_key)) {
        const configData = JSON.parse(
          localStorage.getItem(config.config_data_key)
        );
        this.sendMsg(configData);
      } else {
        console.log('go to config');
      }
    },

    preview() {
      const configData = {
        questions_config: this.not_del_questions_config
      };
      this.sendMsg(configData);
    },

    sendMsg(data) {
      let sendData = Object.assign({}, data);
      sendData.fromHudong = true;
      this.$refs.preFrame.contentWindow.postMessage(
        JSON.stringify(sendData),
        '*'
      );
    },

    add() {
      this.questions_config = this.questions_config.concat({
        title: '标题',
        vote_num: 0,
        add_vote_num: 0
      });
    },

    moveUp(index) {
      this.questions_config = arrayMove(
        this.questions_config,
        index,
        index - 1
      );
    },

    moveDown(index) {
      this.questions_config = arrayMove(
        this.questions_config,
        index,
        index + 1
      );
    },

    remove(rmIndex) {
      this.questions_config = this.questions_config.map((item, index) => {
        if (index === rmIndex) {
          return {
            ...item,
            isdel: 1
          };
        }
        return item;
      });
    },

    addOption(quIndex) {
      let targetQu = this.questions_config[quIndex];
      this.$set(
        targetQu,
        'options',
        targetQu.options.concat({
          name: '',
          imageurl: ''
        })
      );
    },

    moveUpOption(quIndex, opIndex) {
      let targetQu = this.questions_config[quIndex];
      if (targetQu.options[opIndex - 1]) {
        let nextOp = arrayMove(targetQu.options, opIndex, opIndex - 1);
        this.$set(targetQu, 'options', nextOp);
      }
    },

    moveDownOption(quIndex, opIndex) {
      let targetQu = this.questions_config[quIndex];
      if (targetQu.options[opIndex + 1]) {
        let nextOp = arrayMove(targetQu.options, opIndex, opIndex + 1);
        this.$set(targetQu, 'options', nextOp);
      }
    },

    removeOption(quIndex, opIndex) {
      let targetQu = this.questions_config[quIndex];
      let nextOp = targetQu.options.filter((op, i) => {
        return opIndex !== i;
      });
      this.$set(targetQu, 'options', nextOp);
    }
  }
};
</script>

<style lang="less" scoped>
.preview-iframe {
  border: 1px solid #666;
  border-radius: 5px;
}

.qu-block {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;

  &-opt {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}

.qu-add {
  padding: 10px 0;
  text-align: right;
}

.qu-type {
  font-weight: bold;
  margin: 10px 0;
}

.el-form-item {
  margin-bottom: 10px;
}

.submit-btn {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
  text-align: right;
}

.form-text {
  margin: 10px 0;
}
</style>
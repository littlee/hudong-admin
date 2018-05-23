<template>
  <div class="enroll-detail">
    <div class="submit-btn">
      <el-button type="primary" @click="submit" :disabled="submitting">保存</el-button>
    </div>

    <el-row>
      <el-col :span="10">
        <iframe ref="preFrame" id="pre-iframe" class="preview-iframe" :src="`${previewUrl}?editMode=1&page=Detail`" frameborder="0" width="375" height="603" @load="iframeLoad"></iframe>
      </el-col>
      <el-col :span="13">
        <div class="qu-add">
          <div class="pull-left">
            <el-button type="success" @click="preview">预览</el-button>
          </div>

          <el-select v-model="addType">
            <el-option v-for="(value, key) in typeMap" :key="`type-op-${key}`" :label="value" :value="key"></el-option>
          </el-select>
          <el-button type="primary" @click="add">
            添加
          </el-button>
        </div>

        <div v-for="(qu, index) in questions_config" :key="`qu-${index}`" class="qu-block">
          <div class="qu-type">第 {{index + 1}} 题（{{typeMap[qu.type]}}）</div>
          <el-form>
            <el-form-item label="标题：" label-width="4em">
              <el-input v-model="qu.title"></el-input>
            </el-form-item>
            <el-form-item label="描述：" label-width="4em">
              <el-input v-model="qu.description"></el-input>
            </el-form-item>
            <el-row>
              
              <el-col :span="12">
                <el-form-item label="图片描述：">
                  <ImgUpload v-model="qu.imageurl" hasClear :size="120" :hasBtn="false" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否必填：">
                  <el-checkbox v-model="qu.required">必填</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>

            <template v-if="qu.type === 'input'">
              <el-form-item label="输入框行数：" label-width="8em">
                <el-input v-model.number="qu.lines"></el-input>
              </el-form-item>
              <el-form-item label="最小字数限制：" label-width="8em">
                <el-input v-model.number="qu.min_num"></el-input>
              </el-form-item>
              <el-form-item label="最大字数限制：" label-width="8em">
                <el-input v-model.number="qu.max_num"></el-input>
              </el-form-item>
            </template>
            <template v-if="qu.type === 'single_choose' || qu.type === 'multi_choose' || qu.type === 'sort'">
              <div class="text-right">
                <el-button type="primary" size="small" @click="addOption(index)">添加选项</el-button>
              </div>
              <el-table :data="qu.options" :cell-style="{padding:0}">
                <el-table-column label="文字描述">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.name"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="图片描述" width="120">
                  <template slot-scope="scope">
                    <div style="margin-top:10px;">
                      <ImgUpload v-model="scope.row.imageurl" :defaultValue="scope.row.imageurl" hasClear :size="70" :hasBtn="false" />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button-group>
                      <el-button size="small" @click="moveUpOption(index, scope.$index)">上移</el-button>
                      <el-button size="small" @click="moveDownOption(index, scope.$index)">下移</el-button>
                      <el-button type="danger" size="small" @click="removeOption(index, scope.$index)">删除</el-button>
                    </el-button-group>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <template v-if="qu.type === 'extra_file'">
              <el-form-item label="最小上传限制：" label-width="8em">
                <el-input v-model.number="qu.min_num"></el-input>
              </el-form-item>
              <el-form-item label="最大上传限制：" label-width="8em">
                <el-input v-model.number="qu.max_num"></el-input>
              </el-form-item>
            </template>
          </el-form>

          <div class="qu-block-opt">
            <el-button-group>
              <el-button size="small" type="primary" v-if="index !== 0" title="上移" @click="moveUp(index)">
                <i class="el-icon-upload2"></i>
              </el-button>
              <el-button size="small" type="primary" v-if="index !== questions_config.length - 1" title="下移" @click="moveDown(index)">
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
      addType: 'input',
      typeMap: {
        input: '文本输入',
        single_choose: '单选题',
        multi_choose: '多选题',
        sort: '排序题',
        extra_file: '附件题'
      },
      questions_config: []
    };
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
      let data = JSON.parse(localStorage.getItem(config.config_data_key))
      data.questions_config = this.questions_config;
    
      if (this.id) {
        updateAct(this.id, data).then(res => {
          this.submitting = false;
          this.$router.push('/enroll');
        }).catch(err => {
          this.submitting = false;
        });
      } else {
        createAct(data).then(res => {
          this.submitting = false;
          this.$router.push('/enroll');
        }).catch(err => {
          this.submitting = false;
        });
      }
    },
    iframeLoad() {
      if (localStorage.getItem(config.config_data_key)) {
        const configData = JSON.parse(localStorage.getItem(config.config_data_key));
        this.sendMsg(configData);
      } else {
        console.log('go to config');
      }
    },

    preview() {
      const configData = {
        questions_config: this.questions_config
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
      let newQu = {
        type: this.addType
      };
      if (this.addType === 'single_choose' || this.addType === 'multi_choose' || this.addType === 'sort') {
        newQu.options = []
      }
      this.questions_config = this.questions_config.concat(newQu);
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
      this.questions_config = this.questions_config.filter((item, index) => {
        return index !== rmIndex;
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
</style>
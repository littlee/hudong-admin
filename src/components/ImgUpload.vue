<template>
  <div class="img-upload">
    <div class="blank">
      <img :src="image" alt="" v-if="image" :style="`opacity:${uploading?'0.5': '1'}`">
    </div>
    <input type="file" @change="_fileChange" class="file-input" ref="fileInput" accept="image/*">

    <el-button @click="_clickFileInput">{{uploading ? '上传中...' : btnText}}</el-button>
  </div>
</template>
<script>
import OSS from 'ali-oss';
import { getToken } from '@/api';
import shortid from 'shortid';

function getFileKey() {
  return shortid.generate() + '' + Date.now();
}

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    defaultValue: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: '选择图片'
    }
  },

  data() {
    return {
      uploading: false,
      fileReader: new FileReader(),
      image: this.defaultValue,
      sign: null
    };
  },

  watch: {
    defaultValue(value) {
      this.image = value;
    }
  },

  methods: {
    _fileChange(e) {
      if (e.target.files && e.target.files[0]) {
        let file = e.target.files[0];
        if (!/\.(gif|jpe?g|png)$/i.test(file.name)) {
          return alert('请选择图片文件, 支持 jpg, png, gif');
        }

        if (file.size > 1024 * 1024 * 3) {
          return alert('文件不能超过3M');
        }

        this.uploading = true;
        this.fileReader.onload = e => {
          this.image = e.target.result;
          // this.$emit('input', sign.url);
          getToken().then(res => {
            const {
              region,
              AccessKeyId: accessKeyId,
              AccessKeySecret: accessKeySecret,
              SecurityToken: stsToken,
              bucket
            } = res.data;

            let ossClient = new OSS.Wrapper({
              region,
              accessKeyId,
              accessKeySecret,
              stsToken,
              bucket
            });

            let fileKey = getFileKey();

            ossClient.multipartUpload('object-key', file).then(ossRes => {
              this.uploading = false;
              this.$emit(
                'input',
                `http://${bucket}.${region}.aliyuncs.com/${fileKey}`
              );
            });
          });
        };
        this.fileReader.readAsDataURL(file);
      }
    },

    _clickFileInput() {
      if (this.uploading) {
        return;
      }
      this.$refs.fileInput.click();
    }
  }
};
</script>
<style lang="less" scoped>
.img-upload {
  text-align: center;
  display: inline-block;
  margin-bottom: 10px;
}

.file-input {
  display: none;
}

.blank {
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
  vertical-align: middle;
  position: relative;
  box-sizing: border-box;
  background-color: white;
  margin-bottom: 10px;

  > img {
    max-width: 90%;
    max-height: 90%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
</style>

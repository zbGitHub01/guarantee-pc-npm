<template>
  <a-modal
    :closable="false"
    :visible="visible"
    :confirm-loading="loading"
    width="960px"
    @cancel="handleCancel"
  >
    <template slot="title">
      <div class="title">
        {{ title }}
      </div>
    </template>
    <template slot="footer">
      <a-button
        class="btn cancel"
        v-if="cancelText"
        key="cancel"
        @click="handleCancel"
      >
        {{ cancelText }}
      </a-button>
      <a-button
        class="btn submit"
        v-if="okText"
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
      >
        {{ okText }}
      </a-button>
    </template>
    <div
      class="content"
      v-html="content"
    />
    <div
      class="know"
      v-if="isShowKnowTips"
    >
      <a-checkbox
        class="checkbox"
        v-model="isKnow"
      >
        我已阅读并同意<b>《{{ title }}》</b>
      </a-checkbox>
    </div>
  </a-modal>
</template>

<script>
import { Modal, Checkbox, Button } from 'ant-design-vue';

export default {
  name: 'DocumentDialog',
  components: {
    aCheckbox: Checkbox,
    aModal: Modal,
    aButton: Button,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    okText: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '',
    },
    isShowKnowTips: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isKnow: false,
    };
  },
  methods: {
    handleOk() {
      this.$emit('ok', {
        isKnow: this.isKnow,
      });
    },
    handleCancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="less" scoped>
@import './theme.less';

/deep/ .ant-modal-content{
  padding: 45px 50px;
  box-sizing: content-box;
}
/deep/ .ant-modal-header{
  border-bottom: 0 none;
  padding:0;
  line-height: 1;
}
/deep/ .ant-modal-body{
  margin-top: 40px;
  padding:0;
}
/deep/ .ant-modal-footer{
  padding:0;
  border-top:0 none;
  margin-top: 30px;
  text-align: center;
}
.title{
  font-size: 22px;
  font-weight: bold;
  color: #333;
  text-align: center;
}
.content{
  height: 330px;
  padding:30px;
  box-sizing: content-box;
  overflow-y: scroll;
  border: 1px solid #E5E5E5;
}
.btn{
  padding:12px 26px;
  height: auto;
  font-size: 16px;
  line-height: 1;
  &+.btn{
    margin-left: 30px;
  }
}
.know{
  margin-top: 25px;
  font-size: 14px;
  color:#666;
  .checkbox{
    margin-right: 10px;
  }
  b{
    color:#1372BF
  }
}
</style>

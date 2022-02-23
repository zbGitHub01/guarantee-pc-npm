<template>
  <div>
    <a-modal
      :visible="visible"
      :title="title"
      width="700px"
      :mask-closable="false"
      :footer="null"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item
          v-for="item in formFields"
          :key="item.property"
          :label="item.label"
          :prop="item.property"
          :rules="formValidator(item)"
        >
          <a-input
            v-if="item.type==='input'"
            v-model="form[item.property]"
          />

          <a-textarea
            :placeholder="item.placeholder"
            v-if="item.type==='textarea'"
            v-model="form[item.property]"
            :rows="4"
          />

          <a-input
            class="imgCode_input"
            v-model="form[item.property]"
            v-if="item.type==='imgCode'"
          />
          <a-button
            class="imgCode_button"
            type="primary"
            v-if="item.type==='imgCode'"
          >
            图片验证码
          </a-button>

          <a-input
            class="imgCode_input"
            v-if="item.type==='phoneCode'"
            v-model="form[item.property]"
          />
          <a-button
            class="imgCode_button"
            type="primary"
            v-if="item.type==='phoneCode'"
          >
            获取手机验证码
          </a-button>
          <div
            class="tips"
            v-if="item.type==='phoneCode'"
          >
            <span>您投保时使用的手机号为134xxxxxxx443</span>
          </div>
        </a-form-model-item>

        <a-form-model-item class="foot_item">
          <div
            class="foot_button"
          >
            <a-button
              @click="handleCancel"
            >
              {{ cancelText }}
            </a-button>
            <a-button
              type="primary"
              @click="handleSubmit"
            >
              {{ confirmText }}
            </a-button>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { FormModel, Input, Button } from 'ant-design-vue';
export default {
  name: 'Formily',
  components: {
    aFormModel: FormModel,
    aFormModelItem: FormModel.Item,
    aInput: Input,
    aTextarea: Input.TextArea,
    aButton: Button,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    formFields: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isShow(val) {
      this.visible = val;
    },
  },
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 13 },
      form: {},
      visible: false,
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          this.$message.warning('请完善表单信息');
        } else {
          this.$emit('submit',this.form);
        }
      });
    },
    handleCancel() {
      this.$emit('close');
      this.$refs.ruleForm.resetFields();
    },

    // 验证码接口校验
    mobilePhoneValidate(rule, value, callback) {
      if (typeof (value) === 'undefined' || value === '') {
        callback();
      } else {
        const regex = /^1[3456789]\d{9}$/;
        if (!regex.test(value)) {
          callback(new Error('请输入正确的手机号码格式'));
        }
        callback();
      }
    },

    // 表单校验配置
    formValidator(value) {
      let rules = [{
        required: true,
        message: '请输入' + value.label + '!',
        trigger: 'blur',
      }];
      switch (value.type) {
        case 'input':
          return rules;
        case 'textarea':
          rules = [{
            required: true,
            message: '请输入' + value.label + '!',
            trigger: 'blur',
          }];
          return rules;
        case 'imgCode':
          rules = [{
            required: true,
            message: '请输入' + value.label + '!',
            trigger: 'blur',
          }, { validator: this.mobilePhoneValidate }];
          return rules;
        case 'phoneCode':
          rules = [{
            required: true,
            message: '请输入' + value.label + '!',
            trigger: 'blur',
          }];
          return rules;

        default:
          return rules;
      }
    },

  },
};

</script>
<style lang="less" scoped>

.ant-form-item {
    margin-bottom:18px
}
/deep/ .ant-modal-title {
    text-align: center;
    font-weight: bolder;
    font-size: 22px;
}
/deep/ .ant-modal-header {
    height: 85px;
    padding-top: 24px;
}
/deep/ .ant-form-item-label {
   text-align: left;
 }
/deep/ .ant-modal-body {
   padding-left: 80px;
   padding-bottom: 5px;
 }

/deep/ .ant-form-item-label > label::after {
   content: '';
}
/deep/ .ant-form-item-label  label,.ant-radio-wrapper{
   font-size: 16px;
}
/deep/ .ant-form-item-control-wrapper {
  margin-left: 20px;
  line-height: 1;
}
/deep/ .ant-form-item-control-wrapper:nth-child(3) {
  margin-left: 120px !important;
  line-height: 1;
}
/deep/.ant-radio-group {
  display: flex;
}
/deep/ .ant-input {
  height: 40px;
}
.foot_button {
    width: 100%;
    display: flex;
    margin: 5px 0 50px 29%;
    justify-content: space-around;
    button {
        width: 120px;
        height: 40px;
        &+ button {
          margin-left: -45px;
        }
    }
}
.imgCode_input {
    width: 150px;
}
.imgCode_button {
    margin-left: 10px;
}

</style>

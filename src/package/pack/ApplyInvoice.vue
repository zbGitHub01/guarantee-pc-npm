<template>
  <div>
    <a-modal
      :visible="isShow"
      title="申请发票"
      width="700px"
      :mask-closable="false"
      ok-text="确定申请"
      cancel-text="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item
          label="发票形式"
          prop="invoiceShape"
        >
          <a-radio-group
            v-model="form.invoiceShape"
          >
            <a-radio value="2">
              普通发票（纸质）
            </a-radio>
            <a-radio
              value="1"
            >
              电子发票（非纸质）
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
          label="发票类型"
          prop="invoiceType"
        >
          <a-radio-group
            class="firstRadioGroup"
            v-model="form.invoiceType"
          >
            <a-radio
              value="1"
            >
              增值税普通发票
            </a-radio>
            <a-radio
              :disabled="disabled"
              value="2"
            >
              增值税专用发票
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item
          label="发票抬头"
          prop="invoiceHeader"
        >
          <span
            v-if="Object.keys(this.defaultValueForm).includes('invoiceHeader')"
          >
            {{ form.invoiceHeader }}</span>
          <a-input
            v-else
            v-model="form.invoiceHeader"
          />
        </a-form-model-item>
        <a-form-model-item
          label="纳税人识别号"
          prop="taxpayerNum"
        >
          <span
            v-if="Object.keys(this.defaultValueForm).includes('taxpayerNum')"
          >
            {{ form.taxpayerNum }}</span>
          <a-input
            v-else
            v-model="form.taxpayerNum"
          />
        </a-form-model-item>

        <a-form-model-item
          label="收件人电子邮箱"
          v-if="form.invoiceShape==='1'"
          prop="inboxMail"
        >
          <a-input
            v-model="form.inboxMail"
          />
        </a-form-model-item>

        <div
          v-if="form.invoiceType==='2'"
        >
          <a-form-model-item
            label="注册地址"
            prop="registerAddress"
          >
            <a-input
              v-model="form.registerAddress"
            />
          </a-form-model-item>
          <a-form-model-item
            label="联系电话"
            prop="telephoneNum"
          >
            <a-input
              v-model="form.telephoneNum"
            />
          </a-form-model-item>
          <a-form-model-item
            label="开户行"
            prop="openingBank"
          >
            <a-input
              v-model="form.OpeningBank"
            />
          </a-form-model-item>
          <a-form-model-item
            label="银行账号"
            prop="bankAccount"
          >
            <a-input
              v-model="form.bankAccount"
            />
          </a-form-model-item>
        </div>
        <div
          v-if="form.invoiceShape==='2'"
        >
          <a-form-model-item
            label="收件人"
            prop="inboxPerson"
          >
            <a-input
              v-model="form.inboxPerson"
            />
          </a-form-model-item>
          <a-form-model-item
            label="收件人手机号"
            prop="inboxPhone"
          >
            <a-input
              v-model="form.inboxPhone"
            />
          </a-form-model-item>
          <a-form-model-item
            label="收件地址"
            prop="inboxAddress"
          >
            <a-input
              v-model="form.inboxAddress"
            />
          </a-form-model-item>
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { FormModel, Input, message, Radio } from 'ant-design-vue';
export default {
  name: 'ApplyInvoice',
  components: {
    aFormModel: FormModel,
    aFormModelItem: FormModel.Item,
    aInput: Input,
    aRadio: Radio,
    aRadioGroup: Radio.Group,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    defaultValueForm: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 13 },
      other: '',
      form: {
        invoiceHeader: this.defaultValueForm.invoiceHeader,
        taxpayerNum: this.defaultValueForm.taxpayerNum,
        invoiceShape: '1',
        invoiceType: '1',
        registerAddress: '',
        telephoneNum: '',
        openingBank: '',
        bankAccount: '',
        inboxMail: '',
        inboxPerson: '',
        inboxPhone: '',
        inboxAddress: '',
      },
      rules: {
        invoiceShape: [
          { required: true, message: '', trigger: 'blur' },
        ],
        invoiceType: [
          { required: true, message: '', trigger: 'blur' },
        ],
        invoiceHeader: [
          { required: true, message: '请输入发票抬头！', trigger: 'blur' },
          { max: 30, message: '超过最大长度！', trigger: 'blur' },
        ],
        taxpayerNum: [
          { required: true, message: '请输入纳税人识别号！', trigger: 'blur' },
          { max: 30, message: '超过最大长度！', trigger: 'blur' },
        ],
        inboxMail: [
          { type: 'email', message: '邮箱格式不正确！' },
          { required: true, message: '请输入收件邮箱！' },
        ],
        inboxPerson: [
          { required: true, message: '请输入收件人名称！' },
          { max: 30, message: '超过最大长度', trigger: 'blur' },
        ],
        inboxPhone: [
          { required: true, message: '请输入收件人手机号！', trigger: 'blur' },
          { validator: this.mobilephoneValidate },
        ],
        inboxAddress: [
          { required: true, message: '请输入收件地址！' },
          { max: 50, message: '超过最大长度', trigger: 'blur' },
        ],
        registerAddress: [
          { max: 50, message: '超过最大长度', trigger: 'blur' },
          { required: true, message: '请输入注册地址！' },
        ],
        telephoneNum: [
          { required: true, message: '请输入联系电话！' },
          { max: 30, message: '超过最大长度', trigger: 'blur' },
        ],
        openingBank: [
          { required: true, message: '请输入开户行！', trigger: 'blur' },
          { max: 30, message: '超过最大长度', trigger: 'blur' },
        ],
        bankAccount: [
          { required: true, message: '请输入银行账号！' },
          { max: 30, message: '超过最大长度', trigger: 'blur' },
        ],
      },
    };
  },
  watch: {
    'form.invoiceShape': {
      handler(val) {
        if (val === '1') {
          this.form.invoiceType = '1';
        }
      },
    },
    deep: true,
  },
  computed: {
    disabled() {
      if (this.form.invoiceShape === '1') {
        return true;
      }
      return false;
    },
  },
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          message.success('申请开票成功');
          this.$store.dispatch('setInvoiceInfo', this.form);
          this.$emit('confirm', this.form);
        } else {
          message.warning('请输入开票信息');
        }
      });
    },
    handleCancel() {
      this.$emit('cancel');
      this.$refs.ruleForm.resetFields();
    },
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
/deep/.ant-radio-group {
  display: flex;
}
/deep/ .ant-input {
  height: 40px;
}
/deep/ .ant-modal-footer {
  border-top:0
}
/deep/ .ant-modal-footer div {
  text-align: center;
  margin-bottom: 50px;
}
/deep/ .ant-modal-footer div button{
  width: 110px;
  height: 40px;
  font-size: 16px;
}
/deep/ .ant-modal-footer div button:first-child{
  transform: translateX(-10px);
}
/deep/ .firstRadioGroup label:nth-child(2) {
  margin-left: 16px;
}
/deep/ .firstRadioGroup,.ant-radio-group {
  margin-top: 6px;
}

</style>

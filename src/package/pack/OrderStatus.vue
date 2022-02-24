<template>
  <div class="orderStatus">
    <div class="main">
      <a-alert
        class="tips"
        v-if="!!tips"
        :message="tips"
        banner
      />
      <a-row class="info">
        <a-col span="7">
          <div class="title">
            订单状态
          </div>
          <div class="content">
            <strong :class="typeColor">{{ statusText }}</strong>
          </div>
        </a-col>
        <a-col span="11">
          <div class="title">
            业务流水号
          </div>
          <div class="content">
            {{ orderNo }}
            <span
              class="copy"
              ref="copyBtn"
              title="一键复制"
            />
          </div>
        </a-col>
        <a-col span="6">
          <div class="title">
            {{ timeTitle }}
          </div>
          <div class="content">
            {{ dateFormat(time) }}
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="footer">
      <div class="amount">
        {{ amountName }}<strong>¥&nbsp;&nbsp;{{ amountFormat(totalAmount) }}</strong>
        <span
          class="expiration"
          v-if="payExpireTime"
        >缴纳截止日期：{{ dateFormat(payExpireTime) }}</span>
      </div>
      <div class="operate">
        <slot name="operate" />
      </div>
    </div>
  </div>
</template>

<script>

import Clipboard from 'clipboard';
import { Alert, Row, Col } from 'ant-design-vue';
import dayjs from 'dayjs';

export default {
  name: 'OrderStatus',
  components: {
    aRow: Row,
    aCol: Col,
    aAlert: Alert,
  },
  data() {
    return {
    };
  },
  props: {
    amountName: {
      type: String,
      default: '金额总计',
    },
    statusText: {
      type: String,
      default: '',
    },
    typeColor: {
      type: String,
      default: 'blue',
      validator(value) {
        return [ 'blue', 'red' ].indexOf(value) !== -1;
      },
    },
    totalAmount: {
      type: Number,
      default: 0,
      validator(value) {
        return value > 0;
      },
    },
    orderNo: {
      type: String,
      default: '',
    },
    tips: {
      type: String,
      default: '',
    },
    time: {
      type: Number,
      default: 0,
    },
    payExpireTime: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: 'general',
      validator(value) {
        return [ 'general', 'refund' ].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    timeTitle() {
      switch (this.type) {
        case 'refund':
          return '申请时间';

        default:
          return '下单时间';
      }
    },
  },
  mounted() {
    let clipboard;

    if (this.$refs.copyBtn) {
      clipboard = new Clipboard(this.$refs.copyBtn, { text: () => '33' });

      clipboard.on('success', () => {
        this.$message.success('复制成功');
      });

      clipboard.on('error', () => {
        this.$message.error('复制失败');
      });
    } else {
      clipboard && clipboard.destroy();// 释放内存
    }
  },
  methods: {
    dateFormat(value) {
      return dayjs(value).format('YYYY-MM-DD HH:mm-ss');
    },
    amountFormat(value) {
      return value.toLocaleString('en-US');
    },
  },
};
</script>

<style lang="less" scoped>
.orderStatus{
  background-color: #fff;
}
.main{
  padding:35px 50px;
  .tips+.info{
    margin-top: 40px;
  }
  .info{
    line-height: 1;
    .title{
      font-size: 16px;
      color: #666;
    }
    .content{
      margin-top: 20px;
      font-size: 16px;
      color: #333;
      strong{
        font-size: 18px;
        font-weight: 400;
        &.blue{
          color:#007CE2;
        }
      }
      .copy{
        display: inline-block;
        background:url('../../assets/image/icon-copy.png') no-repeat center center;
        background-size: 100% 100%;
        margin-left: 5px;
        cursor: pointer;
        width: 16px;
        height: 16px;
      }
    }
  }
}
.footer{
  padding:50px;
  background: #f8fbff;
  overflow: hidden;
  .amount{
    float: left;
    color:#666;
    font-size: 16px;
    strong{
      display: inline-block;
      margin-left: 20px;
      font-size: 26px;
      color:#E12D2D;
      font-weight: 500;
    }
    .expiration{
      display: inline-block;
      margin-left: 30px;
      line-height: 1;
      padding: 5px 15px;
      background: #EAF5FE;
      border-radius: 5px;
      font-size: 14px;
      color:#999
    }
  }
  .operate{
    float: right;
    .btn{
      width: 200px;
      height: 48px;
      background: #007CE2;
      border-radius: 4px;
      font-size: 16px;
    }
  }
}
/deep/ .ant-alert{
  padding-left:40px;
  background-color: #fef8eb;
  border-radius: 4px;
  .ant-alert-message{
    font-size: 16px;
    font-weight: 400;
    color:#BDA266
  }
}
</style>

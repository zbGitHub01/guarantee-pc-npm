# @guarantee/ui

电子保函PC工程ui组件，包括二次封装ant-design-vue组件库。

## 安装方式：

### 执行 `npm i @guarantee/ui` 

## 使用方式

在main.js文件下写入

```json
import GuaranteeUI from '@guarantee/ui';
import '@guarantee/ui/styles/ui.css';
Vue.use(GuaranteeUI);
```

在需要的地方直接使用

```json
<OrderStatus>
	xxxxxxxxx
</OrderStatus>
```

## 组件介绍

### 发票组件	ApplyInvoice

接收两个props参数：

1. `isShow`
   - type：boolean
   - 作用：控制发票组件的显示和隐藏

2. `defaultValueForm`
   - type：object
   - 作用：发票字段的默认值显示

```json
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
```

### 描述组件	Description

接收六个props参数：

1. `title`
   - type：string
   - 作用：描述信息的标题 

2. `subtitle`
   - type：string
   - 作用：信息块小标题 
3.  `dataSource`
   - type：object
   - 作用：描述信息的字段值
4.  `fieldNameMap`
   - type：object
   - 作用：用来翻译显示字段key的映射对象
5.  `timeFieldList`
   - type：Array
   - 作用：控制需要转换成时间格式的字段 
6. `amountFieldList`
   - type：Array
   - 作用：控制需要转换成金额格式的字段

```json
props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    dataSource: {
      type: Object,
      default() {
        return {};
      },
    },
    fieldNameMap: {
      type: Object,
      default() {
        return {};
      },
    },
    timeFieldList: {
      type: Array,
      default() {
        return [];
      },
    },
    amountFieldList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
```

该组件中包含一个插槽，`slot='extra'`时，会在标题行右侧显示；

### 文档阅读窗	DocumentDialog

接收七个props参数：

1. `title`
   - type：string
   - 作用：标题 

2. `content`
   - type：string
   - 作用：文档内容
3.  `okText`
   - type：string
   - 作用：阅读窗modal的确认按钮文本
4.  `cancelText`
   - type：string
   - 作用：阅读窗modal的取消按钮文本
5.  `isShowKnowTips`
   - type：boolean
   - 作用：控制是否显示或隐藏“阅读窗modal的确认按钮文本”选框
6. `visible`
   - type：Array
   - 作用：控制阅读窗显示或隐藏

7. `loading`
   - type：boolean
   - 作用：阅读点击交互的加载动画

```json
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
```

方法：包含两个触发父组件的方法

```json
handleOk() {
  this.$emit('ok', {
    isKnow: this.isKnow, // 代表是否已阅读，默认false
  });
},
handleCancel() {
  this.$emit('cancel');
},
```

### 订单状态栏	OrderStatus

接收九个props参数：

1. `amountName`
   - type：string
   - 作用：金额文本，默认“金额总计”

2. `statusText`
   - type：string
   - 作用：订单状态
3.  `typeColor`
   - type：string
   - 作用：订单状态的颜色，默认蓝色，限制红色和蓝色
4.  `totalAmount`
   - type：number
   - 作用：支付的金额
5.  `orderNo`
   - type：string
   - 作用：订单号
6. `tips`
   - type：string
   - 作用：提示与

7. `time`
   - type：number
   - 作用：订单时间

8. `payExpireTime`
   - type：number
   - 作用：截至日期

9. `type`
   - type：string
   - 作用：控制显示文本申请时间或下单时间，默认下单时间

```json
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
```

该组件中包含一个插槽，即`slot='operate'`.

### 进度条组件	Progress

接收两个props参数：

1. `activeIndex`
   - type：number
   - 作用：活跃的即当前的进度条步骤

2. - type：array
   - 作用：进度条步骤列表

```json
 props: {
    activeIndex: {
      type: Number,
      default: 0,
    },
    stepList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
```

### modal表单组件	Formily

接收五个props参数：

1. `title`
   - type：string
   - 作用：modal表单的标题

2. `confirmText`

   - type：string
   - 作用：确认按钮文本

3.  `cancelText`

   - type：string
   - 作用：取消按钮文本

4.  `formFields`

   - type：array

   - 作用：配置表单item的json对象

   - example：

     ```json
     // type：item的类型，目前支持三种类型：input、textarea、phoneCode、imgCode
     // label：item的label
     // property：item的key
     
     export default [
       {
         type: 'input',
         label: '银行账号',
         property: 'bankNo',
       },
       {
         type: 'input',
         label: '账户名称',
         property: 'bankName',
       },
       {
         type: 'input',
         label: '开户行名称',
         property: 'bankAccountName',
       },
       {
         type: 'textarea',
         label: '退保理由',
         property: 'returnReason',
       },
       {
         type: 'imgCode',
         label: '验证码',
         property: 'captchaId',
       },
       {
         type: 'phoneCode',
         label: '手机验证码',
         property: 'checkCode',
       },
     ];
     ```

5.  `isShow`

   - type：boolean
   - 作用：控制modalForm的显示隐藏


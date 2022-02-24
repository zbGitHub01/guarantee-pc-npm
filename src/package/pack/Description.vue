<template>
  <div class="descriptions">
    <PlateTitle
      :title="title"
      :subtitle="subtitle"
    >
      <template slot="extra">
        <slot name="extra" />
      </template>
    </PlateTitle>
    <a-descriptions
      class="main"
      :column="1"
    >
      <a-descriptions-item
        :label="getFieldName(key)"
        v-for="(value, key) in dataSource"
        :key="key"
      >
        {{ getFieldValue(key) }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import { Descriptions } from 'ant-design-vue';
import PlateTitle from './PlateTitle';
import dayjs from 'dayjs';

export default {
  name: 'Description',
  components: {
    PlateTitle,
    aDescriptions: Descriptions,
    aDescriptionsItem: Descriptions.Item,
  },
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
  data() {
    return {};
  },
  methods: {
    getFieldName(key) {

      return this.fieldNameMap[key] || key;
    },
    getFieldValue(key) {
      const value = this.dataSource[key];

      if (this.timeFieldList.includes(key)) {
        return this.dateFormat(value);
      }

      if (this.amountFieldList.includes(key)) {
        return this.amountFormat(value);
      }

      return value;
    },
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
.main{
  margin-top: 30px;
}
/deep/ .ant-descriptions-item-label{
  width: 200px;
  color: #666;
  font-size: 16px;
  &::after{
    display: none;
  }
}
/deep/ .ant-descriptions-item-content{
  font-size: 16px;
  color: #333;
}
/deep/ .ant-descriptions-item{
    padding-bottom: 20px;
}
</style>

<template>
  <div :class="['title']">
    <h3>{{ title }}</h3>
    <slot name="subtitle">
      <span class="subtitle">{{ subtitle }}</span>
    </slot>
    <div class="extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'PlateTitle',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="less" scoped>
.title{
  box-sizing: border-box;
  overflow: hidden;
  &::after{
    content:' ';
    display: block;
    margin-top: 20px;
    height: 1px;
    width: 100%;
    background-color: #EBEBEB;
  }
  h3{
    position: relative;
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    padding-left:20px;
    margin-bottom: 0;
    &::before{
      content: ' ';
      display: block;
      position: absolute;
      left:0;
      top:50%;
      margin-top: -8px;
      width: 4px;
      height: 16px;
      background: #007CE2;
      border-radius: 2px;
    }
  }
}
.subtitle{
  margin-left: 10px;
  font-size: 16px;
  color: #949AA7;
}
.extra{
  float:right;
  text-align: right;
}
</style>

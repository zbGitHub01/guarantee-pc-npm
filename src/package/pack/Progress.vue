<template>
  <div>
    <ol class="progress">
      <li
        :class="['step',activeIndex===index?'active':'']"
        v-for="(item, index) in stepList"
        :key="getName(item) "
      >
        <i>{{ activeIndex>index?'&#10003;':index+1 }}</i>
        <div class="main">
          <div class="name">
            {{ getName(item) }}
          </div>
          <div
            class="time"
            v-if="item.time"
          >
            {{ item.time }}
          </div>
        </div>
        <div class="arrow" />
      </li>
    </ol>
  </div>
</template>

<script>

export default {
  name: 'Progress',
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
  methods: {
    getName(item) {
      return typeof (item) === 'object' ? item.name : item;
    },
  },
};
</script>

<style lang="less" scope>
  .progress{
    overflow: hidden;
    border-bottom: 1px solid #F0F0F0;
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    background-color: #fff;
    .step{
      flex: 1;
      padding:17px 0;
      position: relative;
      text-align: center;
      box-sizing: border-box;
      i{
        display: inline-block;
        width: 36px;
        background: #FFFFFF;
        border: 2px solid #007CE2;
        border-radius: 50%;
        font-style:normal;
        font-size: 24px;
        color: #007CE2;
        line-height: 36px;
        box-sizing:content-box;
        vertical-align: middle;
      }
      .main{
        margin-left:25px;
        display: inline-block;
        vertical-align: middle;
        text-align: left;
        .name{
          font-size: 16px;
          color:#333;
        }
        .time{
          margin-top:3px;
          font-size: 12px;
          color:#999
        }
      }
      .arrow,.arrow::after{
        width: 0;
        height: 0;
        border-top: 42px solid transparent;
        border-left: 15px solid #EAEAEA;
        border-bottom: 42px solid transparent;
      }
      .arrow{
        position: absolute;
        left:0;
        top:-5px;
        &::after{
          position:absolute;
          left:-17px;
          top:-42px;
          content:' ';
          border-left-color:  #fff;
        }
      }
      &:first-child .arrow{
        display: none;
      }
    }
    .step.active{
      background: linear-gradient(to right, rgba(0, 124, 226, 0.1) 50%, #fff 70%);
      &:first-child{
        border-left:2px solid #007CE2;
      }
      i{
        position: relative;
        background-color: #007CE2;
        color:#fff;
        &::after{
          position:absolute;
          right:-7px;
          top:12px;
          content:' ';
          border-top: 7px solid transparent;
          border-left: 7px solid #007CE2;
          border-bottom: 7px solid transparent;
        }
      }
      .arrow{
        border-left: 15px solid #007CE2;
      }
      // & + .step{
      //   .arrow{
      //     border-left: 15px solid #007CE2;
      //   }
      // }
    }
  }
</style>

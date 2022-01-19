<template>
  <div class="burger-wrapper">
    <div class="burger" :class="classes" @click="emitClick">
      <div class="burger-line-1"></div>
      <div class="burger-line-2"></div>
      <div class="burger-line-3"></div>
      <div class="mini-nav">
        <div class="mini-nav-container">
          <div class="nav-link" v-for="item in navLink" :key="item.index">
            <router-link :to="item.link"> {{item.title}} </router-link>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    isFold: {
      type: Boolean,
      default: false,
    },
    disable: Boolean,
    navLink: Object
  },
  emits: ['click'],
  setup(props, { emit }) {
    const emitClick = (e: Event) => {
      emit('click', e)
    }

    return {
      emitClick,
      classes: computed(() => ({
        [`${props.isFold ? 'opened' : 'closed'}`]: true,
        disable: props.disable,
      })),
    }
  },
})
</script>

<style lang="less" scoped>
/* 折叠导航burger */

.burger-wrapper {
  display: none;
  padding: 10px;

  @media (max-width: 968px) {
    display: block;
    position: relative;
    margin-right: 20px;
  }

  .burger {
    display: none;
    width: 20px;
    height: 6px;
    position: relative;
    cursor: pointer;

    display: grid;
    grid-template-rows: repeat(3, 1fr);

    .burger-line-1,
    .burger-line-2,
    .burger-line-3 {
      width: 20px;
      height: 2px;
      background-color: black;
    }

    .burger-line-1 {
      position: absolute;
      top: -5px;
    }

    .burger-line-3 {
      position: absolute;
      top: 5px;
    }

    .mini-nav {
      display: none;
      z-index: 999;
    }

    /* 折叠按钮的三条线 */
    &.opened {
      .burger-line-1,
      .burger-line-2,
      .burger-line-3 {
        background-color: #2e2e2e;
        /* 折叠动画 */
        transition: 0.4s ease;
      }
      .burger-line-1 {
        /* 转动45度，正数是一个从左到右旋转 */
        transform: rotate(45deg) translate(2px, 5px);
      }
      .burger-line-2 {
        transform: translateX(5px);
        opacity: 0;
      }
      .burger-line-3 {
        transform: rotate(-45deg) translate(2px, -5px);
      }

      @media (max-width: 968px) {

        // menu
        .mini-nav {
          display: block;
          position: absolute;
          right: 30px;
          top: 5px;
          opacity: 0;
          width: 100px;
          border-radius: 10px;
          background-color: white;
          box-shadow: 0 0 30px #eaeaea;
          animation: slideDown 0.5s ease-out forwards;

          .mini-nav-container {
            
            display: grid;
            grid-template-rows: repeat(3, 1fr);
            row-gap: 10px;
            text-align: center;

            .nav-link {
              transition: border 0.3s ease 0s, color 0.3s ease 0s;
              border-radius: 10px;
              padding: 10px;
              border: 1px solid white;
              &:hover {
                border-color: #999;
              }
            }
          }
          & > * {
            opacity: 0;
            font-size: 18px;
            animation: showMenu 0.4s linear forwards 0.4s;
          }
        }
      }
    }

    /* 从开启(x)状态 -> 关闭(三条线状态) */
    /* 折叠按钮的三条线 */
    &.closed {
      .burger-line-1,
      .burger-line-2,
      .burger-line-3 {
        background-color: #2e2e2e;
        /* 折叠动画 */
        transition: 0.4s ease;
      }
    }
    &.disable {
      display: none;
    }
  }
}

@keyframes slideDown {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: 150px;
    opacity: 1;
  }
}

@keyframes showMenu {
  from {
    opacity: 0;
    transform: translateY(-1vh);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

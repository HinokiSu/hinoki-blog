<template>
  <div class="cus-ind-info ind-wrapper">
    <div class="ind-container">
      <div class="avatar">
        <img src="@web/assets/avatar/github_hinokisu.jpg" />
      </div>
      <div class="name-container">
        <p>Hinoki</p>
        <p>Hinoki_Su</p>
      </div>
      <div class="sns-container">
        <div class="sns-info">
          <div class="github-icon">
            <a href="https://github.com/HinokiSu">
              <span class="iconfont sns-GitHub"></span>
            </a>
          </div>
          <div class="bilibili-icon">
            <a href="https://space.bilibili.com/8556974">
              <span class="iconfont sns-bilibili"></span>
            </a>
          </div>
        </div>
      </div>
      <div class="intro">
        <p>
          <span class="iconfont sns-location"></span>
          E 120.64, N 31.31
        </p>
        <p>
          <span class="iconfont sns-email"></span>
          yukihinoki@qq.com
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeIndividual',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.ind-wrapper {
  position: relative;

  .ind-container {
    height: 100%;
    display: grid;
    grid-template-rows: 3fr 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;

    @media (max-width: 968px) {
      height: 80%;
      margin-top: 50px;
      grid-template-rows: 1fr 0.5fr;
      grid-template-columns: 2fr 1.5fr;
      grid-template-areas:
        'avatar sns'
        'name intro';

      .avatar {
        grid-area: avatar;
      }

      .name-container {
        grid-area: name;
      }

      .sns-container {
        grid-area: sns;
      }

      .intro {
        grid-area: intro;
      }
    }

    .avatar {
      overflow: hidden;
    }

    .avatar {
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;

        @media (max-width: 1200px) {
          width: 180px;
          height: 180px;
        }
        @media (max-width: 968px) {
          width: 200px;
          height: 200px;
        }
      }
    }
    .name-container {
      width: 100%;
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      font-weight: normal;
      justify-items: center;
      align-items: center;

      p:first-child {
        font-size: 30px;
      }
      p:nth-child(2) {
        font-size: 14px;
      }

      @media (max-width: 1200px) {
        p:first-child {
          font-size: 28px;
        }
        p:nth-child(2) {
          font-size: 12px;
        }
      }

      @media (max-width: 968px) {
        p:first-child {
          font-size: 30px;
        }
        p:nth-child(2) {
          font-size: 14px;
        }
      }
    }

    .sns-container {
      .sns-info {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 20px;
      }
      span {
        font-size: 30px;
      }
    }
    .intro {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      row-gap: 6px;

      p {
        font-size: 16px;
        span {
          align-self: end;
          font-size: 20px;
          padding-right: 4px;
          font-weight: 600;
          vertical-align: middle;
        }
        @media (max-width: 968px) {
          font-size: 16px;
          padding-right: 0px;
          span {
            font-size: 22px;
          }
        }
      }
    }
  }
}
</style>

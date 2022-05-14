<template>
  <div class="home-introduction">
    <!-- 轮播图，占据整个页面 -->
    <div class="introduction__wrapper">
      <a-carousel class="carousel-main" autoplay>
        <div>
          <h3>记录&发现</h3>
          <img src="https://www.hinoki.ink/io/images/bridge_sunset.jpg" alt="轮播图_1" />
        </div>
        <div>
          <h3>HINOKI BLOG</h3>
          <img src="https://www.hinoki.ink/io/images/tokyo_city.jpg" alt="轮播图_2" />
        </div>
      </a-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeIntroduction',
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.home-introduction {
  margin-bottom: 40px;
  .carousel-main {
    overflow: hidden;
    border-radius: 30px;
  }
}
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: calc(72vw / 2);
  line-height: 160px;
  overflow: hidden;

  position: relative;
  h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 4px;
    letter-spacing: 0.1rem;
    @media screen and (max-width: 500px) {
      letter-spacing: normal;
    }
  }
  img {
    object-fit: cover;
    object-position: 50% bottom;
  }
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}

@media screen and (max-width: 500px) {
  .ant-carousel :deep(.slick-dots-bottom) {
    bottom: 0;
  }
}
</style>

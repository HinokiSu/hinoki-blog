<template>
  <div class="home-introduction">
    <!-- 轮播图，占据整个页面 -->
    <div class="introduction__wrapper">
      <a-carousel class="carousel-main" autoplay>
        <div>
          <h3>记录 & 开发 & 日常</h3>
          <img
            src="https://minio.hinoki.ink/blog/FH7ePleaUAMaN61.jpg?Content-Disposition=attachment%3B%20filename%3D%22FH7ePleaUAMaN61.jpg%22&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20220418%2F%2Fs3%2Faws4_request&X-Amz-Date=20220418T143544Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=40b1820c6d4c790b480c5a318c920363f747c1350c8fd8555d9a8e0deb6f375d"
            alt=""
          />
        </div>
        <div>
          <h3>HINOKI BLOG</h3>
          <img
            src="https://minio.hinoki.ink/blog/FH7ePleacAAbSdV.jpg?Content-Disposition=attachment%3B%20filename%3D%22FH7ePleacAAbSdV.jpg%22&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20220418%2F%2Fs3%2Faws4_request&X-Amz-Date=20220418T144418Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=809a6a3c221c11664085eb0864511130f513d4ee3e7bcd85d1454b5ed0c96ffa"
            alt=""
          />
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

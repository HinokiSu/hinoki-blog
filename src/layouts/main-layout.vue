<template>
  <div class="main-layout">
    <div class="main-layout-container">
      <header>
        <navigation-bar></navigation-bar>
      </header>
      <main>
        <div class="main-wrapper">
          <router-view></router-view>
        </div>
      </main>
      <footer>
        <footer-bar></footer-bar>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from '@web/components/nav-bar/index.vue'
import FooterBar from '@web/components/footer-bar/index.vue'
export default defineComponent({
  name: 'MainLayout',
  components: { NavigationBar, FooterBar },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.main-layout {
  width: 100vw;
  min-height: 100vh;
  display: flex;

  .main-layout-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;

    header {
      width: 100%;
      position: fixed;
      z-index: 100;
    }

    main {
      margin-top: 72px;
      width: 100%;

      padding: 24px 64px;
    }

    footer {
      position: relative;
      margin-top: auto;
      bottom: 0;
      width: 100%;
      z-index: 1;
      padding: 8px;
    }
  }
}
</style>

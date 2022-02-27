<template>
  <div class="main-layout">
    <header>
      <header-bar></header-bar>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FooterBar from '@web/components/footer-bar/index.vue'
import HeaderBar from '@web/components/headr-bar/header-bar.vue'
export default defineComponent({
  name: 'MainLayout',
  components: { FooterBar, HeaderBar },
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
  flex-direction: column;
  align-items: center;

  header {
    width: 100%;
    position: fixed;
    z-index: 100;
  }

  main {
    max-width: 900px;
    width: 100%;
    margin-top: 72px;
    .main-wrapper {
      margin: 0 24px;
      padding-top: 24px;
    }
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
</style>

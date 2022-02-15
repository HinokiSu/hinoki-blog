<template>
  <div class="main-layout">
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
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;

  header {
    width: 100%;
    position: fixed;
  }

  main {
    width: 100%;
    top: 80px;
    position: absolute;
    padding: 48px 120px;
  }

  footer {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0px;
  }
}
</style>

<template>
  <div class="main-layout">
    <header>
      <header-bar></header-bar>
    </header>
    <main>
      <div class="main-wrapper">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in" :duration="{ enter: 250, leave: 150 }">
            <component :is="Component" />
          </transition>
        </router-view>
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
    width: 100%;
    margin-top: 72px;
    margin-bottom: 32px;

    .main-wrapper {
      margin: 0 64px;
      padding-top: 24px;
    }

    @media screen and (max-width: 965px) {
      & {
        & .main-wrapper {
          margin: 0 24px;
        }
      }
    }
  }

  footer {
    width: 100%;
    position: relative;
    margin-top: auto;
    bottom: 0;
    z-index: 1;
    padding: 8px;
  }
}
</style>

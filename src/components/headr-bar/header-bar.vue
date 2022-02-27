<template>
  <div class="nav-wrapper">
    <div class="logo">
      <router-link :to="{ name: 'home' }">
        <img src="@web/assets/logo.png" alt="" />
      </router-link>
    </div>
    <navigation-bar class="nav-bar_main"></navigation-bar>

    <div class="nav_features">
      <!--  <div class="change-theme">
        <p>Dark</p>
      </div> -->
      <fold-nav class="fold-navigation"></fold-nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavigationBar from '../nav-bar/navigation-bar.vue'
import foldNav from '../nav-bar/fold-nav.vue'
export default defineComponent({
  name: 'HeaderBar',
  components: { foldNav, NavigationBar },
  setup() {
    const foldState = ref<boolean>(false)

    const changeState = () => {
      foldState.value = !foldState.value
    }
    return {
      changeState,
      foldState,
    }
  },
})
</script>

<style lang="less" scoped>
.nav-wrapper {
  height: 72px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 9fr 0.5fr;
  align-items: center;
  background-color: var(--primary-background);
  box-shadow: 0 0 36px var(--accents-2);

  .logo {
    padding-left: 30px;
    cursor: pointer;
    img {
      width: 70px;
      object-fit: cover;
    }
  }

  .nav-bar_main {
    justify-self: flex-end;
  }

  /*  .change-theme {
    margin-right: 20px;
    cursor: pointer;
    p {
      font-size: 20px;
    }
  } */
  .nav_features {
    display: none;
    & .fold-navigation {
      display: none;
    }
  }

  @media (max-width: 968px) {
    & {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .nav-bar_main {
        display: none;
      }

      .nav_features {
        display: flex;
        align-items: center;
        .fold-navigation {
          display: flex;
          margin-right: 24px;
        }
      }
    }
  }
}
</style>

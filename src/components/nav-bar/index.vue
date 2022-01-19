<template>
  <div class="nav-wrapper">
    <div class="logo">
      <img src="@web/assets/logo.png" alt="" />
    </div>
    <div class="nav-container">
      <div class="nav-link">
        <router-link :to="navLink.home.link"> {{navLink.home.title}} </router-link>
      </div>
      <div class="delimiter"></div>
      <div class="nav-link">
        <router-link :to="navLink.article.link"> {{navLink.article.title}} </router-link>
      </div>

      <div class="delimiter"></div>
      <div class="nav-link">
        <router-link :to="navLink.about.link"> {{navLink.about.title}} </router-link>
      </div>
    </div>
    <div class="language">
      <p>EN&searhk;</p>
    </div>
    <fold-nav :nav-link="navLink" @click="changeState" :isFold="foldState"></fold-nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import FoldNav from '@web/components/nav-bar/foldNav.vue'
export default defineComponent({
  components: {
    FoldNav,
  },
  setup() {
    const foldState = ref<boolean>(false)

    const navLink = reactive({
      home: {
        title: 'Home',
        link: {
          name: 'home'
        }
      },
      article: {
        title: 'Article',
        link: {
          name: 'article'
        }
      },
      about: {
        title: 'About',
        link: {
          name: 'about'
        }
      }
    })

    const changeState = () => {
      foldState.value = !foldState.value
    }
    return {
      changeState,
      foldState,
      navLink
    }
  },
})
</script>

<style lang="less" scoped>
.nav-wrapper {
  height: 80px;
  display: grid;
  grid-template-columns: 1fr 9fr 0.5fr;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 30px #e7e6e6;

  @media (max-width: 968px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    padding-left: 30px;
    cursor: pointer;
    img {
      width: 70px;
      object-fit: cover;
    }
  }

  .nav-container {
    margin-right: 40px;
    justify-self: end;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 10px;
    align-items: center;
    justify-items: center;

    .nav-link {
      display: flex;
    }

    .nav-link a {
      padding: 10px;
      color: #222;
      font-size: 24px;
      font-weight: normal;
    }

    .delimiter {
      height: 40px;
      width: 2px;
      background-color: #333;
    }

    @media (max-width: 968px) {
      display: none;
    }
  }

  .language {
    margin-right: 20px;
    cursor: pointer;
    p {
      font-size: 20px;
    }
    @media (max-width: 968px) {
      display: none;
    }
  }
}
</style>

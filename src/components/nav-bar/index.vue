<template>
  <div class="nav-wrapper">
    <div class="logo">
      <img src="@web/assets/logo.png" alt="" />
    </div>
    <div class="nav-container">
      <div class="nav-link">
        <router-link :to="{ name: 'home' }">Home</router-link>
      </div>
      <div class="delimiter"></div>
      <div class="nav-link">
        <router-link :to="{ name: '' }">Article</router-link>
      </div>

      <div class="delimiter"></div>
      <div class="nav-link">
        <router-link :to="{ name: '' }">About</router-link>
      </div>
    </div>
    <div class="change-theme">
      <p>Dark</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: 'NavgationBar',
  components: {},
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
      color: var(--accents-8);
      font-size: 1.3rem;
      font-weight: 400;
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

  .change-theme {
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

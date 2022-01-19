<template>
  <div class="home-page">
    <header>
      <!-- nav -->
      <nav-bar></nav-bar>
    </header>
    <main>
      <!-- content -->
      <home-individual></home-individual>
      <home-content></home-content>
    </main>
    <footer>
      <footer-bar></footer-bar>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@web/components/nav-bar/index.vue'
import HomeContent from '@web/components/home/content.vue'
import HomeIndividual from '@web/components/home/individual.vue'
import FooterBar from '@web/components/footer-bar/index.vue'
export default defineComponent({
  components: {
    NavBar,
    HomeContent,
    HomeIndividual,
    FooterBar,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.home-page {
  position: relative;
  width: 100vw;
  height: 100%;

  background-color: #fff;

  display: grid;
  grid-template-rows: 80px 14fr 1fr;

  

  main {
    margin: 50px 100px;
    box-shadow: 0 0 30px #eaeaea;

    display: grid;
    grid-template-columns: 1fr 3.5fr;

    @media (max-width: 968px) {
      display: grid;
      margin: 30px 20px;
      grid-template-columns: unset;
      grid-template-rows: 1fr 1fr;
    }
  }

  footer {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>

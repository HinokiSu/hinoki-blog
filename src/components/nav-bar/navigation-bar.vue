<template>
  <div class="navigation-bar" :class="classes">
    <div class="nav-link">
      <router-link :to="{ name: 'home' }">Home</router-link>
    </div>
    <div class="delimiter"></div>
    <div class="nav-link">
      <router-link :to="{ name: 'articles' }">Article</router-link>
    </div>

    <div class="delimiter"></div>
    <div class="nav-link">
      <router-link :to="{ name: 'about' }">About</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'NavigationBar',
  props: {
    direction: {
      type: String,
      default: 'column',
    },
  },
  setup(props) {
    const classes = computed(() => {
      if (props.direction === 'row') {
        return '__row'
      } else {
        return '__column'
      }
    })
    return {
      classes,
    }
  },
})
</script>

<style lang="less" scoped>
.navigation-bar {
  display: grid;
  justify-items: center;
  align-items: center;
  &.__column {
    grid-template-columns: repeat(5, 1fr);
    column-gap: 12px;
  }

  &.__row {
    grid-template-rows: repeat(3, 1fr);
    row-gap: 32px;

    & .delimiter {
      display: none;
    }

    & .nav-link {
      transition: all 0.5s ease;
      padding: 12pt 16pt;
      &:hover {
        border-radius: 16px;
        background-color: var(--accents-2);
      }
    }
  }

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
}
</style>

<template>
    <Posts />
</template>


<script lang="ts">
import Posts from '@/components/Posts.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
    components: {
        Posts,
    },
});
</script>


<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

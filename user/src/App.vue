<script setup>
import Sidebar from './components/Sidebar.vue';
import { teamColor } from './module/team.js';
const team = teamColor();
</script>

<template>
  <div class="container"
    :style="`--bgColor:${team.bgColor};--textColor:${team.textColor};--menuColor:${team.menuColor};--menuShadowColor:${team.menuShadowColor};--menuSelectedColor:${team.menuSelectedColor};`">
    <aside class="navContainer">
      <Sidebar />
    </aside>
    <div class="page">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: block;
}
.navContainer{
  width: 100%;
  height: fit-content;
}
.page{
  width: 100%;
}

@media screen and (min-width:826px ) {
  .container {
    display: flex;
  }
  .navContainer{
    width: 20vw;
    height: 100%;
  }
  .page{
    width: 80vw;
    padding: 1rem;
  }
}

</style>

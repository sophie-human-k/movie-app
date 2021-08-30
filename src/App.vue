<template>
  <div id="app">
    <!-- <header style="height:50vh;"></header> -->
    <router-view/>
    <!-- <router-view/> -->
  </div>
</template>

<style>
html, body {
   margin: 0; 
   padding: 0; 
   box-sizing: border-box;
   font-family: 'Courier New', Courier, monospace;
} 
#app { 
  background: #333; 
  min-height: 100vh;
  padding: 1rem; 
}
</style>

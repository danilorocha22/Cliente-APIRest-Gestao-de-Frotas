<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/condutores">Condutores</router-link> |
      <router-link to="/veiculos">Veículos</router-link> |
      <router-link to="/ordenstrafego">Ordens de Tráfego</router-link> |
      <router-link to="/sobre">Sobre</router-link>
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #435466;
}

#nav {
  padding: 5px 30px 15px 30px;
  font-size: 1.2rem;
}

#nav a {
  font-weight: bold;
  color: #4e9aeb;
  text-decoration: none;
  padding: 0 30px;
}

#nav a.router-link-exact-active {
  color: #05a85f;
}
</style>

<template>
  <div id="app">


    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <a class="navbar-brand" href="/">Home</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">List</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/add" class="nav-link">Add </router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/getByPaging" class="nav-link">Pageable </router-link>
          </li>


        </ul>
<!--        <form class="form-inline my-2 my-lg-0">-->
<!--          <input class="form-control mr-sm-2" type="search" placeholder="Search">-->
<!--          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>-->
<!--        </form>-->
      </div>
    </nav>

    <div class="container mt-3">
      <router-view></router-view>

    </div>

  </div>
</template>

<script>

export default {
  name: 'app',

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

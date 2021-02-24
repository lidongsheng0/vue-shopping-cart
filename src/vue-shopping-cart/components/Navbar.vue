<template>
  <div class="navbar">
      <el-menu mode="horizontal"  background-color="#545c64" text-color='#fff' active-text-color="#ffd04b" router>
              <el-menu-item index='home'>Home</el-menu-item>
              <el-menu-item index='signup'>Sign Up</el-menu-item>
              <el-menu-item index='account'>Account</el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>

</style>
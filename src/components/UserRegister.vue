<template>
  <div id="register">
    <div><i class="el-icon-picture"></i></div>
    <div>
      <div>
        <i class="el-icon-picture"></i>
        <el-input v-model="account" placeholder="帐号"></el-input>
      </div>
      <div>
        <i class="el-icon-picture"></i>
        <el-input v-model="account" placeholder="密码" type="password"></el-input>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'UserRegister',
    data() {
      return {
        account: ''
      }
    }
  }
</script>

<style scoped lang="scss">

</style>

<template>
  <div class="server-config row">
    <div class="col-12">
      <div class="form-group">
        <label for="server-url">Server URL</label>
        <input id="server-url" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" class="form-control">
      </div>
      <button class="btn btn-success btn-sm">Connect</button>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.server-config {
  border: 1px solid #eee;
}
</style>

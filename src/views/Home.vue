<template>
  <div class="home row h-100">
    <div class="widgets-panel col-2 h-100" style="border: 1px solid black;">
      <widgets-panel></widgets-panel>
    </div>
    <div class="composer-panel col-7 h-100" style="border: 1px solid black;">
      <composer></composer>
    </div>
    <div class="tools-panel col-3 h-100" style="border: 1px solid black;">
      tools
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Composer from '@/components/Composer';
import WidgetsPanel from '@/components/WidgetsBar';

export default {
  name: 'home',
  components: {
    Composer,
    WidgetsPanel
  }
}
</script>
<style lang="less" scoped>
</style>


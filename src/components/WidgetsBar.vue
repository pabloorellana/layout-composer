<template>
  <div class="widgets-panel">
    <div id="source" class="container">
      <room></room>
    </div>
  </div>
</template>
<script>
import * as dragula from 'dragula';
import Room from '@/components/widgets/Room';

export default {
  components: {
    Room
  },
  mounted () {
    const [source] = $('#source');
    const targets = $('.copy-target');

    dragula([source, ...targets], {
      copy(el, source) {
        return $(source).is('#source')
      }
    });
  }
}
</script>
<style lang="less" scoped>
.widgets-panel {
}
</style>


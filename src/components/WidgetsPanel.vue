<template>
  <div class="widgets-panel">
    <div id="source" class="container">
      <room></room>
      <room-manager-server></room-manager-server>
    </div>
  </div>
</template>
<script>
import * as dragula from 'dragula';
import Room from '@/components/widgets/Room';
import RoomManagerServer from '@/components/widgets/RoomManagerServer';
import WidgetsMap from '@/services/WidgetsMap.js'
import ComponentFactoryMap from '@/components/widgets/WidgetFactoryMap';

export default {
  components: {
    Room,
    RoomManagerServer
  },
  computed: {
    grid() {
      return this.$store.getters.layout
    }
  },
  mounted () {
    const [source] = $('#source');
    const targets = $('.copy-target');

    dragula([source, ...targets], {
      copy(el, source) {
        return $(source).is('#source')
      }
    }).on('drop', (el, target, source) => {
      const targetId = target.id;
      const cameFromBar = $(source).is('#source');

      if (!cameFromBar) {
        return this.updateWidgetLocation(source.id, targetId);
      }

      this.addNewWidGet(el, targetId);
    });
  },
  methods: {
    addNewWidGet(element, targetId) {
      // TODO config dragula to actually not to copy anything
      const tdContainer = $(`#${targetId}`)
      tdContainer.empty();


      // TODO: in order to recognize the element that was dropped into
      // the table, the element has to be wraped in a "div" containing
      // a class with a name mapped in WidgetsMap in order to
      // get the data that this component should bind in the store
      const [elementType] = ($(element)[0]).className.split(' ');
      const content = WidgetsMap[elementType]();

      this.$store.commit('setContent', {
        targetId,
        content
      });

      this.$store.commit('setSelectedWidget', content);

      const { content: widgetProps } = this.$store.getters.contentByCellId(targetId)
      const componentInstance = ComponentFactoryMap[elementType](widgetProps);
      tdContainer[0].appendChild(componentInstance.$el);
    },
    updateWidgetLocation(sourceId, targetId) {
      this.$store.commit('moveContentFromTo', {
        from: sourceId,
        to: targetId
      });

      const {content} = this.$store.getters.contentByCellId(targetId);
      this.$store.commit('setSelectedWidget', content);
    }
  }
}
</script>
<style lang="less" scoped>
.widgets-panel {
}
</style>


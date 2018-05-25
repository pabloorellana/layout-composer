<template>
  <div class="widgets-panel">
    <div id="source" class="container">
      <room></room>
      <rm-server></rm-server>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import * as dragula from 'dragula';
import Room from '@/plugins/room-manager/room/widget/Room';
import RmServer from '@/plugins/room-manager/server/widget/Server';
import WidgetsMap from '@/plugins/room-manager/WidgetsMap';
import WidgetFactoryMap from '@/plugins/room-manager/WidgetFactoryMap';

const drake = dragula({
  copy(el, source) {
    return $(source).is('#source')
  }
});

export default {
  components: {
    Room,
    RmServer
  },
  computed: {
    ...mapGetters(['rows', 'columns', 'contentByCellId'])
  },
  mounted () {
    drake.containers.push(...this.getDrakeContainers());
    drake.on('drop', (el, target, source) => {
      const targetId = target.id;
      const cameFromBar = $(source).is('#source');

      if (!cameFromBar) {
        return this.updateWidgetLocation(source.id, targetId);
      }

      this.addNewWidGet(el, targetId);
    });
  },
  methods: {
    ...mapMutations(['setContent', 'setSelectedWidget', 'moveContentFromTo', 'setSelectedWidget']),
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

      this.setContent({
        targetId,
        content
      });

      this.setSelectedWidget(content);

      const { content: widgetProps } = this.contentByCellId(targetId)
      const componentInstance = WidgetFactoryMap.widget[elementType](widgetProps);
      tdContainer[0].appendChild(componentInstance.$el);
    },
    updateWidgetLocation(sourceId, targetId) {
      this.moveContentFromTo({
        from: sourceId,
        to: targetId
      });

      const {content} = this.contentByCellId(targetId);
      this.setSelectedWidget(content);
    },
    getDrakeContainers() {
      const [source] = $('#source');
      const targets = $('.copy-target');
      return [source, ...targets];
    },
    updateDrakeContainers() {
      drake.containers = [];
      drake.containers.push(...this.getDrakeContainers());
    }
  },
  watch: {
    rows() {
      setTimeout(this.updateDrakeContainers.bind(this));
    },
    columns() {
      setTimeout(this.updateDrakeContainers.bind(this));
    }
  }
}
</script>
<style lang="less" scoped>
.widgets-panel {
}
</style>


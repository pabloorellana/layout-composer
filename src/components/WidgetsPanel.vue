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

      // If widget is dragged to the delete area, remove it
      if (targetId === 'delete-area') {
        return this.deleteWidget(el, source);
      }

      // If widget was not dragged from the widget bar, then update its position
      if (!cameFromBar) {
        return this.updateWidgetLocation(source.id, targetId);
      }

      // If no prior condition is met, then it should be a new widget

      // Cancelling drop event so we can instantiate the vue component
      // instead of relaying in dragula's DOM copy
      drake.cancel(true);

      //TODO, "service" type widgets should have the "no-layout" class in their
      //main container in order to be recognized
      const isInvisibleWidget = $(el).hasClass("no-layout");
      if (isInvisibleWidget) {
        return this.addServiceWidget(el);
      }

      this.addNewWidGet(el, targetId);
    });
  },
  methods: {
    ...mapMutations([
      'setContent',
      'setSelectedWidget',
      'moveContentFromTo',
      'setSelectedWidget',
      'deleteContent'
    ]),
    addServiceWidget(element) {
      // TODO: in order to recognize the element that was dropped into
      // the table, the element has to be wraped in a "div" containing
      // a class with a name mapped in WidgetsMap in order to
      // get the data that this component should bind in the store
      const elementType = this.getElementType(element);
      const widgetModel = WidgetsMap[elementType]();

      this.setSelectedWidget(widgetModel);

      //const { content: widgetProps } = this.contentByCellId(targetId)
      this.renderWidget($(`#services-container`)[0], { type: elementType, props: widgetModel })
    },
    addNewWidGet(element, targetId) {
      const elementType = this.getElementType(element);
      const widgetModel = WidgetsMap[elementType]();

      this.setContent({ targetId, content: widgetModel });
      this.setSelectedWidget(widgetModel);

      const { content: widgetProps } = this.contentByCellId(targetId);
      this.renderWidget($(`#${targetId}`)[0], { type: elementType, props: widgetProps })
    },
    updateWidgetLocation(sourceId, targetId) {
      this.moveContentFromTo({
        from: sourceId,
        to: targetId
      });

      const {content} = this.contentByCellId(targetId);
      this.setSelectedWidget(content);
    },
    deleteWidget(element, source) {
      this.deleteContent(source.id);
      $(element).remove();
    },
    getDrakeContainers() {
      const [source] = $('#source');
      const targets = $('.copy-target');
      return [source, ...targets];
    },
    updateDrakeContainers() {
      drake.containers = [];
      drake.containers.push(...this.getDrakeContainers());
    },
    getElementType(element) {
      const [elementType] = ($(element)[0]).className.split(' ');
      return elementType;
    },
    renderWidget(target, { type, props = {} } = {}) {
      const componentInstance = WidgetFactoryMap.widget[type](props);
      target.appendChild(componentInstance.$el);
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


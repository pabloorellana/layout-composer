<template>
  <div class="widgets-panel">
    <div id="widget-source" class="container">
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
import RmStore from '@/plugins/room-manager/store';
import WidgetsMap from '@/plugins/room-manager/WidgetsMap';
import WidgetFactoryMap from '@/plugins/room-manager/WidgetFactoryMap';

const drake = dragula({
  revertOnSpill: true,
  copy(el, {id: sourceId}) {
    return sourceId === 'widget-source';
  },
  accepts(el, {id: targetId}, {id: sourceId}) {
    const isServiceWidget = $(el).hasClass("no-layout");
    return !(
      (sourceId === 'services-container' && targetId !== 'delete-area') ||
      (sourceId !== 'widget-source' && targetId === 'services-container') ||
      (!isServiceWidget && targetId === 'services-container') ||
      targetId === 'widget-source'
    );
  }
});

export default {
  components: {
    Room,
    RmServer
  },
  computed: {
    ...mapGetters(['rows', 'columns', 'contentByCellId', 'appByNamespace'])
  },
  mounted () {
    drake.containers.push(...this.getDrakeContainers());
    drake.on('drop', (el, {id: targetId}, {id: sourceId}) => {
      // TODO: in order to recognize the element that was dropped into
      // the table, the element has to be wraped in a "div" containing
      // a class with a name mapped in WidgetsMap in order to
      // get the data that this component should bind in the store
      const elementType = this.getElementType(el);

      // If widget is dragged to the delete area, remove it
      if (targetId === 'delete-area') {
        return this.deleteWidget(el, sourceId);
      }

      // If widget was not dragged from the widget bar, then update its position
      if (sourceId !== 'widget-source') {
        return this.updateWidgetLocation(sourceId, targetId);
      }

      // If no prior condition is met, then it should be a new widget

      // Cancelling drop event so we can instantiate the vue component
      // instead of relaying in dragula's DOM copy
      drake.cancel(true);

      //TODO, "service" type widgets should have the "no-layout" class in their
      //main container in order to be recognized
      const isServiceWidget = $(el).hasClass("no-layout");
      if (isServiceWidget) {
        return this.addServiceWidget(elementType);
      }

      this.addNewWidGet(elementType, targetId);
    });
  },
  methods: {
    ...mapMutations([
      'setContent',
      'setSelectedWidget',
      'moveContentFromTo',
      'setSelectedWidget',
      'deleteContent',
      'addApp'
    ]),
    addServiceWidget(elementType) {
      // TODO, namespace should come from every app plugin config
      const namespace = 'room-manager';
      const widgetModel = {namespace, ...WidgetsMap[elementType]()};

      this.addApp(widgetModel);
      this.setSelectedWidget(widgetModel);

      const { content: widgetProps } = this.appByNamespace(namespace)

      // registering newly created module
      this.$store.registerModule(namespace, RmStore);

      this.renderWidget($(`#services-container`)[0], { type: elementType, props: widgetProps })
    },
    addNewWidGet(elementType, targetId) {
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
    deleteWidget(element, sourceId) {
      this.deleteContent(sourceId);
      $(element).remove();
    },
    getDrakeContainers() {
      const [source] = $('#widget-source');
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
      const componentInstance = WidgetFactoryMap.widget[type](props, this.$store);
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


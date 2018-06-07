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
    const isAppWidget = $(el).attr('lc-type') === 'app';

    return !(
      (sourceId === 'apps-container' && targetId !== 'delete-area') ||
      (sourceId !== 'widget-source' && targetId === 'apps-container') ||
      (!isAppWidget && targetId === 'apps-container') ||
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
      const widgetName = this.getWidgetName(el);

      // If widget is dragged to the delete area, remove it
      if (targetId === 'delete-area') {
        const widgetType = this.getWidgetType(el);

        if (widgetType === 'app') {
          // TODO remove widgets bound to this app?
          this.setSelectedWidget(null);
          const namespace = this.getWidgetNamespace(el);
          return this.deleteRegisteredApp(el, namespace);
        }

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

      const isAppWidget = this.getWidgetType(el) === 'app';
      if (isAppWidget) {
        return this.addAppWidget(widgetName);
      }

      this.addNewWidGet(widgetName, targetId);
    });
  },
  methods: {
    ...mapMutations([
      'setContent',
      'setSelectedWidget',
      'moveContentFromTo',
      'setSelectedWidget',
      'deleteContent',
      'addApp',
      'deleteApp'
    ]),
    addAppWidget(widgetName) {
      const widgetModel = WidgetsMap[widgetName]();

      this.addApp(widgetModel);
      this.setSelectedWidget(widgetModel);

      const { content: widgetProps } = this.appByNamespace(widgetModel.namespace)

      // registering newly created module
      this.$store.registerModule(widgetModel.namespace, RmStore);

      this.renderWidget($(`#apps-container`)[0], { type: widgetName, props: widgetProps })
    },
    addNewWidGet(widgetName, targetId) {
      const widgetModel = WidgetsMap[widgetName]();

      this.setContent({ targetId, content: widgetModel });
      this.setSelectedWidget(widgetModel);

      const { content: widgetProps } = this.contentByCellId(targetId);
      this.renderWidget($(`#${targetId}`)[0], { type: widgetName, props: widgetProps })
    },
    updateWidgetLocation(sourceId, targetId) {
      this.moveContentFromTo({
        from: sourceId,
        to: targetId
      });

      const {content} = this.contentByCellId(targetId);
      this.setSelectedWidget(content);
    },
    deleteRegisteredApp(element, namespace) {
      this.deleteApp(namespace);
      $(element).remove();
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
    getWidgetName(element) {
      // In order to identify a widget, it must contain the attribute
      // "lc-widget" with its name
      return $(element).attr('lc-widget');
    },
    getWidgetType(element) {
      // In order to identify the type of a widget, it must contain the attribute
      // "lc-type" with its name
      return $(element).attr('lc-type');
    },
    getWidgetNamespace(element) {
      // In order to identify the namespace of a widget, it must contain the attribute
      // "lc-namespace" with its name
      return $(element).attr('lc-namespace');
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


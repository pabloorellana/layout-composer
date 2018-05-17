import RoomConfigFactory from './room/config/RoomFactory';
import ServerConfigFactory from './server/config/ServerFactory';

import RoomWidgetFactory from './room/widget/RoomFactory';
import ServerWidgetFactory from './server/widget/ServerFactory';

export default {
  config: {
    'room': RoomConfigFactory,
    'room-manager-server': ServerConfigFactory
  },
  widget: {
    'room': RoomWidgetFactory,
    'room-manager-server': ServerWidgetFactory
  }
}

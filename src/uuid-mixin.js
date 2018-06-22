/**
 * Adds an incremental "uuid" property to a component so we don't access
 * to the "_uid" reserved property
 */

let uuid = 0;

export default {
  beforeCreate() {
    this.uuid = uuid;
    uuid += 1;
  }
};

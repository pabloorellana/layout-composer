/**
 * This object stores all the live vue component instances of the created widgets.
 *
 * The key should be a unique uuid that identifies that instance (this is done
 * through the uuid-mixin), and the value should be the component instance itself,
 * this exists in order to have a registry of all the widgets of the application
 * so it is easier to destroy them (using .$destroy) when they are removed from the UI
 * (because removing an element from the DOM does not trigger the hooks of the components)
 * by doing this we prevent tons of memory leaks.
 *
 * These live components cannot and should not be stored in a vuex store.
 */
export default {

}
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
Vue.use(Vuex);
const moudlesStore = require.context("./modules", false, /\.js$/);
const modules = moudlesStore.keys().reduce((mods, modpath) => {
    const name = modpath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = moudlesStore(modpath);
    mods[name] = value.default;
    return mods;
}, {});
const store = new Vuex.Store({
    modules,
    getters
});

export default store;

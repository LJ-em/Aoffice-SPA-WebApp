import mutations from './mutations'
import actions from './actions'
import getters from "./getters";

const state = {
    // 搜索结果
    searchResult: [],
};

export default {
    state,
    getters,
    mutations,
    actions
};

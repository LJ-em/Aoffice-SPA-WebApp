import axios from 'axios';
const qs = require('qs');
// 设置ContentType
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
// 搜索
    search: ({commit}, Obj) => {
        axios.post('http://app.aplusoffice.cn/api/building/houses', qs.stringify({
            'cityCode': Obj.cityCode,
            'page': Obj.page,
            'bName': Obj.bName,
        }))
            .then(response => {
                let search_result = response.data.resultData;
                commit('search', search_result)
            })
            .catch(error => {
                console.log(error)
            });
    },
}

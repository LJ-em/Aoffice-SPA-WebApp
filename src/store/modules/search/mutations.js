export default {
// 搜索
    search (state, res) {
        console.log('搜索');
        state.searchResult = [];       //设空
        // 拼接顶部轮播图 图片地址
        for (let i = 0; i < res.building.length; i++) {
            function BuildingImg(imgUrl) {
                this.imgUrl = "http://images.aplusoffice.cn/" + imgUrl
            }

            // 将构造函数的对象推入 store的数组中
            res.building[i].appListUrl = new BuildingImg(res.building[i].appListUrl)
        }
        state.searchResult = res.building;
        console.log(state.searchResult);
        // 判断楼盘类型
        // for (let i = 0; i < res.building.length; i++) {
        //     if (res.building[i].type == 'A') {
        //         state.hotBuildingArr[i]['badge'] = '写字楼'
        //         state.hotBuildingArr[i]['judgeShow'] = true
        //     } else {
        //         state.hotBuildingArr[i]['badge'] = '联合办公'
        //         state.hotBuildingArr[i]['judgeShow'] = false
        //     }
        // }
    },
}

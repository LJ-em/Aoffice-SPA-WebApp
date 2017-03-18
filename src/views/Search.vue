<!-- 搜索页面 -->
<template>
    <div>
        <!-- 搜索AppBar -->
        <div id="search__appBar">
            <mu-text-field icon="search" class="appbar-search-field" slot="right" hintText="直接输入大厦名称搜索"/>
            <mu-flat-button color="white" label="取消" slot="right" @click="goBack"/>
        </div>
        <!-- 搜索热门搜索 -->
        <div class="search__hotSearch">
            <mu-table>
                <mu-tr v-for="subArray in this.chunkArray(this.search_hot_keyword, 3)">
                    <mu-td v-for="value in subArray"
                           @click="clickHotKeyword(value.code)">{{value.name}}
                    </mu-td>
                </mu-tr>
            </mu-table>
        </div>
    </div>
</template>

<script>
    import VueRouter from 'vue-router'
    import axios from 'axios'
    const qs = require('qs');
    // 设置ContentType
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    export default {
        data(){
            return {
                search_hot_keyword: [],
            }
        },
        mounted(){
            this.getSearchHotKeyword();
        },
        methods: {
            // 目的: 返回上一页( 通过历史记录返回 )
            goBack () {
                const router = new VueRouter()
                router.go(-1)
            },
            getSearchHotKeyword(){
                axios.post('http://app.aplusoffice.cn/api/building/getHotList', qs.stringify({'number': 0}))
                    .then((response) => {
                        let result_data = response.data.resultData;
                        this.search_hot_keyword = result_data.buildingHotList;
                        console.log('搜索热词');
                        console.log(this.search_hot_keyword)
                    })
                    .catch(error => console.log(error))
            },
            chunkArray(array, chunk){
                let i, j, temp_array = [];
                for (i = 0, j = array.length; i < j; i += chunk) {
                    temp_array.push(array.slice(i, i + chunk));
                }
                return temp_array;
            },
            clickHotKeyword(code){
                console.log(code)
            }
        },
    }
</script>

<style lang="sass" scoped>
    @import '../sass/main.sass'

    #search__appBar
        +bC($F)
        // 输入框背景色
        .mu-text-field
            +REM(margin, $autoMargin/2)
            margin:
                left: 2%
                right: 2%
            width: 76% !important
            +bC($base-color)
        // 按钮背景色修改
        .mu-flat-button
            width: 19%
            +bC($F)
            color: $btnTitle-color !important
            // "取消"按钮两侧的padding设为空
            span.mu-flat-button-label
                padding: 0 !important
</style>

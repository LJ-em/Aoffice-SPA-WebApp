<!-- 搜索页面 -->
<template xmlns:>
    <div>
        <!-- 搜索AppBar -->
        <div id="search__appBar">
            <input class="input_search" @keyup.enter="search"
                   v-model="keyword"
                   placeholder="直接输入大厦名称搜索"/>
            <button class="clear_keyword"
                    @click="clearKeyword"
                    v-if="showClearButton">X

            </button>
            <!--<mu-text-field icon="search" class="appbar-search-field" slot="right" hintText="直接输入大厦名称搜索"/>-->
            <mu-flat-button color="white" label="取消" slot="right" @click="goBack"/>
        </div>
        <!-- 搜索热门搜索 -->
        <div class="search__hotSearch" v-if="!confirmSearch">
            <mu-table>
                <mu-tr v-for="subArray in this.chunkArray(this.search_hot_keyword, 3)">
                    <mu-td v-for="value in subArray">
                        <mu-flat-button class="hot_keyword" @click="clickHotKeyword(value.code)">
                            {{value.name}}
                        </mu-flat-button>
                    </mu-td>
                </mu-tr>
            </mu-table>
        </div>
        <div class="buildingList" v-else="">
            <!--<div class="building&#45;&#45;box" v-for="item in this.$store.state.searchResult">-->
            <div class="building--box" v-for="item in getSearchResult">
                <!-- 建筑 - 简介 -->
                <div class="building--intro"
                     v-bind:style="{ backgroundImage: 'url(' + item.appListUrl.imgUrl + ')' }"
                     @click='toBuildingDetails( item.code, item.type )'>
                    <div class="badge"> {{ item.badge }} </div>
                    <h2> {{ item.name }} </h2>
                    <p> {{ item.subTitle }} </p>
                </div>
                <!-- 建筑 - 细节 ( 组件引入 ) -->
                <BuildingList_details :building_details=item></BuildingList_details>
            </div>
        </div>
    </div>
</template>

<script>
    import VueRouter from 'vue-router'
    import axios from 'axios'
    import BuildingList_details from '../components/Auto/BuildingList_details.vue'
    const qs = require('qs');
    // 设置ContentType
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    const components = {BuildingList_details}

    export default {
        components: components,
        data(){
            return {
                search_hot_keyword: [],
                keyword: '',
                confirmSearch: false,
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
            },
            search(){
                console.log(this.keyword);
                this.confirmSearch = true;
                this.$store.dispatch({
                    type: 'search',
                    cityCode: '3702',
                    page: '1',
                    bName: this.keyword
                });
            },
            clearKeyword(){
                this.keyword = '';
                this.confirmSearch = false;
            }
        },
        computed: {
            getSearchResult () {
                return this.$store.getters.getSearchResultArr;
            },
            showClearButton(){
                return this.keyword.length > 0;
            }
        },
    }
</script>

<style lang="sass" scoped>
    @import '../sass/main.sass'

    #search__appBar
        //+bC($F)
        background-color: white
        padding-top: 12px
        padding-bottom: 12px
        position: relative
        // 输入框背景色
        .mu-text-field
            +REM(margin, $autoMargin/2)
            margin:
                left: 2%
                right: 2%
            width: 76% !important
            min-height: 36px !important
            +bC($base-color)
            font-size: 14px !important
        // 清空关键词输入框
        .clear_keyword
            border-width: 0
            padding: 4px 8px
            position: absolute
            top: 50%
            transform: translateY(-50%)
            right: 23%
        // 按钮背景色修改
        .mu-flat-button
            width: 19%
            +bC($F)
            color: $btnTitle-color !important
            // "取消"按钮两侧的padding设为空
            span.mu-flat-button-label
                padding: 0 !important
                margin-top: 12px !important
        .input_search
            height: 36px
            width: 76%
            margin-left: 2%
            padding-left: 56px
            border-width: 0
            font-size: 14px
            background-color: #f6f6f6

    =introMixin($bottom,$fontSize,$color,$weight)
        @extend %ABS
        +REM(left, 16px)
        bottom: $bottom
        +REM(font-size, $fontSize)
        color: $color
        font-weight: $weight

    .buildingList
        .building--box
            +REM(margin-top, $autoMargin)
            +REM(margin-bottom, $autoMargin)
            +bC($F)
            border-bottom: 1px solid rgba($badgeFont-color, .4)
            .building--intro
                @extend %REL
                width: 100%
                +REM(height, 200px)
                background:
                    repeat: no-repeat
                    position: center
                    size: cover
                .badge
                    @extend %flexCenter
                    @extend %ABS
                    right: 0
                    +REM(padding, 4px)
                    +REM(padding-left, 10px)
                    +REM(padding-right, 10px)
                    +REM(width, 75px)
                    +REM(font-size, $badge-size)
                    color: $F
                    +bC($badge-bgColor)
                > h2
                    +introMixin(17%, $title-size, $F, bold)
                    +REM(line-height, 23px)
                > p
                    +introMixin(5%, $text-size, rgba($F, .77), normal)
</style>

<!-- 房源详情 AppBar ( 联合办公 / 办公楼 - 通用组件 ) -->
<template>
    <div class="buildingDetails--AppBar">
        <mu-appbar >
            <mu-icon-button icon='arrow_back' slot="left" @click="returnIndex()"/>
            <h2> {{ AppBar_title }} </h2>
            <mu-icon-button icon='sms' slot="right"/>
        </mu-appbar>
    </div>
</template>
<script>
    import VueRouter from 'vue-router'
    export default {
    props: ['AppBar_title']
    ,methods: {
        // 目的: 执行跳转
        returnIndex: () => {
            const router = new VueRouter();
            router.go(-1);
        }
    }
}
</script>

<style lang="sass">
@import '../../sass/main'

.buildingDetails--AppBar
    /* 设置MuseUI - App Bar样式 */
    +auto--AppBar
</style>

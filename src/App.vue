<template>
    <div id="app">
        <!-- <keep-alive>
            <router-view v-if="isRouterAlive"></router-view>
        </keep-alive> -->
        <router-view></router-view>
    </div>
</template>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
</style>
// <script>
//     export default{
//         name:'app',
//         provide(){
//             return{
//                 reload:this.reload
//             }
//         },
//         data(){
//             return{
//                 isRouterAlive:true
//             }
//         },
//         methods:{
//             reload(){
//                 this.isRouterAlive = false
//                 this.$nextTick(function(){
//                     this.isRouterAlive = true
//                 })
//             }
//         } 
//     }
// </script>
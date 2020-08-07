/*
 * @Descripttion: 
 * @Version: 
 * @Date: 2019-05-22 17:25:20
 */
import Vue from 'vue'
import Router from 'vue-router'
import custom from '@/components/custom'

 /*引入公共样式*/
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'custom',
      component: custom
    }
  ]
})

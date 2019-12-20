import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	// {
	// 	path: '/',
	// 	// name: 'home',

	// 	component: Home
	// },
	// {
	// 	path: '/about',
	// 	name: 'about',
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// },
	{
		path: '/home/list',
		name: 'list',
		component: () => import('@/views/home/list.vue'),
		meta:{
			title:'精品宝贝'
		}
	},
	{
		path: '/home/join',
		name: 'join',
		component: () => import('@/views/home/join.vue'),
		meta:{
			title:'申请展位入驻'
		}
	},
	{
		path:'*',
		redirect:'/home/list'
	}
]

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router

import index from '@/views/Home.vue'
let routes = [{
  path: '/',
  name: 'index',
  component: index,
  meta: {
    auth: false
  }
},
{
  path: '/about',
  name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
}
]
const gwdRoutes = [
  `demo1`
]
gwdRoutes.map(item => {
  routes.push({
    path: `/gwd/${item}`,
    name: `${item}`,
    component: () =>
            import(`@/views/gwd/${item}`),
    meta: {
      auth: false
    }
  })
})
export default routes

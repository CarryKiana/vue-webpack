const pageIndex = () =>
    import ('../views/layout/index.vue');
let routes = [{
    path: '/',
    name: 'index',
    component: pageIndex,
    children: [{
        path: '/one',
        name: 'one',
        component: () =>
            import ('../views/demo/one.vue')
    }, {
        path: '/two',
        name: 'two',
        component: () =>
            import ('../views/demo/two.vue')
    }]
}]
export default routes
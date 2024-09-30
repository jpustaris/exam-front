const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') },
      { path: '/settings/user-management', component: () => import('pages/settings/UserManagement.vue') },
      { path: '/settings/role-management', component: () => import('pages/settings/RoleManagement.vue') },
    ],
    beforeEnter(to, from, next) {
      if (localStorage.getItem('access_token')) {
        next();
      }
      else {
        next('/login');
      }
    }
  },

  // {
  //   path: '/admin',
  //   component: () => import('layouts/AdminLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Dashboard.vue') },
  //     { path: 'search', component: () => import('pages/SearchPage.vue') },
  //   ],
  //   beforeEnter(to, from, next) {
  //     if (localStorage.getItem('access_token')) {
  //       next();
  //     }
  //     else {
  //       next('/login');
  //     }
  //   }
  // },

  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue'),
    beforeEnter(to, from, next) {
      if (localStorage.getItem('access_token')) {
        next('/');
      }
      else {
        next();
      }
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

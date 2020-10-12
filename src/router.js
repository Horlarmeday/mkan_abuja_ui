/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
==========================================================================================*/

import Vue from 'vue'
import Router from 'vue-router'
import store from './store/auth/moduleAuth'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [
      {
        path: '/',
        redirect: '/auth/login'
      },

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/app/dashboard',
                name: 'dashboard',
                component: () => import('./views/pages/app/home/Dashboard.vue'),
                meta: {
                  requiresAuth: true
                }
              },
              {
                path: '/app/member/:userId',
                name: 'member',
                component: () => import('./views/pages/app/members/ViewMember.vue'),
                meta: {
                  requiresAuth: true
                }
              },
              {
                path: '/app/members',
                name: 'members',
                component: () => import('./views/pages/app/members/MembersList.vue'),
                meta: {
                  requiresAuth: true,
                  pageTitle: 'Members',
                },
              },
              {
                path: '/app/files',
                name: 'files',
                component: () => import('./views/pages/app/files/FilesList.vue'),
                meta: {
                  requiresAuth: true,
                  pageTitle: 'Uploaded Files',
                },
              },
              {
                path: '/app/settings',
                name: 'settings',
                component: () => import('./views/pages/app/settings/UserSettings.vue'),
                meta: {
                  requiresAuth: true,
                  pageTitle: 'Personal Settings',
                },
              },
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/auth/login',
                name: 'page-login',
                component: () => import('@/views/pages/auth/Login.vue')
              },
              {
                path: '/auth/register',
                name: 'page-register',
                component: () => import('@/views/pages/auth/Register.vue')
              },
              {
                path: '/auth/verify-account',
                name: 'page-verify',
                component: () => import('@/views/pages/auth/Verify.vue')
              },
              {
                path: '/pages/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.token) {
      next()
      return
    }
    next('/auth/login')
  } else {
    next()
  }
})

export default router

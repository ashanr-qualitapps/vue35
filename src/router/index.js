import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  // New navigation routes
  {
    path: '/find-match',
    name: 'FindMatch',
    component: () => import('@/views/FindMatch.vue')
  },
  {
    path: '/scicomm-toolbox',
    name: 'ScicommToolbox',
    component: () => import('@/views/ScicommToolbox.vue')
  },
  {
    path: '/academy',
    name: 'Academy',
    component: () => import('@/views/Academy.vue')
  },
  {
    path: '/policy-impact',
    name: 'PolicyImpact',
    component: () => import('@/views/PolicyImpact.vue')
  },
  // Authenticated routes using AuthenticatedLayout
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('@/views/Analytics.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/Users.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/Projects.vue')
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/views/Reports.vue')
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('@/views/Messages.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
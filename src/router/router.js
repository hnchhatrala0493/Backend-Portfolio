import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/authentication/LoginPage.vue'
import Experience from '@/views/Experience.vue'
import Skills from '@/views/Skills.vue'
import Projects from '@/views/Projects.vue'
import Education from '@/views/Education.vue'
import Dashboard from '@/components/Dashboard.vue'
import Profile from '@/views/Profile.vue'
import ForgotPassword from '@/components/authentication/ForgotPassword.vue'
import { useAuthStore } from '@/stores/auth'
import ContactDetails from '@/views/ContactDetails.vue'

const routes = [
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: false, layout: 'Main' } },
  { path: '/login', component: LoginPage },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/experience', component: Experience, meta: { requiresAuth: false, layout: 'Main' } },
  { path: '/skill', component: Skills, meta: { requiresAuth: false, layout: 'Main' } },
  { path: '/projects', component: Projects, meta: { requiresAuth: false, layout: 'Main' } },
  { path: '/education', component: Education, meta: { requiresAuth: false, layout: 'Main' } },
  { path: '/profile', component: Profile, meta: { requiresAuth: false, layout: 'Main' } },
  {
    path: '/contacts',
    component: ContactDetails,
    meta: { requiresAuth: false, layout: 'ContactDetails' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
export default router

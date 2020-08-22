import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Teacher from '../components/Teacher.vue'
import Student from '../components/Student.vue'
import Admin from '../components/Admin.vue'
import TeacherInfo from '../components/TeacherInfo.vue'
import Welcome from '../components/Welcome.vue'
import StudentInfo from '../components/StudentInfo.vue'
import TestInfo from '../components/TestInfo.vue'

Vue.use(VueRouter)

  const routes = [
    { path: '/',redirect: '/login' },
    { path: '/login', component: Login},
    { 
      path: '/teacher',
      redirect: '/teacher/welcome',
      component: Teacher,
      children: [
        {path: 'testInfo', component: TestInfo},
        {path: 'studentInfo', component: StudentInfo},
        {path: 'welcome', component: Welcome}
      ] 
    },
    { path: '/admin',
      component: Admin, 
      redirect: '/admin/welcome',
      children: [
      {path: 'teacherInfo', component: TeacherInfo},
      {path: 'welcome', component: Welcome}
      ] 
    },
    { path: '/student', component: Student}
  ]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  if(to.path==='/login') return next();
  const tokenStr=localStorage.getItem('token');
  if(!tokenStr) return next('/login')
  next();
})

export default router

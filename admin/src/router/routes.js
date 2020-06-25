import Home from '../views/Home'
import Login from '../views/Login'
import TeachersManagement from '../views/Home/TeachersManagement'
import ActivityManagement from '../views/Home/ActivityManagement'
import SchoolOrganizationManagement from '../views/Home/SchoolOrganizationManagement'
import UserAccountManagement from '../views/Home/UserAccountManagement'
import ExaminationApproval from '../views/Home/ExaminationApproval'
import StudentCadreManagement from '../views/Home/StudentCadreManagement'
import CategoriesManagement from '../views/Home/CategoriesManagement'
import MyError from '../views/errorPage/404'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: {
      name: 'teachers-management'
    },
    children: [
      {
        path: 'teachers-management',
        name: 'teachers-management',
        component: TeachersManagement
      },
      {
        path: 'activity-management',
        name: 'activity-management',
        component: ActivityManagement
      },
      {
        path: 'categories-management',
        name: 'categories-management',
        component: CategoriesManagement
      },
      {
        path: 'schoolOrganization-management',
        name: 'schoolOrganization-management',
        component: SchoolOrganizationManagement
      },
      {
        path: 'userAccount-management',
        name: 'userAccount-management',
        component: UserAccountManagement
      },
      {
        path: 'examination-management',
        name: 'examination-management',
        component: ExaminationApproval

      },
      {
        path: 'studentCadre-management',
        name: 'studentCadre-management',
        component: StudentCadreManagement
      },
      {
        path: 'error',
        name: 'error',
        component: MyError
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]
export default routes

import { 
  DashboardOutlined,HomeOutlined ,LaptopOutlined,BankFilled,UsergroupAddOutlined,IdcardOutlined   
} from '@ant-design/icons';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'

/* const extraNavTree = [
  {
    key: 'extra',
    path: `${APP_PREFIX_PATH}/pages`,
    title: 'sidenav.pages',
    icon: PlusCircleOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: 'extra-pages',
        path: `${APP_PREFIX_PATH}/pages`,
        title: 'sidenav.pages',
        icon: FileTextOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: 'extra-pages-profile',
            path: `${APP_PREFIX_PATH}/pages/profile`,
            title: 'sidenav.pages.profile',
            icon: '',
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'extra-pages-list',
            path: `${APP_PREFIX_PATH}/pages/user-list`,
            title: 'sidenav.pages.userlist',
            icon: '',
            breadcrumb: true,
            submenu: []
          },
          {
            key: 'extra-pages-invoice',
            path: `${APP_PREFIX_PATH}/pages/invoice`,
            title: 'sidenav.pages.invoice',
            icon: '',
            breadcrumb: true,
            submenu: []
          },
          {
            key: 'extra-pages-pricing',
            path: `${APP_PREFIX_PATH}/pages/pricing`,
            title: 'sidenav.pages.pricing',
            icon: '',
            breadcrumb: true,
            submenu: []
          },
          {
            key: 'extra-pages-faq',
            path: `${APP_PREFIX_PATH}/pages/faq`,
            title: 'sidenav.pages.faq',
            icon: '',
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'extra-pages-setting',
            path: `${APP_PREFIX_PATH}/pages/setting`,
            title: 'sidenav.pages.setting',
            icon: '',
            breadcrumb: true,
            submenu: []
          }
        ]
      },
      {
        key: 'extra-auth',
        path: `${AUTH_PREFIX_PATH}`,
        title: 'sidenav.authentication',
        icon: SafetyOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: 'extra-auth-login-1',
            path: `${AUTH_PREFIX_PATH}/login-1`,
            title: 'sidenav.authentication.login.1',
            icon: '',
            breadcrumb: true,
            submenu: []
          },
          {
            key: 'extra-auth-login-2',
            path: `${AUTH_PREFIX_PATH}/login-2`,
            title: 'sidenav.authentication.login.2',
            icon: '',
            breadcrumb: true,
            submenu: []
          },
          {
            key: 'extra-auth-register-1',
            path: `${AUTH_PREFIX_PATH}/register-1`,
            title: 'sidenav.authentication.register.1',
            icon: '',
            breadcrumb: true,
            submenu: []
          },
          {
            key: 'extra-auth-register-2',
            path: `${AUTH_PREFIX_PATH}/register-2`,
            title: 'sidenav.authentication.register.2',
            icon: '',
            breadcrumb: true,
            submenu: []
          },
          {
            key: 'extra-auth-forgot-password',
            path: `${AUTH_PREFIX_PATH}/forgot-password`,
            title: 'sidenav.authentication.forgetPassword',
            icon: '',
            breadcrumb: true,
            submenu: []
          }
        ]
      },
      {
        key: 'extra-errors',
        path: `${AUTH_PREFIX_PATH}/error-1`,
        title: 'sidenav.errors',
        icon: StopOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: 'extra-errors-error-1',
            path: `${AUTH_PREFIX_PATH}/error-1`,
            title: 'sidenav.errors.error.1',
            icon: '',
            breadcrumb: true,
            submenu: []
          },
          {
            key: 'extra-errors-error-2',
            path: `${AUTH_PREFIX_PATH}/error-2`,
            title: 'sidenav.errors.error.2',
            icon: '',
            breadcrumb: true,
            submenu: []
          }
        ]
      }
    ]
  }
]
 */
// DashBoard
const dashBoardNavTree = [{
  key: 'dashboards',
  path: `${APP_PREFIX_PATH}/dashboards`,
  title: 'sidenav.dashboard',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
    // Accueil
    {
      key: 'dashboards-home',
      path: `${APP_PREFIX_PATH}/dashboards/sales`,
      title: 'home',
      icon: HomeOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

// Gestion de Matériel
const appsNavTree = [{
  key: 'manage-site',
  path: `${APP_PREFIX_PATH}/apps`,
  title: 'sidenav.manage-site',
  icon: LaptopOutlined,
  breadcrumb: false,
  submenu: [
  // Sites 
    {
      key: 'site',
      path: `${APP_PREFIX_PATH}/apps/ecommerce`,
      title: 'sidenav.manage-site.site',
      icon: BankFilled,
      breadcrumb: true,
     // <HomeOutlined />
      submenu: [
        {
          key: 'liste_site',
          path: `${APP_PREFIX_PATH}/apps/ecommerce/product-list`,
          title: 'sidenav.manage-site.site.liste-site',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'add_site',
          path: `${APP_PREFIX_PATH}/apps/ecommerce/add-product`,
          title: 'sidenav.manage-site.site.add-site',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        
       
      ]
    },
   // Materiels
    {
      key: 'materiel',
      path: `${APP_PREFIX_PATH}/apps/ecommerce`,
      title: 'sidenav.manage-site.materiel',
      icon: LaptopOutlined ,
      breadcrumb: true,
     // <HomeOutlined />
      submenu: [
        {
          key: 'liste_materiels',
          path: `${APP_PREFIX_PATH}/apps/ecommerce/orders`,
          title: 'sidenav.manage-site.materiel.liste-materiels',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'add_materiel',
          path: `${APP_PREFIX_PATH}/apps/ecommerce/add-product`,
          title: 'sidenav.manage-site.materiel.add-materiel',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'materiel_reformer',
          path: `${APP_PREFIX_PATH}/apps/project/list`,
          title: 'sidenav.manage-site.materiel.materiel-reformer',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        
       
      ]
    },
   // Users
    {
      key: 'users',
      path: `${APP_PREFIX_PATH}/apps/ecommerce`,
      title: 'sidenav.manage-site.users',
      icon: UsergroupAddOutlined   ,
      breadcrumb: true,
     // <HomeOutlined />
      submenu: [
        {
          key: 'liste_utilisateurs',
          path: `${APP_PREFIX_PATH}/apps/ecommerce/orders`,
          title: 'sidenav.manage-site.users.liste-users',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'add_user',
          path: `${APP_PREFIX_PATH}/apps/ecommerce/add-product`,
          title: 'sidenav.manage-site.users.add-user',
          icon: '',
          breadcrumb: false,
          submenu: []
        }

      ]
    },
   // Entities
    {
      key: 'entité',
      path: `${APP_PREFIX_PATH}/apps/ecommerce`,
      title: 'sidenav.manage-site.entities',
      icon: IdcardOutlined    ,
      breadcrumb: true,
     // <HomeOutlined />
      submenu: [
        {
          key: 'liste_entities',
          path: `${APP_PREFIX_PATH}/apps/project/list`,
          title: 'sidenav.manage-site.entities.liste-entities',
          icon: '',
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'add_entitie',
          path: `${APP_PREFIX_PATH}/apps/ecommerce/add-product`,
          title: 'sidenav.manage-site.entities.add-entitie',
          icon: '',
          breadcrumb: false,
          submenu: []
        }

      ]
    }
  ]
}]



 const navigationConfig = [
   ...dashBoardNavTree,
   ...appsNavTree,
 
 ]

export default navigationConfig;

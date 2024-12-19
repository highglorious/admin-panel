import {
  ApartmentOutlined,
  DashboardOutlined,
  FileOutlined,
  GiftOutlined,
  MailOutlined,
  MobileOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const mainNavTree = [
  {
    key: "main",
    path: `${APP_PREFIX_PATH}/main`,
    title: "sidenav.main",

    breadcrumb: false,
    submenu: [
      {
        key: "main-planner",
        path: `${APP_PREFIX_PATH}/main/planner`,
        title: "sidenav.main.planner",
        icon: ApartmentOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "main-dashboard",
        path: `${APP_PREFIX_PATH}/main/dashboard`,
        title: "sidenav.main.dashboard",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "main-catalog",
        path: `${APP_PREFIX_PATH}/main/catalog`,
        title: "sidenav.main.catalog",
        icon: ShoppingCartOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: "main-catalog-goods",
            path: `${APP_PREFIX_PATH}/main/catalog/goods`,
            title: "sidenav.main.catalog.goods",

            breadcrumb: false,
            submenu: [],
          },
          {
            key: "main-catalog-categories",
            path: `${APP_PREFIX_PATH}/main/catalog/categories`,
            title: "sidenav.main.catalog.categories",

            breadcrumb: false,
            submenu: [],
          },
          {
            key: "main-catalog-collections",
            path: `${APP_PREFIX_PATH}/main/catalog/collections`,
            title: "sidenav.main.catalog.collections",

            breadcrumb: false,
            submenu: [],
          },
          {
            key: "main-catalog-combo",
            path: `${APP_PREFIX_PATH}/main/catalog/combo`,
            title: "sidenav.main.catalog.combo",

            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: "main-orders",
        path: `${APP_PREFIX_PATH}/main/orders`,
        title: "sidenav.main.orders",
        icon: ShoppingOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "main-clients",
        path: `${APP_PREFIX_PATH}/main/clients`,
        title: "sidenav.main.clients",
        icon: UserOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: "main-clients-list",
            path: `${APP_PREFIX_PATH}/main/clients/client-list`,
            title: "sidenav.main.clients.list",

            breadcrumb: false,
            submenu: [],
          },
          {
            key: "main-clients-groups",
            path: `${APP_PREFIX_PATH}/main/clients/client-groups`,
            title: "sidenav.main.clients.groups",

            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: "main-banners",
        path: `${APP_PREFIX_PATH}/main/banners`,
        title: "sidenav.main.banners",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "main-promocodes",
        path: `${APP_PREFIX_PATH}/main/promocodes`,
        title: "sidenav.main.promocodes",
        icon: GiftOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "main-offline",
        path: `${APP_PREFIX_PATH}/main/offline`,
        title: "sidenav.main.offline",
        icon: ShopOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: "main-offline-address",
            path: `${APP_PREFIX_PATH}/main/offline/address`,
            title: "sidenav.main.offline.address",

            breadcrumb: false,
            submenu: [],
          },
          {
            key: "main-offline-geozone",
            path: `${APP_PREFIX_PATH}/main/offline/geozone`,
            title: "sidenav.main.offline.geozone",

            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: "main-employees",
        path: `${APP_PREFIX_PATH}/main/employees`,
        title: "sidenav.main.employees",
        icon: UsergroupAddOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "main-mailings",
        path: `${APP_PREFIX_PATH}/main/mailings`,
        title: "sidenav.main.mailings",
        icon: MailOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const systemNavTree = [
  {
    key: "system",
    path: `${APP_PREFIX_PATH}/system`,
    title: "sidenav.system",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "system-settings",
        path: `${APP_PREFIX_PATH}/system/settings`,
        title: "sidenav.system.settings",
        icon: SettingOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "main-mobile",
        path: `${APP_PREFIX_PATH}/system/mobile`,
        title: "sidenav.system.mobile",
        icon: MobileOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "main-logs",
        path: `${APP_PREFIX_PATH}/system/logs`,
        title: "sidenav.system.logs",
        icon: FileOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [...mainNavTree, ...systemNavTree];

export default navigationConfig;

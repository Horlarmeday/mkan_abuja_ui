/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
==========================================================================================*/
// import store from '../../../store/auth/moduleAuth'

// function logout() {
//   store.dispatch('logout').then(() => this.$router.push('/auth/login'))
// }

export default [
  {
    url: "/app/dashboard",
    name: "Dashboard",
    slug: "dashboard",
    icon: "HomeIcon",
  },
  {
    url: "/app/members",
    name: "Members",
    slug: "members",
    icon: "UsersIcon",
  },
  {
    url: "/app/files",
    name: "Files",
    slug: "files",
    icon: "FileTextIcon",
  },
  {
    url: "/app/analytics",
    name: "Analytics",
    slug: "analytics",
    icon: "BarChart2Icon",
  },
  {
    url: "/app/settings",
    name: "Settings",
    slug: "settings",
    icon: "SettingsIcon",
  },
  {
    url: "",
    name: "Logout",
    slug: "logout",
    icon: "LogOutIcon",
  },
]

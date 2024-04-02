// prettier-ignore
export const state = () => ({
  pageTitle: '',
  sidebarCollapse: false,
  sideMenu: [
    { id: "1", name: "dashboard", title: 'Dashboard', link: '/dashboard', children: [], active: true, open: false, icon: "award" },
    { id: "2", name: "monitor", title: 'Monitor', link: '/monitor', children: [], active: true, open: false, icon: "desktop", type: "emp" },
    { id: "3", name: "employees", title: 'Employees', link: '/employees', children: [], active: true, open: false, icon: "users", type: "emp" },
    {
      id: "4", name: "data", title: 'Data', link: '', children: [
        // { id: "1", name: "data-import", title: 'Import Data', link: '/data/import', children: [], active: true, open: false, icon: "file-import", type: "cus" },
        { id: "2", name: "data-export", title: 'Export Data', link: '/data/export', children: [], active: true, open: false, icon: "file-export", type: "cus" }
      ], active: false, open: false, icon: "table", type: "cus"
    }
  ],
  breadcrumbs: []
})

export const mutations = {
  SET_SIDEBAR_COLLAPSE(state, isCollapse) {
    state.sidebarCollapse = isCollapse
  },
  SET_BREADCRUMB(state, routeName) {
    let breadcrumbs = []
    switch (routeName) {
      case 'dashboard':
      case 'monitor':
      case 'employees':
        breadcrumbs = [routeName]
        break
      default:
        break
    }

    const unNestedMenu = (menuList = []) => {
      const items = []
      menuList.forEach(x => {
        const { children } = x
        if (children.length) {
          items.push(...children)
          items.push({ ...x, children: [] })
        } else {
          items.push({ ...x })
        }
      })
      return items
    }
    const sideMenu = unNestedMenu(state.sideMenu)
    const nameToBreadcrumb = name => {
      const match = sideMenu.find(x => x.name === name)
      return match
        ? { title: match.title, link: match.link }
        : { title: name, link: '' }
    }
    breadcrumbs = breadcrumbs.map(nameToBreadcrumb)
    state.breadcrumbs = breadcrumbs
  },
  SET_PAGE_TITLE(state, routeName) {
    let title = ''
    console.log(routeName);
    switch (routeName) {
      case 'dashboard':
        title = 'Dashboard'
        break;
      case 'monitor':
        title = 'Monitor'
        break;
      case 'employees':
        title = 'Employees'
        break;
      case 'data-export':
        title = 'Export Data'
        break;
      case 'data-import':
        title = 'Import Data'
        break;
      default:
        break;
    }
    state.pageTitle = title
  }
}

export const actions = {
  CollapseSidebar({ commit }, isCollapse) {
    commit('SET_SIDEBAR_COLLAPSE', isCollapse)
  },
  UpdatePageTitle({ commit }, routeName) {
    commit('SET_PAGE_TITLE', routeName)
  },
  UpdateBreadcrumb({ commit }, routeName) {
    commit('SET_BREADCRUMB', routeName)
  }
}

export const getters = {
  getPageTitle(state) {
    return state.pageTitle
  },
  getBreadcrumb(state) {
    return state.breadcrumbs
  },
  getSideMenu(state) {
    return state.sideMenu
  },
  isCollapseSidebar(state) {
    return state.sidebarCollapse
  }
}

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    currentRoute() {
      const { name } = this.$route
      return name
    }
  },
  methods: {
    onCollapseClicked() {
      this.$store.dispatch('menu/CollapseSidebar', !this.isCollapse)
    },
    onMenuClicked({ link = '' }) {
      if (link !== '') {
        this.$router.push(link)
      }
    }
  }
}
</script>

<template>
  <div class="app-sidebar">
    <section class="sidebar-menu">
      <el-menu
        :collapse="isCollapse"
        :default-active="currentRoute"
        active-text-color="#bc8f8f">
        <!-- SubMenu -->
        <template v-for="menu in list">
          <template v-if="menu.children.length > 0">
            <!-- Main menu -->
            <el-submenu
              :key="menu.id"
              :index="menu.name">
              <template
                slot="title">
                <icon
                  :name="menu.icon"
                  class="sidebar-icon"
                  scale="0.9" />
                <span
                  slot="title"
                  class="menu-title">
                  {{ menu.title }}
                </span>
              </template>
              <!-- Loop of sub menu -->
              <template v-for="submenu in menu.children">
                <el-menu-item
                  :key="submenu.id"
                  :index="submenu.name"
                  @click="onMenuClicked(submenu)">
                  <span
                    slot="title"
                    class="menu-title">{{ submenu.title }}</span>
                  <icon
                    :name="submenu.icon"
                    class="sidebar-icon"
                    scale="0.9" />
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <!-- SingleMenu -->
          <template v-else>
            <el-menu-item
              :key="menu.id"
              :index="menu.name"
              @click="onMenuClicked(menu)">
              <icon
                :name="menu.icon"
                class="sidebar-icon"
                scale="0.9" />
              <span
                slot="title"
                class="menu-title">{{ menu.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </section>

    <section
      class="sidebar-collapse"
      @click="onCollapseClicked">
      <div class="collapse-button">
        <template v-if="isCollapse">
          <i class="el-icon-d-arrow-right"/>
        </template>
        <template v-else>
          <i class="el-icon-d-arrow-left"/>
          <span>Collapse sidebar</span>
        </template>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@import '~assets/styles/variables';

.app-sidebar {
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  height: 100%;
  .sidebar-menu {
    flex: 1;
    overflow: hidden;
    .menu-title {
      transition: all 0.3s ease-in-out;
    }
    .el-menu {
      background-color: transparent;
      border: 0;
    }

    .el-menu--collapse.el-menu .el-submenu.is-active {
      background-color: white;
      border-top: 1px solid $colorBorder;
      border-bottom: 1px solid $colorBorder;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 2px;
        background-color: $colorPrimary;
      }
    }

    .el-menu-item.is-active {
      background-color: white;
      border-top: 1px solid $colorBorder;
      border-bottom: 1px solid $colorBorder;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 2px;
        background-color: $colorPrimary;
      }
    }
  }
  .sidebar-collapse {
    height: 40px;
    .collapse-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      cursor: pointer;
      span {
        margin-left: 15px;
      }
    }
  }
}

.sidebar-icon {
  margin-right: 4px;
}
</style>

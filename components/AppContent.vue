<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      excludeBreadcrumb: ['dashboard']
    }
  },
  computed: {
    ...mapGetters({
      breadcrumbs: 'menu/getBreadcrumb',
      pageTitle: 'menu/getPageTitle'
    }),
    allowBreadcrumb() {
      const { name } = this.$route
      return !this.excludeBreadcrumb.includes(name)
    }
  }
}
</script>

<template>
  <transition name="fade" mode="out-in">
    <div class="page-wrapper">
      <section class="page-title">
        <header class="title">{{ pageTitle }}</header>
      </section>
      <section class="page-content">
        <slot />
      </section>
    </div>
  </transition>
</template>

<style lang="scss">
@import '~assets/styles/variables';

.page-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;

  .page-content {
    width: 100%;
  }

  .page-breadcrumb {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid $colorBorder;
  }

  .page-title {
    display: flex;
    margin: 0 0 15px;
    font-size: 1.5rem;
    color: $colorPrimary;
  }
}
</style>

const { body } = document
const WIDTH = 1024
const RATIO = 3

export default {
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler, { passive: true })
  },
  mounted() {
    const isMinimize = this.isMinimizeSidebar()
    this.$store.dispatch('menu/CollapseSidebar', isMinimize)
  },
  methods: {
    isMinimizeSidebar() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMinimize = this.isMinimizeSidebar()
        this.$store.dispatch('menu/CollapseSidebar', isMinimize)
      }
    }
  }
}

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'Guest'
    }
  },
  computed: {
    avatarSymbol() {
      const [firstCharacter] = this.name
      return firstCharacter.toUpperCase()
    },
    avatarBackground() {
      const firstCharCode = this.avatarSymbol.charCodeAt()
      const backgrounds = [
        '#ffebee',
        '#f3e5f5',
        '#e8eaf6',
        '#e3f2fd',
        '#e0f2f1',
        '#fbe9e7',
        '#eee'
      ]
      return backgrounds[firstCharCode % backgrounds.length]
    }
  }
}
</script>

<template>
  <div
    :style="{ background: avatarBackground }"
    class="avatar">
    {{ avatarSymbol }}
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.avatar {
  width: 100%;
  height: 100%;
  align-content: center;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: $colorFontDark;
}
</style>

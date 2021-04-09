<template>
<div class="iframe-container">
  <iframe :src="src" scrolling="auto" frameborder="0" class="frame"></iframe>
</div>
</template>

<script>
export default {
  name: 'IFrame',
  data () {
    return {
      src: '',
      loading: null
    }
  }
}
</script>

<style scoped>

</style>

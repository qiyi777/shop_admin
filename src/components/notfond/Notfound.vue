<template>
  <h1>404 Not Found</h1>
</template>
<script>
export default {
  // 设置三秒后跳转到首页
  created () {
    setTimeout(() => {
      this.$router.push('/home')
    }, 3000)
  }
}
</script>
<style>
</style>

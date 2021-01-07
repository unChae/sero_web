<template>
  <div class="loading">
    <v-progress-circular
      class="spinner"
      :size="70"
      :width="7"
      color="grey"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<style scoped>
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.5;
}
.spinner {
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
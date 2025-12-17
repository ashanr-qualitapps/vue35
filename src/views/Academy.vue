<template>
  <DefaultLayout>
    <div class="pa-8">
      <h1 class="text-h3 mb-4">Academy</h1>
      <v-alert type="info" class="mb-4">
        This is the Academy page using the DefaultLayout.
      </v-alert>
      <p class="text-body-1">
        Learn and develop your skills through our comprehensive academy programs.
      </p>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

export default {
  name: 'Academy',
  components: {
    DefaultLayout
  }
}
</script>
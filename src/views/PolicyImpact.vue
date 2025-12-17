<template>
  <DefaultLayout>
    <div class="pa-8">
      <h1 class="text-h3 mb-4">Policy Impact</h1>
      <v-alert type="info" class="mb-4">
        This is the Policy Impact page using the DefaultLayout.
      </v-alert>
      <p class="text-body-1">
        Understand and create meaningful policy impact through research and advocacy.
      </p>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

export default {
  name: 'PolicyImpact',
  components: {
    DefaultLayout
  }
}
</script>
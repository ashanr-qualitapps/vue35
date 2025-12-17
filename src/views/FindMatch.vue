<template>
  <DefaultLayout>
    <div class="pa-8">
      <h1 class="text-h3 mb-4">Find Your Match</h1>
      <v-alert type="info" class="mb-4">
        This is the Find Your Match page using the DefaultLayout.
      </v-alert>
      <p class="text-body-1">
        Connect with researchers, collaborators, and experts in your field.
      </p>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

export default {
  name: 'FindMatch',
  components: {
    DefaultLayout
  }
}
</script>
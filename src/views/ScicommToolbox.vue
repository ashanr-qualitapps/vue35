<template>
  <DefaultLayout>
    <div class="pa-8">
      <h1 class="text-h3 mb-4">Scicomm Toolbox</h1>
      <v-alert type="info" class="mb-4">
        This is the Science Communication Toolbox page using the DefaultLayout.
      </v-alert>
      <p class="text-body-1">
        Access tools and resources for effective science communication.
      </p>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

export default {
  name: 'ScicommToolbox',
  components: {
    DefaultLayout
  }
}
</script>
<template>
  <DefaultLayout>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card elevation="3">
            <v-card-title class="text-h4 text-center primary--text">
              <v-icon left size="32">mdi-email</v-icon>
              Contact Us
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-6">
              <p class="text-body-1 text-center mb-6">
                We'd love to hear from you! Fill out the form below and we'll get back to you soon.
              </p>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Name"
                  prepend-icon="mdi-account"
                  required
                  outlined
                  class="mb-2"
                ></v-text-field>
                
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  prepend-icon="mdi-email"
                  type="email"
                  required
                  outlined
                  class="mb-2"
                ></v-text-field>
                
                <v-textarea
                  v-model="message"
                  :rules="messageRules"
                  label="Message"
                  prepend-icon="mdi-message-text"
                  rows="4"
                  required
                  outlined
                  class="mb-4"
                ></v-textarea>
                
                <div class="text-center">
                  <v-btn
                    @click="submit"
                    :disabled="!valid"
                    color="primary"
                    large
                    class="mr-4"
                  >
                    <v-icon left>mdi-send</v-icon>
                    Send Message
                  </v-btn>
                  <v-btn @click="reset" outlined>
                    <v-icon left>mdi-refresh</v-icon>
                    Reset
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

export default {
  name: 'Contact',
  components: {
    DefaultLayout
  },
  data() {
    return {
      valid: true,
      name: '',
      email: '',
      message: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 2) || 'Name must be at least 2 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      messageRules: [
        v => !!v || 'Message is required',
        v => (v && v.length >= 10) || 'Message must be at least 10 characters'
      ]
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate()
      if (this.valid) {
        // Handle form submission here
        console.log('Form submitted:', {
          name: this.name,
          email: this.email,
          message: this.message
        })
        // You could show a success message here
      }
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
<template>
  <AuthenticatedLayout>
    <div>
      <div class="d-flex justify-space-between align-center mb-4">
        <h1 class="text-h4">Users</h1>
        <v-btn color="primary" prepend-icon="mdi-plus">Add User</v-btn>
      </div>
      
      <v-card>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="users"
            item-key="id"
          >
            <template v-slot:item.avatar="{ item }">
              <v-avatar size="32">
                <img :src="item.avatar" :alt="item.name" />
              </v-avatar>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip :color="item.status === 'Active' ? 'success' : 'error'" size="small">
                {{ item.status }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout.vue'

export default {
  name: 'Users',
  components: {
    AuthenticatedLayout
  },
  data() {
    return {
      headers: [
        { title: 'Avatar', key: 'avatar', sortable: false },
        { title: 'Name', key: 'name' },
        { title: 'Email', key: 'email' },
        { title: 'Role', key: 'role' },
        { title: 'Status', key: 'status' }
      ],
      users: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Administrator',
          status: 'Active',
          avatar: 'https://via.placeholder.com/32'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'User',
          status: 'Active',
          avatar: 'https://via.placeholder.com/32'
        },
        {
          id: 3,
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'User',
          status: 'Inactive',
          avatar: 'https://via.placeholder.com/32'
        }
      ]
    }
  }
}
</script>
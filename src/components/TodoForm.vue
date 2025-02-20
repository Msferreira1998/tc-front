<template>
  <div>
    <v-form ref="form" class="form-container">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="title"
            label="Title"
            :rules="[(v) => !!v || 'Title is required']"
            outlined
            dense
            required
            prepend-icon="mdi-text-box-outline"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="userId"
            type="number"
            label="User ID"
            :rules="[(v) => !!v || 'User ID is required']"
            outlined
            dense
            required
            prepend-icon="mdi-account-outline"
          />
        </v-col>
      </v-row>

      <v-row class="actions-row">
        <v-col cols="12" class="text-right">
          <v-btn color="error" @click="onCancel" class="mr-3">
            <v-icon left>mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn color="primary" @click="onSubmit">
            <v-icon left>mdi-check</v-icon>
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'TodoForm',
  props: {
    item: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      id: null,
      title: '',
      userId: null,
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const todo = {
          id: this.id,
          title: this.title,
          userId: this.userId,
          completed: false,
        };
        this.$emit('onSubmit', todo);
      }
    },
    onCancel() {
      this.$emit('onCancel');
    },
  },
  watch: {
    item: {
      immediate: true,
      deep: true,
      handler(item) {
        if (item) {
          this.id = item.id;
          this.title = item.title;
          this.userId = item.userId;
        }
      },
    },
  },
};
</script>

<style>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.actions-row {
  margin-top: 20px;
}

.v-text-field {
  margin-bottom: 16px;
}

.v-btn {
  text-transform: capitalize;
  font-weight: 500;
}

.v-btn--error {
  background-color: #ff5252 !important;
}

.v-btn--primary {
  background-color: #1976d2 !important;
}
</style>

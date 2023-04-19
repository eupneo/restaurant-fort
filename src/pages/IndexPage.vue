<template>
  <q-page class="">
    <div class="row q-pa-md q-col-gutter-md">
      <div v-for="dish of dishes" v-bind:key="dish._id" class="col-3">
        <q-card>
          <img
            :src="'https://picsum.photos/200/200?random=' + dish?.name"
            alt="asd"
            style="object-fit: cover; width: 100%; height: 5rem"
          />

          <q-card-section class="bg-secondary text-white">
            <div class="text-h6">{{ dish.name }}</div>
            <div class="text-h6">Price: {{ dish.price / 100 }} €</div>
          </q-card-section>

          <q-card-actions align="around">
            <q-btn flat>Add</q-btn>
            <q-btn flat>Remove</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      dishes: [],
    };
  },
  methods: {
    async getDishes() {
      const { data: dishes } = await this.$api.get("dishes");

      this.dishes = dishes;
    },
    async getImages() {},
  },
  watch: {
    "$store.getters.token"(newToken) {
      if (!!newToken) {
        this.getDishes();
      } else {
        this.dishes = [];
      }
    },
  },
  created() {
    if (this.$store.getters.token) this.getDishes();
  },
  setup() {
    return {};
  },
});
</script>

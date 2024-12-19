import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
const API_URL = import.meta.env.VITE_API_URL;
export const useProductStore = defineStore("product", {
  state: () => ({
    products: ref([]),
    loading: false,
    comments: ref([{}]),
    productsOnCart: ref([]),
    selectedBrand: "All",
    selectedGender: "All",
    selectedPrice: "All",
    selectedType: "All",
  }),

  actions: {
    async getProducts() {
      this.loading = true;
      const response = await axios.get(`${API_URL}/products`);
      this.products = await response.data;
      this.loading = false;
    },
    async addToCart(id) {
      const product = this.products.find((element) => element._id === id);
      if (!this.productsOnCart.includes(product))
        this.productsOnCart.push(product);
    },

    async clearCart() {
      this.productsOnCart = [];
    },
    async addComment(_productId, _comment, _username) {
      try {
        const URL = `${API_URL}/products/${_productId}/comments`;
        const response = await axios.post(URL, {
          text: _comment,
          user: _username,
        });

        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    async getComments(productId) {
      const URL = `${API_URL}/products/${productId}/comments`;
      const response = await axios.get(URL);
      this.comments = await response.data.comments;
      console.log(this.comments);
    },
  },
});

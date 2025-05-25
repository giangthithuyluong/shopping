import { ref } from 'vue'
import { getAllProducts } from "@/api"
import { defineStore } from "pinia"

/*
    product: {
    category: "men's clothing",
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    id: 1,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    price: 109.95,
    rating: {rate: 3.9, count: 120},
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    }
*/

export const useProductStore = defineStore('products', () => {
    const items = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    async function fetchProducts() {
        isLoading.value = true
        error.value = null
        try {
            await getAllProducts()
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(res.message)
                }
                items.value = res.data
            })
            
        } catch (err) {
            error.value = err.message
        } finally {
            isLoading.value = false
        }
    }

    function groupByCategory() {
        return items.value.reduce((obj, product) => {
            const category = product.category || 'Unknown'
            if(obj[category]) {
                obj[category].push(product)
            } else {
                obj[category] = [product]
            }
        }, {})
    }
    function getWithId(id) {
        return items.value.find(p => p.id == id)
    }

    return { 
        items, 
        isLoading, 
        error, 
        fetchProducts,
        groupByCategory,
        getWithId
    }
})
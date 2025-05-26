import { ref } from "vue"
import { defineStore } from "pinia"
import { getCart } from "@/api"
import { useProductStore } from "./product"

/*
    cart {
        "id": 1,
        "userId": 1,
        "date": "2020-03-02T00:00:00.000Z",
        "products": [
            {
            "productId": 1,
            "quantity": 4
            },
            {
            "productId": 2,
            "quantity": 1
            },
            {
            "productId": 3,
            "quantity": 6
            }
        ],
        "__v": 0
    }
*/

export const useCartStore = defineStore('cart', () => {
    const items = ref([])
    const isLoading = ref(false)
    const error = ref(null)
    
    async function fetchCart() {
        isLoading.value = true
        error.value = null
        try {
            await getCart(1)
            .then(res => {
                if(res.status == 200) {
                    items.value = res.data
                } else {
                    throw new Error(res.message)
                }
            })
        } catch(err) {
            err.value = err.message
        } finally {
            isLoading.value = false
        }
    }
    function getProducts() {
        if(items.value) {
            const products = useProductStore().items
            return items.value.products.map(product => {
                let p = products.find(p => p.id == product.productId) 
                return {
                    ...p,
                    quantity: product.quantity
                }
            })
        }
        return []
    }

    function increase(id) {
        if(items.value) {
            let ps = items.value.products
            ps.find(p => p.productId == id).quantity++
            items.value = {
                ...items.value,
                products: ps
            }
            return true
        }
        return false
    }
    function decrease(id) {
        if(items.value) {
            let ps = items.value.products
            let p = ps.find(p => p.productId == id)
            if(p.quantity > 0) p.quantity--
            if(p.quantity == 0) {
                ps.splice(ps.findIndex(p => p.productId == id), 1)
            }
            items.value = {
                ...items.value,
                products: ps
            }
            return true
        }
        return false
    }

    function add(id, quantity) {
        if(items.value && quantity > 0) {
            let ps = items.value.products
            let p = ps.find(p => p.productId == id)
            p ? p.quantity+=quantity : ps.push({
                productId: id,
                quantity: quantity
            })
            items.value = {
                ...items.value,
                products: ps
            }
            return true
        }
        return false
    }

    return {
        items,
        isLoading,
        error,
        fetchCart,
        getProducts,
        increase,
        decrease,
        add
    }
})
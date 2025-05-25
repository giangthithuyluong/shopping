<script setup>
    import { onMounted } from 'vue'
    import Default from '../layouts/Default.vue'
    import ProductItem from '@/components/ProductItem.vue'
    import CartItem from '@/components/CartItem.vue'
    import { useAuthStore } from '@/stores/auth'
    import { useProductStore } from '@/stores/product.js'
    import { useCartStore } from '@/stores/cart.js'
    const auth = useAuthStore()
    const products = useProductStore()
    const cart = useCartStore()
    onMounted(async () => {
        await products.fetchProducts()
        await cart.fetchCart()
        
    })
    const mokedata = {
        category: "men's clothing",
        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        id: 1,
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        price: 109.95,
        rating: {rate: 3.9, count: 120},
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        count: 2
    }
</script>

<template>
    <Default>
        <div class="home">
            <h1>Trang Chủ</h1>
            <p>Chào mừng <span class="user-name">{{ auth.user?.fullname() }}</span> đến với trang chủ của ứng dụng Vue!</p>
            <p>
                Đây là Project Vue tạo ra bằng Vite và mô phỏng lại website sử dụng API
                <a href="https://fakestoreapi.com/" target="_blank">(Đây là API mở)</a>
                .
            </p>
        </div>
        <CartItem v-if="cart.items.length > 0" :cart="cart.getProducts()[0]" />
    </Default>
</template>

<style scoped>
.home {
    padding: 20px;
    .user-name {
        font-weight: bold;
        color: #42b983;
    }
}
</style>
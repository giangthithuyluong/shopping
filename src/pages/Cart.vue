<script setup>
    import { ref, onMounted } from 'vue'
    import CartItem from '@/components/CartItem.vue'
    import Default from '@/layouts/Default.vue'
    import { useCartStore } from '@/stores/cart.js'
    const cartStore = useCartStore()
    const cart = ref([])
    const cartTotal = ref(cart.value.reduce((total, item) => total + item.price * item.quantity, 0))
    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    }
    function Increase(id) {
        cartStore.increase(id)
        cart.value = cartStore.getProducts()
        console.log(cartStore.getProducts());
        
    }
    function Decrease(id) {
        cartStore.decrease(id)
        cart.value = cartStore.getProducts()
        console.log(cartStore.getProducts());
        
    }
    onMounted(() => {
        console.log(cartStore.getProducts());
        
        cart.value = cartStore.getProducts()
    })
</script>

<template>
    <Default>
        <div class="cart-page">
            <h1>Giỏ Hàng</h1>
            <div v-if="cart.length === 0" class="empty-cart">
                Giỏ hàng của bạn đang trống.
            </div>
            <div v-else>
                <ul class="cart-list">
                    <li v-for="item in cart" :key="item.id" class="cart-item">
                        <CartItem 
                            :cart="item" 
                            :increase="() => Increase(item.id)"
                            :decrease="() => Decrease(item.id)"
                            :delete="() => alert('Chức năng chưa hoàn thành')"
                        />
                    </li>
                </ul>
                <div class="cart-total">
                    <strong>Tổng cộng: {{ formatPrice(cartTotal) }}</strong>
                </div>
                <button class="checkout-btn">Thanh toán</button>
            </div>
        </div>
    </Default>
</template>

<style scoped>
.cart-page {
    max-width: 600px;
    margin: 40px auto;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px #eee;
}
.cart-list {
    list-style: none;
    padding: 0;
    margin: 0 0 24px 0;
}
.item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 16px;
    border-radius: 4px;
}
.item-info h2 {
    margin: 0 0 8px 0;
    font-size: 18px;
}
.cart-total {
    text-align: right;
    margin-bottom: 16px;
    font-size: 18px;
}
.checkout-btn {
    display: block;
    width: 100%;
    padding: 12px;
    background: #42b983;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}
.empty-cart {
    text-align: center;
    color: #888;
    font-size: 18px;
    margin: 40px 0;
}
</style>
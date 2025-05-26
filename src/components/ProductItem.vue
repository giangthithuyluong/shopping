<script setup>
    import { useRouter } from 'vue-router'
    const router = useRouter()
    defineProps({
        product: {
            type: Object,
            default: () => ({
                id: null,
                title: '',
                price: 0,
                description: '',
                category: '',
                image: '',
                rate: '',
                count: 0
            })
        },
        width: {
            type: Number,
            default: 180
        }
    })
    function handleChoseProduct(product) {
        product.id && router.push('/productdesc/' + product.id)
    }
</script>

<template>
    <div class="product-item" 
        :key="product.id" 
        @click="handleChoseProduct(product)" 
        :title="product.title"
        :style="{ width: width + 'px', height: width + 'px' }"
    >
        <img v-if="product.image" :src="product.image" alt="Product Image" class="product-image" />
        <div v-else class="product-image no-data" />
        <h3 class="product-title" :class="product.title ? '' : 'no-data'">{{ product.title }}</h3>
        <p class="product-price" :class="product.price > 0 ? '' : 'no-data'">{{ product.price > 0 ? product.price.toFixed(2) + ' VND' : '' }}</p>
    </div>
</template>

<style scoped>
    .product-item {
        border-radius: 8px;
        padding: 16px;
        text-align: center;
        background-color: #fff;
        box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.1);
        transition: .3s;
        cursor: pointer;    
        white-space: nowrap;
        text-overflow: ellipsis;
        .product-image {
            width: 100%;
            height: auto;
            max-height: 70%;
            object-fit: contain;
        }
        div.product-image {
            width: 100%;
            height: 70%;
            overflow: hidden;
        }
        .no-data::after {
            content: '';
            display: block;
            width: 400%;
            height: 100%;
            background: linear-gradient(150deg, #fcfcfc, #e6e6e6);
            animation: dataloading 3s linear 0s infinite alternate-reverse forwards;
        }
        h3, p {
            margin: auto;
            margin-top: 2px;
            height: 1.5rem;
            overflow: hidden;
        }
        p.no-data {
            height: 1rem;
        }

        &:hover {
            background-color: #fafafa;
            box-shadow: -1px 0px 4px rgba(0, 0, 0, 0.1);
        }
    }
</style>
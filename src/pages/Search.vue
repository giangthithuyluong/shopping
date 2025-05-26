<script setup>
    import { ref } from 'vue'
    import Default from '@/layouts/Default.vue'
    import ProductItem from '@/components/ProductItem.vue'
    import { useProductStore } from '@/stores/product'

    const productStore = useProductStore()
    const query = ref('')
    const results = ref(productStore.items)
    const isSearch = ref(false)

    function performSearch() {
        if(!isSearch.value) {
            isSearch.value = true
            if (!query.value.trim()) {
                results.value = productStore.items
            } else {
                results.value = productStore.filterProducts(query.value)
            }
            isSearch.value = false
        }
    }
</script>

<template>
    <Default>
        <div class="search-page">
            <h1>Tìm kiếm</h1>
            <input
                v-model="query"
                @keyup.enter="performSearch"
                type="text"
                placeholder="Nhập từ khóa tìm kiếm..."
            />
            <button @click="performSearch">{{isSearch ? "Đang tìm kiếm..." : "Tìm kiếm"}}</button>

            <div v-if="results.length">
                <h2>Kết quả ({{ results.length }}):</h2>
                <ul>
                    <li v-for="(item, index) in results" :key="index">
                        <ProductItem :product="item" :width="200" />
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>Không tìm thấy kết quả nào.</p>
            </div>
        </div>
    </Default>
</template>

<style scoped>
.search-page {
    width: 90%;
    margin: 40px auto;
    padding: 24px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #fafbfc;
}
input[type="text"] {
    width: 70%;
    padding: 8px;
    margin-right: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
button {
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    background: var(--xanh);
    color: #fff;
    cursor: pointer;
}
button:hover {
    background: var(--xanh-dam);
}
ul {
    width: 100%;
    margin-top: 16px;
    padding-left: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    place-items: center;
    gap: 20px;
    li {
        max-width: 100%;
        & > * {
            max-width: 100%;
        }
    }
}
@media only screen and (max-width: 768px) {
    .search-page {
        width: 100%;
        margin: 0;
        padding: 24px;
        border: none;
        border-radius: unset;
        background: #fafbfc;
    }
}
</style>
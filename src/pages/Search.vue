<script setup>
    import { ref } from 'vue'
    import Default from '@/layouts/Default.vue'

    const query = ref('')
    const results = ref([])
    const searched = ref(false)

    const data = [
        'Vue.js',
        'React',
        'Angular',
        'Svelte',
        'Node.js',
        'JavaScript',
        'TypeScript'
    ]

    function performSearch() {
        searched.value = true
        if (!query.value.trim()) {
            results.value = []
            return
        }
        results.value = data.filter(item =>
            item.toLowerCase().includes(query.value.toLowerCase())
        )
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
            <button @click="performSearch">Tìm kiếm</button>

            <div v-if="results.length">
                <h2>Kết quả:</h2>
                <ul>
                    <li v-for="(item, index) in results" :key="index">
                        {{ item }}
                    </li>
                </ul>
            </div>
            <div v-else-if="searched">
                <p>Không tìm thấy kết quả nào.</p>
            </div>
        </div>
    </Default>
</template>

<style scoped>
.search-page {
    max-width: 500px;
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
    background: #42b983;
    color: #fff;
    cursor: pointer;
}
button:hover {
    background: #369870;
}
ul {
    margin-top: 16px;
    padding-left: 20px;
}
</style>
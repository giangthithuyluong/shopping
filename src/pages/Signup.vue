<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const form = ref({
        username: '',
        email: '',
        password: '',
        confirm: ''
    });
    function handleSignup() {
        alert('Đăng ký thành công');
        router.push('/login');
    }
</script>

<template>
    <div class="signup-page">
        <h1>Đăng ký</h1>
        <p>Đây chỉ là trang thử nghiệm, không thể tạo tài khoản thực sự.</p>
        <form @submit.prevent="handleSignup">
            <div>
                <label for="username">Tên đăng nhập:</label>
                <input type="text" id="username" v-model="form.username" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" required />
            </div>
            <div>
                <label for="password">Mật khẩu:</label>
                <input type="password" id="password" v-model="form.password" required />
            </div>
            <div>
                <label for="confirm-password">Xác nhận mật khẩu:</label>
                <input type="password" id="confirm-password" v-model="form.confirm" required />
            </div>
            <div class="actions">
                <button type="button" @click="router.back()">Quay lại</button>
                <button type="submit">Đăng ký</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.signup-page {
    width: 400px;
    max-width: 100vw;
    margin: 40px auto;
    padding: 24px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    & > p {
        text-align: center;
    }
}
.signup-page h1 {
    text-align: center;
    margin-bottom: 24px;
}
.signup-page form div {
    margin-bottom: 16px;
}
.signup-page label {
    display: block;
    margin-bottom: 4px;
}
.signup-page input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
.signup-page .actions {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    button {
        flex: 1;
        padding: 10px;
        background: #42b983;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 16px;
    }
}
</style>
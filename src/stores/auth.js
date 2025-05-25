import { defineStore } from "pinia"
import { ref } from "vue"
import { login, getUserInfo } from "@/api"

/*
    user {
        id: 1,
        username: "admin",
        password: "admin",
        email: "",
        phone: "",
        address: {
            "geolocation": {
                "lat": "-37.3159",
                "long": "81.1496"
            },
            "city": "kilcoole",
            "street": "new road",
            "number": 7682,
            "zipcode": "12926-3874"
        },
        name: {
            firstname: "Nguyễn",
            lastname: "Văn A"
        },
        __v: 0
    }
*/

export const useAuthStore = defineStore("auth", () => {
    const isLogin = ref(false)
    const user = ref(null)
    const isLoading = ref(false)
    const error = ref(null)

    async function Login(username, password) {
        isLoading.value = true
        error.value = null
        try {
            const loginResponse = await login(username, password)
            if (loginResponse.status !== 200) {
                throw new Error(loginResponse.message)
            }
            await getUserInfo(1)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                user.value = {
                    ...res.data,
                    fullname() {
                        return `${this.name.firstname} ${this.name.lastname}`
                    }
                }
                }
                else {
                   throw new Error(data.message)
               }
            })
            isLogin.value = true
        } catch (err) {
            error.value = err.message
            isLogin.value = false
        } finally {
            isLoading.value = false
        }
    }
    function Logout() {
        isLogin.value = false
        user.value = null
    }
    return {
        isLogin,
        user,
        Login,
        Logout,
        isLoading,
        error
    }
})
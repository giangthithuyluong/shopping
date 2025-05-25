import { API } from "@/config/api"

export const login = async (username, password) => {
    const url = API.LOGIN
    try {
        const credentials = { username: username, password: password }
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
        if (!res.ok) {
            throw new Error("Đăng nhập không thành công")
        }
        const data = await res.json()
        return {
            status: 200,
            data: data
        }
    } catch (error) {
        return { 
            status: 400, 
            message: error.message || "Yêu cầu kết nối mạng để tiếp tục" 
        }
    }
}

export const getUserInfo = async (id) => {
    const url = `${API.USER}/${id}`
    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error("Không thể lấy thông tin người dùng")
        }
        const data = await res.json()
        return {
            status: 200,
            data: data
        }
    } catch (error) {
        return {
            status: 400,
            message: error.message || "Yêu cầu kết nối mạng để tiếp tục"
        }
    }
}

export const getAllProducts = async () => {
    try {
        const res = await fetch(API.PRODUCTS)
        if (!res.ok) {
            throw new Error("Không thể lấy danh sách sản phẩm")
        }
        const data = await res.json()
        return {
            status: 200,
            data: data
        }
    } catch (error) {
        return {
            status: 400,
            message: error.message || "Yêu cầu kết nối mạng để tiếp tục"
        }
    }
}

export const getCart = async (id) => {
    const url = `${API.CART}/${id}`
    try {
        const res = await fetch(url)
        if(res.ok) {
            const data = await res.json()
            return {
                status: 200,
                data: data
            }
        }
        throw new Error("Không thể lấy được giỏ hàng")
    } catch(err) {
        return {
            status: 400,
            message: err.message || "Kết nối mạng để tiếp tục"
        }
    }
}
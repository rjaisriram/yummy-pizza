import {API} from '../../config'

export const listOrder = (userId , token,page ) => {
    return fetch(`${API}/order/list/${userId}?page=${page}&limit=5&sortBy=createdAt&order=desc`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const updateOrderStatus = (userId , token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }, 
        body: JSON.stringify({ status, orderId })
    })
        .then(response => { 
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getStatus = (userId , token) => {
    return fetch(`${API}/order/status-values/${userId}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`,{
        method: 'GET'
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getCategories = () => {
    return fetch(`${API}/categories` , {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const createProduct = (userId , token , product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getProducts = () => {
    return fetch(`${API}/products`,{
        method: 'GET'
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`,{
        method: 'GET'
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const pageNo = (pageNo) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('pageNo' , JSON.stringify(pageNo));
    }
}

export const getPageNo = () => {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('pageNo')){
            return JSON.parse(localStorage.getItem('pageNo'))
        }
    }
    return 1;
}

export const createCategory = (userId , token , category) => {
    return fetch(`${API}/category/create/${userId}` , {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}

export const getPurchaseHistory = (userId , token) => {
    return fetch(`${API}/order/by/user/${userId}?sortBy=createdAt&order=desc` , {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}
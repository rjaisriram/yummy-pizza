import { API } from "../config";

export const read = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const signout = (next) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        next()
        return fetch(`{API}/signout` , {
            method: 'GET'
        })
        .then(response => {
            console.log('Signed out' , response);
        })
        .catch(err => console.log(err));
    }
}


export const authenticate = (data , next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt' , JSON.stringify(data));
        next()
    }
}

export const isAuthenticated = () => {
    if(typeof window == 'undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}

export const preSignup = user => {
    return fetch(`${API}/pre-signup` , {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}


export const signup = user => {
    return fetch(`${API}/signup` , {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const signin = user => {
    return fetch(`${API}/signin` , {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const forgotPassword = email => {
    return fetch(`${API}/forgot-password`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
    return fetch(`${API}/reset-password`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};


export const contact = (data) => {
    return fetch(`${API}/contact` , {
        method: 'POST',
        headers: { 
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response =>{
        return response.json()
    })
    .catch(err => console.log(err));
}


export const eventBooking = (data) => {
    return fetch(`${API}/event-booking` , {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },body: JSON.stringify(data)
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err));
}

export const getVegPizza = (slug) => {
    return fetch(`${API}/category/${slug}`,{
        method: 'GET',
            headers: {
                Accept: 'application/json',
            }
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err));
}

export const getNonVegPizza = slug => {
    return fetch(`${API}/category/${slug}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err))
}

export const getSides = slug => {
    return fetch(`${API}/category/${slug}`,{
       method: 'GET',
       headers: {Accept: 'application/json'} 
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err))
}

export const getBeverages = slug => {
    return fetch(`${API}/category/${slug}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err))
}

export const getBraintreeClientToken = (userId,token) => {
    return fetch(`${API}/braintree/getToken/${userId}`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}

export const processPayment = (userId, token , paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },body: JSON.stringify({order: createOrderData})
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}
import React,{useState , useEffect} from 'react'
import {isAuthenticated} from '../../../ScreenApi'
import {Link , Redirect} from 'react-router-dom'
import {getProduct ,getCategories, updateProduct} from '../../ApiDashboard'

import './Update.css'

const Update = ({match}) => {
    const [values , setValues] = useState({
        name : '', 
        description : '',
        price : '',
        category : '',
        categories : '', 
        photos : '',
        loading : false,
        error : false,
        createdProduct :'' ,
        formData : ''
    })

    const [categories , setCategories] = useState([])
    const {user , token} = isAuthenticated();
    const {
        name , description , price , category , photos , loading , error , createdProduct , formData
    } = values

    const init = productId => {
        getProduct(productId).then(data => {
            if(data.error){
                setValues({ ...values ,error: data.error})
            }else {
                setValues({ ...values ,
                            name: data.name,
                            description: data.description,
                            price: data.price,
                            category: data.category._id,
                            formData: new FormData()
                })
                initCategories();
            }
        })
    }

    const initCategories = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values , error: data.error})
            }else {
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        init(match.params.productId);
    },[])

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name , value)
        setValues({...values , [name]: value})
    }

    const clickSubmit = e => {
        e.preventDefault()
        setValues({...values ,error: '' , loading: true})
        updateProduct(match.params.productId , user._id , token , formData).then(data => {
            if(data.error){
                setValues({...values , error: data.error})
            }else {
                setValues({...values , name: '' , description: '' , photo: '' , price: '' , error: false , createdProduct: data.name , loading: false})
            }
        })
    }

    const newPostForm = () => (
        <form className='update-product' onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className='form-group'>
                <loading className='btn btn-secondary'>
                    <input onChange={handleChange('photo')} type='file' name='photo' accept='image/*' />
                </loading>
            </div>

            <div className='form-group'>
                <label className='text-muted'>
                    Name
                </label>
                <input className='form-control update-input-size' value={name} onChange={handleChange('name')} type='text' />
            </div>

            <div className='form-group'>
                <label className='text-muted'>
                    Description
                </label>
                <input className='form-control update-input-size' value={description} onChange={handleChange('description')} type='text' />
            </div>

            <div className='form-group'>
                <label className='text-muted'>
                    price
                </label>
                <input className='form-control update-input-size' value={price} onChange={handleChange('price')} type='number' />
            </div>

            <div className='form-group'>
                <label className='text-muted'>
                    Category
                </label>
                <select className='form-control update-input-size' onChange={handleChange('category')} >
                    <option>Please select</option>
                    {categories && categories.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <button className='btn btn-outline-warning'>Update Product</button>
        </form>
    )

    const showError = () =>(
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className='alert alert-success' style={{display: createdProduct ? '' : 'none'}}>
            <h6>{`${createdProduct}`} is updated!</h6>
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className='alert alert-info'>
                <h6>Loading...</h6>
            </div>
        )
    )

    return (
        <div className='update-product_page'>
            {showLoading()}
            {showError()}
            {showSuccess()}
            {newPostForm()}
        </div>
    )
}

export default Update

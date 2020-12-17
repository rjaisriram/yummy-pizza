import React,{useState , useEffect} from 'react';
import {isAuthenticated} from '../../../ScreenApi'
import {createProduct , getCategories } from '../../ApiDashboard'

import InputPopup from '../../DashboardCard/InputPopup'

const CreateProduct = () => {
    const [values , setValues] = useState({
        name: '',
        description: '',
        price: '',
        toppings: [],
        sizes: [],
        categories: [],
        category: '',
        photo: '',
        loading: false,
        error: false,
        success: false,
        formData: ''
    })

    const {user , token} = isAuthenticated();
    const {name , description , price, categories, photo, loading, error, success, formData} = values

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(()=>{
        init()
 },[])

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({...values , [name]: value})
    }

    console.log(formData);

    const clickSubmit = e => {
        e.preventDefault()
        setValues({...values, error: false , loading: true})

        createProduct(user._id , token , formData).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else {
                setValues({...values, name: '',
                description: '',
                photo: '',
                price: '' ,
                loading: false ,
                success: true
            })
            }
        })
    }
    
    const newPostForm = () => (
        <div>
        {showLoading()}
        {showError()}
        {showSuccess()}
        <form className='mb-3' onSubmit={clickSubmit}>
        <h4>Post photo</h4>
        <div className='form-group'>
        <label className='btn btn-secondary'>
        <input onChange={handleChange('photo')}  type='file' name='photo' accept='image/*' />
        </label>
        </div>

        <div className='form-group'>
        <input type='text' onChange={handleChange('name')} placeholder='name'  className='form-control' value={name} />
        </div>

        <div className='form-group'>
        <input type='text' onChange={handleChange('description')} placeholder='description' className='form-control' value={description} />
        </div>

        <div className='form-group'>
        <input type='number' onChange={handleChange('price')} placeholder='price' className='form-control' value={price} />
        </div>

        <div className='form-group'>
        
        <select onChange={handleChange('category')} className='form-control'>
        <option>Select Category</option>
        {categories && categories.map((c,i) => (
            <option key={i} value={c._id}>
            {c.name}
            </option>
        ))}
        </select>
        </div>

        <button className='btn btn-dark'>Create Product</button>
        </form>
        </div>
    )

    const showError = () => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
        {error}
        </div>
    )

    const showSuccess = () => (
        <div className='alert alert-success' style={{display: success ? '' : 'none'}}>
        {`${name}`} is Created!
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className='alert alert-success'>
            loading ...
            </div>
        )
    ) 

    return(
        <div>
        <InputPopup icon='shopping-bag' title='Create Product' input={newPostForm()} target='productModel'/>
        </div>
    )
}

export default CreateProduct
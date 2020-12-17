import React,{ useState } from 'react'
import { isAuthenticated } from '../../../ScreenApi'
import { createCategory } from '../../ApiDashboard'
import InputPopup from '../../DashboardCard/InputPopup'

const CreateCategory = () => {

    const [values , setValues] = useState({
        name: '',
        error: false,
        success: false,
        loading: false
    })

    const {name , error, loading ,success} = values

    const {user , token} = isAuthenticated()

    const handleChange = e => {
        setValues({...values, name: e.target.value })
    }
    const clickSubmit = e => {
        e.preventDefault()
        setValues({...values, loading: true})
        createCategory(user._id, token , {name}).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values, loading: false , success: true})
            }
        })
    }

    const newCategoryForm = () => (
        <div>
        {showSuccess()}
        {showError()}
        {showLoading()}
        <form onSubmit={clickSubmit}>
        <div className='form-group'>
        <label className='text-muted'>Category Name</label>
        <input type='text' className='form-control' placeholder='enter category name' value={name} autofocus required onChange={handleChange} />
        </div>
        <button className='btn btn-dark'>Create Category</button>
        </form>
        </div>
    )

    const showSuccess = () => (
        success ? <div className='alert alert-success'>{name} category is created!</div> : ''
    )

    const showError = () => (
        error ? <div className='alert alert-danger'>{error}</div> : ''
    )

    const showLoading = () => (
        loading ? <div className='alert alert-info'>Loading...</div> : ''
    )

    return(
        <div>
            <InputPopup icon='th-large' title='Create Category' input={newCategoryForm()} target='categoryModel' />
        </div>
    )
}

export default CreateCategory
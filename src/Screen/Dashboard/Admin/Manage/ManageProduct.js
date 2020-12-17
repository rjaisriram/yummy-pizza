import React,{useEffect , useState} from 'react'
import { isAuthenticated } from "../../../ScreenApi";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../ApiDashboard";
import {API} from '../../../../config'

import './ManageProduct.css'

const ManageProduct = () => {
    const [products , setProducts] = useState([]);
    const {user , token} = isAuthenticated()

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error);
            }else{ 
                setProducts(data)
            }
        })
    }

    const destroy = (productId , name) => {
        deleteProduct(productId , user._id , token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                alert(`${name} is deleted successfully!`)
                window.location.reload()
            }
        })
    }

    useEffect(() => {
        loadProducts();
    },[])

    const showProducts = () => (
        <div >
        {products.map(( p ,i) => (
        <div className="manage-product_box" key={i}>
        <img className="manage-product_image" src={`${API}/product/photo/${p._id}`} alt={p.name} />
        <h2 className="manage-product_name">{p.name}</h2>
        <div className="manage-product_edit-box">
        <h6  className="manage-product_delete" onClick={() => destroy(p._id , p.name)}><i className='fas fa-trash' /> Delete</h6>
        <Link to={`/admin/product/update/${p._id}`} className='manage-product_update'><i className="fas fa-pen" /> Update</Link>
        </div>
        
        </div>
        ))}
        </div>
    )

    return (
        <div className="screen-container manage-product_container">
            <h1 className="manage-product_title">Total products available: {products.length}</h1>
            <hr />
            {showProducts()}
        </div>
    )
}

export default ManageProduct

import React,{useState, useEffect} from 'react'

import {getVegPizza, getNonVegPizza, getBeverages,getSides} from '../ScreenApi'
import './Product.css'
import Card from '../../components/Card/Product/ProductCard'

const Product = () => {

    const [vegPizza , setVegPizza] = useState({
        categorys: '',
        vegProducts: [] 
    })
    const [nonVegPizza, setNonVegPizza] = useState([])
    const [beverage, setBeverages] = useState([]) 
    const [sides , setSides] = useState([])

    const {categorys, vegProducts} = vegPizza

    const nonVegPizzas = () => {
        getNonVegPizza('non-veg-pizza').then(data => {
            if(data.error){
                console.log(data.error);
            }else {
                setNonVegPizza(data.products)
            }
        })
    }

    const vegPizzas = () => {
        getVegPizza('veg-pizza').then(data => {
            if(data.error){
                console.log(data.error);
            }else {
                setVegPizza({...vegPizza, category: data.category, vegProducts: data.products})
            }
        })
    }

    const side = () => {
        getSides('sides').then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setSides(data.products)
            }
        })
    }

    const beverages = () => {
        getBeverages('beverages').then(data => {
            if(data.error){
                console.log(data.error);
            }else {
                setBeverages(data.products)
            }
        })
    }

    useEffect(()=>{
        vegPizzas()
        nonVegPizzas()
        beverages()
        side()
    },[])
 
    return (
        <div className="Product-container">
        <h2 className='Product-title mb-5'><span>Veg</span> pizza's</h2>
        <section id='Product-box'>
        {vegProducts.map((product, i)=> (
            <div key={i} >
                <Card product={product} />
            </div> 
        ))} 
        </section>
        <h2 className='Product-title mb-5'><span>Non-Veg</span> pizza's</h2>
        <section id='Product-box'>
        {nonVegPizza.map((product, i)=> (
            <div key={i} >
                <Card product={product} />
            </div> 
        ))}
        </section>
        <h2 className='Product-title mb-5'><span>Pasta</span> & Burger's</h2>
        <section id='Product-box'>
        {sides.map((product, i)=> (
            <div key={i} >
                <Card product={product} />
            </div> 
        ))}
        </section>
        <h2 className='Product-title mb-5'><span>Beve</span>rage's</h2>
        <section id='Product-box'>
        {beverage.map((product, i)=> (
            <div key={i} >
                <Card product={product} />
            </div> 
        ))}
        </section>
        </div>
    )
}

export default Product
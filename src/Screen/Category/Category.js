import React,{useState , useEffect} from 'react'
import {getNonVegPizza,getVegPizza, getBeverages, getSides } from '../ScreenApi'
import Card from '../../components/Card/Product/ProductCard'

const Category = ({ match }) => {

    const [vegPizza , setVegPizza] = useState([])
    const [nonVegPizza , setNonVegPizza] = useState([])
    const [beverage , setBeverage] = useState([])
    const [side , setSide] = useState([])

    console.log(match.params.category);

    const nonVegPizzas = () => {
        getNonVegPizza('non-veg-pizza').then(data => {
            if(data.error){
                console.error(data.error)
            }else {
                setNonVegPizza(data.products)
            }
        })
    }

    const vegPizzas = () => {
        getVegPizza('veg-pizza').then(data => {
            if(data.error){
                console.error(data.error)
            }else {
                setVegPizza(data.products)
            }
        })
    }

    const beverages = () => {
        getBeverages('beverages').then(data => {
            if(data.error){
                console.error(data.error)
            }else {
                setBeverage(data.products)
            }
        })
    }

    const pastaBurger = () => {
        getSides('sides').then(data => {
            if(data.error){
                console.error(data.error)
            }else {
                setSide(data.products)
            }
        })
    }

    useEffect(() => {
        vegPizzas()
        nonVegPizzas()
        beverages()
        pastaBurger()
    },[])

    return (
        <div className="Product-container">
        {match.params.category === 'veg-pizza' ? 
            (
                <>
                <h2 className='Product-title mb-5'><span>Veg</span> pizza's</h2>
        <section id='Product-box'>
        {vegPizza.map((product, i)=> (
            <div key={i} >
                <Card product={product} />
            </div> 
        ))} 
        </section>
        </>
        ) : match.params.category === 'non-veg-pizza' ?
        (
            <>
            <h2 className='Product-title mb-5'><span>Non-Veg</span> pizza's</h2>
        <section id='Product-box'>
        {nonVegPizza.map((product, i)=> (
            <div key={i} >
                <Card product={product} />
            </div> 
        ))}
        </section>
        </>
        ) : match.params.category === 'beverage' ?
        (
            <>
            <h2 className='Product-title mb-5'><span>Beve</span>rage's</h2>
        <section id='Product-box'>
        {beverage.map((product, i)=> (
            <div key={i} >
                <Card product={product} />
            </div> 
        ))}
        </section>
        </>
        )
        :match.params.category == 'pasta-burger' ?
        (
            <>
            <h2 className='Product-title mb-5'><span>Pasta</span> & Burger's</h2>
        <section id='Product-box'>
        {side.map((product, i)=> (
            <div key={i} >
                <Card product={product} />
            </div> 
        ))}
        </section>
        </>
        ) : ''
        }
        </div>
    )
}

export default Category

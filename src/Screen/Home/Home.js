import React from 'react'
import { Link } from 'react-router-dom'

import './Home.css'
 
const Home = () => {
    return (
        <>
        <div className='screen-container'>
            <header className='yellow-color home-hero_container'>
            <div id='home-hero_text-container'>
            <h1 className='home-hero_title'>
            <span>Yummy</span> Pizza
            </h1>
            <p className='home-hero_description'>
            We deliver Yummy pizza's at your doorstep in and around Neyveli within 20-30 minutes.
            </p>
            <Link to='order-online' className='btn button_color home-hero_button'>Order Online</Link>
            </div>
            <div id='home-hero_image-container'>
            <img src={require('./Images/hero.png')} alt='hero-image' className='home-hero_image' />
            </div> 
            </header>

            <h2 className='home-category_title title-font-size'>Our Category's</h2>
            <section id='home-category_container'>
            <div className='home-category_image-box'>
            <img src={require('./Images/veg-pizza-min.png')} alt='veg-category' className='home-category_image' />
            <div className='home-category_image-overlay'>
                <Link to='/order/veg-pizza' className='home-category-button'>Veg Pizza</Link>
            </div>
            </div>
            <div className='home-category_image-box'>
            <img src={require('./Images/non-veg-pizza-min.png')} alt='veg-category' className='home-category_image' />
            <div className='home-category_image-overlay'>
                <Link to='/order/non-veg-pizza' className='home-category-button'>Non-Veg Pizza</Link>
            </div>
            </div>
            <div className='home-category_image-box'>
            <img src={require('./Images/pasta-burger.png')} alt='veg-category' className='home-category_image' />
            <div className='home-category_image-overlay'>
                <Link to='/order/pasta-burger' className='home-category-button'>Pasta & burger's</Link>
            </div>
            </div>
            <div className='home-category_image-box'>
            <img src={require('./Images/beverage.png')} alt='veg-category' className='home-category_image' />
            <div className='home-category_image-overlay'>
                <Link to='/order/beverage' className='home-category-button'>sides</Link>
            </div>
            </div>
            </section>

        </div>
        <section id='home-cta'>
                <h2 className='home-cta_title'>
                Book our restaurant for birthday and special events.
                </h2>
                <Link to='event-booking' className='button_color home-cta_button'>Book now</Link>
            </section>
        </>
    )
}

export default Home

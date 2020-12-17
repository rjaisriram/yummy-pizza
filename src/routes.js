import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ScrollToTop from './scroll-top/scroll-top'

import AdminRoute from './components/AuthMiddleware/AdminRoutes'
import {PrivateRoute} from './components/AuthMiddleware/PrivateRoutes'
import Home from './Screen/Home/Home'
import Product from './Screen/Product/Product'
import SignIn from './Screen/Auth/Signin'
import SignUp from './Screen/Auth/Signup'
import Contact from './Screen/Contact/Contact'
import AdminDashboard from './Screen/Dashboard/Admin/Admin'
import Cart from './Screen/Cart/Cart'
import Checkout from './Screen/Checkout/Checkout';
import ManageProducts from './Screen/Dashboard/Admin/Manage/ManageProduct'
import Profile from './Screen/Profile/Profile';
import ClientDashboard from './Screen/Dashboard/Client/ClientDashboard';
import Category from './Screen/Category/Category';
import Update from './Screen/Dashboard/Admin/Update/Update';
import EventBookings from './Screen/Event/Event';
import AccountActivation from './Screen/Auth/AccountActivation';
import ForgotPassword from './Screen/Auth/ForgotPassword';
import ResetPassword from './Screen/Auth/ResetPassword';

const Routes = () => {

    return(
        <BrowserRouter>
            <Switch>
            <ScrollToTop>
            <div className="Layout-Backdrop" />
            <PrivateRoute path="/manage-product" exact component={ManageProducts} />
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/auth/password/reset/:passwordId" exact component={ResetPassword} />
            <PrivateRoute path="/forgot-password" exact component={ForgotPassword} />
            <PrivateRoute path="/auth/account/activation/:tokenId" exact component={AccountActivation} />
            <PrivateRoute path='/order-online' exact component={Product} />
            <PrivateRoute path='/checkout' exact component={Checkout} />
            <PrivateRoute path='/cart' exact component={Cart} />
            <PrivateRoute path='/order/:category' component={Category} />
            <PrivateRoute path='/order-history' component={ClientDashboard} />
            <PrivateRoute path='/profile-update/:userId' exact component={Profile} />
            <Route path="/signin" exact component={SignIn} />
            <PrivateRoute path="/contact" exact component={Contact} />
            <PrivateRoute path="/event-booking" exact component={EventBookings} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path='/admin/product/update/:productId' exact component={Update} />
            <AdminRoute path="/admin" exact component={AdminDashboard} />
            </ScrollToTop>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
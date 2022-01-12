import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header/Header';
import PopularDish from './Popular/PopularDish';
import Locality from './Locality/Locality';
import AppSection from './AppSection/AppSection';
import Footer from './Footer';
import Listing from './Listing/Listing';
import RestDetails from './Details/RestDetails';
import PlaceOrder from './Booking/PlaceOrder';
import ViewApi from './Booking/ViewApi';
import Login from './User/Login';
import Register from './User/Register';
import Profile from './Profile/Profile';

const Routing = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Route exact path="/" component={PopularDish} />
            <Route path="/list/:id" component={Listing} />
            <Route path="/details/:id" component={RestDetails}></Route>
            <Route path="/placeorder/:restName" component={PlaceOrder}></Route>
            <Route path="/viewbooking" component={ViewApi}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Locality/>
            <AppSection/>
            <Footer/>
        </BrowserRouter>
    )
}
export default Routing;
import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';
import {withRouter} from 'react-router-dom';

const locationUrl = "https://xhomato.herokuapp.com/location";
const restUrl = "https://xhomato.herokuapp.com/restaurant?state=";

class Header extends React.Component {
    //first construtor get called
    constructor() {
        super();
        this.state = {
            locations:'',
            restaurants:''
        }
    }

    renderCity = (data) => {
        if(data){
            return data.map((item) => {
                return (
                    <option key={item.location_id} value={item.state_id}>{item.state}</option>
                )
            })
        }
    }
    renderRestaurants = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <option key={item.restaurant_id} value={item.state_id}>
                        {item.restaurant_name} | {item.address}
                    </option>
                )
            })
        }
    }

    handleRest = (event) => {
        fetch(`${restUrl}${event.target.value}`, {method: 'GET'})
        .then((res)=> res.json())
        .then((data)=>{
            this.setState({restaurants:data})
        })
    }
    handleDetails = (event) => {
        //default props are not available with child 
        //we have to import {withRouter} from 'react-router-dom';
        //and then export default withRouter(Header);
        console.log(">>>>>", this.props);
        this.props.history.push(`/details/${event.target.value}`)
    }
    logout = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("name", "");
        localStorage.setItem("email", "");
        localStorage.setItem("phone", "");
    }
    //second render get called
    render(){
       
        return(
            <section className="header-section img-fluid">
                <header>
                    <div className="container">
                    <nav class="navbar navbar-expand-lg">
                        <div class="container-fluid">
                            <Link to="/" class="navbar-brand main-logo home">
                                e!
                            </Link>
                            <button class="navbar-toggler menu-icon" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                                aria-expanded="false" aria-label="Toggle navigation">
                                <i class="fas fa-bars"></i>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    
                                </ul>
                                <div className="user">
                                    {localStorage.getItem('token') == "" ?
                                        <div>
                                            <span>
                                                <Link to="/login">Log In</Link>
                                            </span>
                                            <span>
                                                <Link to="/register">Sign Up</Link>
                                            </span>
                                        </div>  :
                                        <div>
                                            <span>
                                                <Link to="/profile">Hi {localStorage.getItem('name')}</Link>
                                            </span>
                                            <span>
                                                <Link to="/" onClick={this.logout}>Logout</Link>
                                            </span>
                                        </div>
                                    } 
                                </div>
                            </div>
                        </div>
                        </nav>
                        <div className="bottom-content">
                            <div className="content">
                                <h1>Zomato</h1>
                                <h3>Discover the best foods and drinks in your area</h3>
                                <div className="search">
                                    <div className="select-box">
                                        <select className="select-area" id="locations" onChange={this.handleRest}>
                                            <option value="0" key="0" selected disabled>Select Your Area</option>
                                            {this.renderCity(this.state.locations)}
                                        </select>
                                        <div className="icon" style={{color: '#f57082'}}>
                                            <i className="fas fa-map-marker-alt"></i>
                                        </div>
                                    </div>
                                    <div className="search-box">
                                        <select className="select-dish" onChange={this.handleDetails}>
                                            <option value="0" key="0" selected disabled>Select Restaurant</option>
                                            {this.renderRestaurants(this.state.restaurants)}
                                        </select>
                                        <div className="vertical-line"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </section>
        )
    }

    //on page load api
    //third componentDidMount get called
    componentDidMount(){    
        fetch(locationUrl, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({locations:data})
        })
    }
}
export default withRouter(Header);
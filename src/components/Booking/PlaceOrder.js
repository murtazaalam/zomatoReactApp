import React from 'react';
import './placeOrder.css';

const menuUrl = "https://xhomato.herokuapp.com/menuItem";
const placeOrderUrl = "https://xhomato.herokuapp.com/placeOrder";

class PlaceOrder extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            id:Math.floor(Math.random()*100000),
            rest_name:this.props.match.params.restName,
            name:localStorage.getItem("name")?localStorage.getItem("name"):'',
            phone:localStorage.getItem("phone")?localStorage.getItem("phone"):'',
            email:localStorage.getItem("email")?localStorage.getItem("email"):'',
            cost:0,
            address:'',
            menuItems:''
        }
    }
    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
        document.getElementById(event.target.id).style.borderColor = '#ced4da';
        if(event.target.value == ""){
            document.getElementById(event.target.id).style.borderColor = 'red';
        }
    }
    validateForm = (e) => {
        e.preventDefault();
    }
    handleSubmit = () => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var obj = this.state;
        obj.details = sessionStorage.getItem('menu');
        var validate = true;
        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("email").value;
        var addr = document.getElementById("addr").value;
        document.getElementById("email").style.borderColor = "#ced4da";
        document.getElementById("phone").style.borderColor = "#ced4da";
        var redirect;
        if(name == "" || addr == ""){
            validate = false;
        }
        if(!email.match(mailformat)){
            validate = false;
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("email").focus = true;
        }
        if(phone.length != 10){
            validate = false;
            document.getElementById("phone").style.borderColor = "red";
            document.getElementById("phone").focus = true;
        }
        if(validate){
            fetch(placeOrderUrl, {
                method:'POST',
                headers:{
                    'accept':'application/json',
                    'content-type': 'application/json'
                },
                body:JSON.stringify(obj)
            })
            // .then(this.props.history.push('/viewbooking'))
            .then(()=>{
                delete obj.menuItems;
                console.log("Going for payment.");
            })
        }
    }
    renderItems = (data) => {
        if(data){
            return data.map((item, index) => {
                return (
                    <div className="order-item" key={index}>
                        <div className="image-box">
                            <img src={item.img} alt={item.name} className="img-fluid item-image" />
                        </div>
                        <h4>{item.name}</h4>
                    </div>
                )
            })
        }
    }
    render() {
        return (
            <div className="container">
                <div className="card border-success order-form">
                    <div className="card-header  border-success header-txt">
                        Place Order
                    </div>
                    <div className="card-body">
                        <form action={localStorage.getItem('token') ? `http://xompay.herokuapp.com/paynow` : `http://localhost:3000/login` }
                         method={localStorage.getItem('token') ? 'POST' : 'GET'}>
                            <p className="error" id="error"></p>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" name="name" value={this.state.name} 
                                            onChange={this.handleChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" value={this.state.email} 
                                            onChange={this.handleChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Phone</label>
                                        <input type="number" className="form-control" min="1000000000" max="9999999999" id="phone" 
                                        name="phone" value={this.state.phone} onChange={this.handleChange} required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control" id="addr" name="address" value={this.state.address} 
                                            onChange={this.handleChange} required/>
                                    </div>
                                </div>
                            </div>
                            <div className="item-box">
                                {this.renderItems(this.state.menuItems)}
                            </div>
                            <input type="hidden" name="cost" value={this.state.cost} />
                            <input type="hidden" name="id" value={this.state.id} />
                            <input type="hidden" name="rest_name" value={this.state.rest_name} />
                            <div className="order-aria">
                                <p><span className="price-txt">Total price : </span>
                                    <i className="fas fa-rupee-sign"></i>
                                    <b style={{fontSize: '19px', marginLeft: '3px'}}>{this.state.cost}</b>
                                </p>
                                <button className="btn btn-success" onClick={this.handleSubmit} type="submit">
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        let menuItems = sessionStorage.getItem("menu");
        let menuIds = [];
        menuItems.split(',').map((item) => {
            menuIds.push(parseInt(item))
            return 'Ok';
        })
        fetch(menuUrl, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }, 
            body:JSON.stringify(menuIds)
        })
        .then((res) => res.json())
        .then((data) => {
            let menuDetails = [];
            let totalPrice = 0;
            data.map((item) => {
                var myObj = {};
                totalPrice = totalPrice + parseInt(item.menu_price);
                myObj.name = item.menu_name;
                myObj.img = item.menu_image;
                menuDetails.push(myObj);
                return 'Ok';
            })
            this.setState({cost:totalPrice, menuItems:menuDetails})
        })
    }
}
export default PlaceOrder;
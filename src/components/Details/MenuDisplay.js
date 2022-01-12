import React from 'react';
import './details.css';

class MenuDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    orderId = [];
    addItem = (id) => {
        this.orderId.push(`${id}`);
        this.props.finalOrder(this.orderId);
    }
    removeItem = (id) => {
        if(this.orderId.indexOf(id.toString()) != -1) {
            this.orderId.splice(this.orderId.indexOf(id.toString()), 1)
        }
        this.props.finalOrder(this.orderId);
    }
    renderCart = (orders) => {
        if(orders){
            return orders.map((item, index) => {
                return (
                    <span key={index}>{item}&nbsp;&nbsp;</span>
                )
            })
        }
    }
    renderMenu = ({menuData}) => {
        if(menuData){
            return menuData.map((item) => {
                return (
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" key={item.menu_id}>
                        <div className="menu-card">
                            <div>
                                {item.menu_type == "vegetarian" ? 
                                <div className="menu-type" style={{background: 'green'}}></div> : 
                                <div className="menu-type" style={{background: 'red'}}></div>}
                            </div>
                            <div>
                                <img src={item.menu_image} class="img-fluid menu-img" alt={item.menu_name} />
                                <div className="card-content">
                                    <h5>
                                        <span className="menu-id">{item.menu_id}.</span>
                                        {item.menu_name}-<span className="rupee">
                                        <i className="fas fa-rupee-sign"></i></span>
                                        {item.menu_price}
                                    </h5>
                                    <p>
                                        {item.description}
                                    </p>
                                </div>
                                <div className="card-footr">
                                    <div className="btn-aria">
                                        <div>
                                            <button type="button" className="btn btn-primary btn-sm plus" 
                                                onClick={() => {this.addItem(item.menu_id)}}>
                                                <i className="fa fa-plus"></i>
                                            </button>
                                            <button type="button" className="btn btn-danger btn-sm"
                                                onClick={() => {this.removeItem(item.menu_id)}}>
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        return(
            <>
                <div className="col-md-12">
                    <h5>Menu Item</h5>
                    Item Number : {this.renderCart(this.orderId)} 
                </div>
                <div className="row">
                    {this.renderMenu(this.props)}
                </div>
            </>
        )
    }
}
export default MenuDisplay;
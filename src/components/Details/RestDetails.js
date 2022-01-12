import React from "react";
import './details.css';
import axios from "axios";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MenuList from './MenuDisplay';

const url = "https://xhomato.herokuapp.com/restaurant";
const menuUrl = "http://xhomato.herokuapp.com/menu";

class RestDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            details:'',
            menuList:'',
            userItem:''
        }
    }

    addToCart = (data) => {
        this.setState({
            userItem:data
        })
    }

    proceed = () => {
        sessionStorage.setItem('menu', this.state.userItem);
        this.props.history.push(`/placeorder/${this.state.details.restaurant_name}`)
    }
    goBack = () => {
        this.props.history.goBack();
    }
    render() {

        //let details = this.state.details;
        //if both side has same variable
        let {details} = this.state;

        var restName = details.restaurant_name
        if(restName){
            restName = restName.replace(/\s+/g, '');
        }
        
        return(
            <>
                <div>
                    <div className="container">
                        <div className="inner-container">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <img src={details.restaurant_thumb} className="img-fluid main-image"/>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <div>
                                        <h2>{details.restaurant_name}</h2>
                                        <p className="rating-box">
                                            {details.average_rating < 3 ? 
                                                <div>
                                                    <span className="rating-value" style={{background:'red'}}>
                                                        {details.average_rating}
                                                    </span>
                                                    <span style={{color:'red',fontWeight: '600'}}>{details.rating_text}</span>
                                                </div>
                                                :
                                                <div>
                                                    <span className="rating-value" style={{background:'green'}}>
                                                        {details.average_rating}
                                                    </span>
                                                    <span style={{color:'green', fontWeight: '600'}}>{details.rating_text}</span>
                                                </div>
                                            }
                                        </p>
                                        <p>
                                            <span className="cost-txt">Cost : </span>
                                            <span>
                                                <span className="rupee"><i className="fa fa-rupee-sign"></i></span>
                                                <span className="cost-value">{details.cost}</span>
                                            </span>
                                        </p>
                                        <div>
                                            {details.image_gallery &&
                                            <div class="wrapper">
                                                <div class="carousel owl-carousel">
                                                    <div class="revw">
                                                        <div class="info">
                                                            <div class="img">
                                                                <img src={details.image_gallery[0]} 
                                                                className="img-fluid carusel-img" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="revw">
                                                        <div class="info">
                                                            <div class="img">
                                                                <img src={details.image_gallery[1]}
                                                                className="img-fluid carusel-img" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="revw">
                                                        <div class="info">
                                                            <div class="img">
                                                                <img src={details.image_gallery[2]} 
                                                                className="img-fluid carusel-img" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="revw">
                                                        <div class="info">
                                                            <div class="img">
                                                                <img src={details?.image_gallery[3]}
                                                                className="img-fluid carusel-img" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                        </div>
                                        <div>
                                            <button type="button" class="btn btn-danger" onClick={this.goBack}>Back</button>
                                            <button type="button" class="btn btn-primary" style={{marginLeft: '8px'}} 
                                                onClick={this.proceed}>
                                                Checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Tabs>
                                <TabList>
                                    <Tab>Details</Tab>
                                    <Tab>Contact</Tab>
                                    <Tab>Menu</Tab>
                                </TabList>
                                <TabPanel>
                                    <h5>{details.restaurant_name}</h5>
                                    <p>
                                        <b>{details.restaurant_name}</b> is simply dummy text of the printing and typesetting industry. 
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                                        printer took a galley of type and scrambled it to make a type specimen book. It has survived
                                        not only five centuries, but also the leap into electronic typesetting, remaining essentially
                                        unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                                        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                                        including versions of Lorem Ipsum.
                                    </p>
                                </TabPanel>
                                <TabPanel>
                                    <div>
                                        <h5 className="address">Address: </h5>
                                        <span>{details.address}</span>
                                    </div>
                                    <div>
                                        <h5 className="address">Mobile: </h5>
                                        <span>+91 9875463210</span>
                                    </div>
                                    <div>
                                        <h5 className="address">Email: </h5>
                                        <span className="email">{restName}@gmail.com</span>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <MenuList menuData={this.state.menuList} 
                                    finalOrder={(data) => this.addToCart(data)}/>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    //another way of calling api
    async componentDidMount(){
        const restId = this.props.match.params.id;
        const response = await axios.get(`${url}/${restId}`)
        const menuResponse = await axios.get(`${menuUrl}/${restId}`)
        this.setState({details:response.data[0], menuList:menuResponse.data})
    }
}
export default RestDetails;
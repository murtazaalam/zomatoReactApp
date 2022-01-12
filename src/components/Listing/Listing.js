import React from 'react';
import ListingDisplay from './ListingDisplay';
import './Listing.css';
import axios from 'axios';
import CusineFilter from '../Filters/CuisineFilter';
import CostFilter from '../Filters/CostFilter';
import SortFilter from '../Filters/SortFilter';
import {Link} from 'react-router-dom';

const url = "https://xhomato.herokuapp.com/pagination";

class Listing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restList:'',
            skip:'',
            limit:3,
            totalMeal:''

        }
    }
    setDataPerFilter = (data) => {
        this.setState({restList:data});
        document.getElementById("pagination").style.display = "none";
    }
    changePage = (event,lValue, sValue) => {
        const mealId = this.props.match.params.id;
        axios.get(`${url}/${mealId}?limit_value=${lValue}&skip_value=${sValue}`)
        .then((response) => {
            this.setState({restList:response.data})
        })
        document.getElementById(event.target.id).classList.add("active");
        for(var i = 0; i < Math.ceil(this.state.totalMeal/3); i++){
            if(`page-${i+1}` != event.target.id){
                document.getElementById(`page-${i+1}`).classList.remove("active");
            }
        }
    }
    renderPage = () => {
        <li id="page-2" onClick={(id) => this.changePage(id,'3','3')}>
            2
        </li>
    }
    render() {
        return (
            <section class="breakfast-mumbai">
                <div class="main-container">
                    <div class="content">
                        <div class="options">
                            <div style={{position: 'relative'}}>
                                <div class="filter">
                                    <div>
                                        <h3>Filters</h3>
                                    </div>
                                    <hr/>
                                </div>
                                <div class="cost-for-two">
                                    <h3>Cost for two</h3>
                                    <CostFilter restPerCost={(data) => {this.setDataPerFilter(data)}}/>
                                </div>
                                <div class="cuisine">
                                    <h3>Cusine</h3>
                                    <CusineFilter mealId={this.props.match.params.id} 
                                        restPerCusine={(data) => {this.setDataPerFilter(data)}}/>
                                </div>
                                <div class="cuisine">
                                    <h3>Sort Filter</h3>
                                    <SortFilter resPerSort={(data) => {this.setDataPerFilter(data)}}/>
                                </div>
                            </div>
                        </div>
                        <div class="option-content">
                            <ListingDisplay restData={this.state.restList}/>
                            <div class="pagination" id="pagination">
                                <ul>
                                    <li class="active" id="page-1" onClick={(id) => this.changePage(id,'3','')}>
                                        1
                                    </li>
                                    {this.state.totalMeal > 3 &&
                                        <li id="page-2" onClick={(id) => this.changePage(id,'3','3')}>
                                            2
                                        </li>
                                    }
                                    {this.state.totalMeal > 6 &&
                                        <li id="page-3" onClick={(id) => this.changePage(id,'3','6')}>
                                            3
                                        </li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    componentDidMount(){
        const mealId = this.props.match.params.id;
        //also we can access mealId by making it global variable
        
        sessionStorage.setItem('mealId',mealId); 
        //second way of calling api
        axios.get(`${url}/${mealId}?limit_value=${this.state.limit}&skip_value=${this.state.skip}`)
        .then((response) => {
            this.setState({restList:response.data})
        })
        axios.get(`${url}/${mealId}`)
        .then((response) => {
            this.setState({totalMeal:response.data.length})
        })
    }
}
export default Listing;
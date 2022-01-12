import React from "react";
import axios from "axios";
import './filters.css';

const url = "https://xhomato.herokuapp.com/filter";

class cusineFilter extends React.Component {
    cusineFilter = (event) => {
        let mealId = this.props.mealId;
        let cusineId = event.target.value;
        let filterUrl;
        if(cusineId == ""){
            filterUrl = `${url}/${mealId}`;
        }
        else{
            filterUrl = `${url}/${mealId}?cuisine=${cusineId}`;
        }
        axios.get(filterUrl).then((res) => {
            this.props.restPerCusine(res.data)
        })
    }
    render() { 
        return(
            <div className="custom-filter" onChange={this.cusineFilter}>
                <label className="radio">
                    <input type="radio" name="cusine" value=""/>All
                </label>
                <label className="radio">
                    <input type="radio" name="cusine" value="1"/>North Indian
                </label>
                <label className="radio">
                    <input type="radio" name="cusine" value="2"/>South Indian
                </label>
                <label className="radio">
                    <input type="radio" name="cusine" value="3"/>Chinese
                </label>
                <label className="radio">
                    <input type="radio" name="cusine" value="4"/>Fast Food
                </label>
                <label className="radio">
                    <input type="radio" name="cusine" value="5"/>Street Food
                </label>
            </div>
        )
    }
}
export default cusineFilter;
import React from 'react';
import axios from 'axios';

const url = "https://xhomato.herokuapp.com/filter";

class SortFilter extends React.Component{
    sortFilter = (event) => {
        let mealId = sessionStorage.getItem('mealId');
        let sortKey = event.target.value;
        axios.get(`${url}/${mealId}?sortKey=${sortKey}`).then((res) => {
            this.props.resPerSort(res.data)
        })
    }
    render() {
        return (
            <div className="custom-filter" onChange={this.sortFilter}>
                <label className="radio">
                    <input type="radio" name="cusine" value="1"/>Low to High
                </label>
                <label className="radio">
                    <input type="radio" name="cusine" value="-1"/>High to Low
                </label>
            </div>
        )
    }
}
export default SortFilter;
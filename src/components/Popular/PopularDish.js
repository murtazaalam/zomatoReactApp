import React from 'react';
import PopularDisplay from './PopularDisplay'
import './popular.css';

const mealTypeUrl = "https://xhomato.herokuapp.com/mealType";
class PopularDish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mealType:''
        }
    }
    render() {
        return (
            <>
                <section className="popular-dishes">
                    <div className="container">
                        <div className="coupon-applied" id="couponAppliedArea">
                            <span><i className="fas fa-check-circle"></i></span>
                            <p id="couponApplied"></p> 
                        </div>
                        <h2>Popular Dishes</h2>
                        <div className="row">
                            <PopularDisplay popularData={this.state.mealType}/>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    componentDidMount(){
        fetch(mealTypeUrl, {method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({mealType:data})
        })
    }
}
export default PopularDish;
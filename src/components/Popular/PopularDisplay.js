import React from 'react';
import {Link} from 'react-router-dom';
import './popular.css';

const PopularDisplay = (props) => {

    const renderMeal = ({popularData}) => {
        if(popularData){
            return popularData.map((item) => {
                return(
                    <div className="col-lg-4 col-md-6 col-sm-12 dishes">
                        <div className="dish-item">
                            <div className="header d-flex">
                                <div className="popular-image">
                                    <img src={item.meal_image} className="f-image"/>
                                </div>
                                <div className="description">
                                    <h4 className="heading">{item.mealtype}</h4>
                                    <p className="desc">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                            <div className="footer">
                                <Link to={`list/${item.mealtype_id}`} key={item.mealtype_id} className="">
                                    Show More
                                </Link>
                            </div>
                        </div>     
                    </div>
                )
            })
        }

    }

    return(
        <>
            {renderMeal(props)}
            
        </>
    )
}
export default PopularDisplay;
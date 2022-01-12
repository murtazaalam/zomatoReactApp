import React from 'react';
import {Link} from 'react-router-dom';

const ListingDisplay = (props) => {

    const renderData = ({restData}) => {
        if(restData){
            if(restData.length > 0){
                return restData.map((item) => {
                    return (
                        <>
                            <div class="content-card" key={item._id}>
                                <div class="card-header">
                                    <div>
                                        <img src={item.restaurant_thumb} class="image img-fluid"/>
                                    </div>
                                    <div class="description">
                                        <h3 class="description-header">{item.restaurant_name}</h3>
                                        <p class="description-content">{item.address}</p>
                                        <span>
                                            <div className="badge bg-primary rounded-pill bg-large">{item.cuisines[0].cuisine_name}</div>
                                            <div className="badge bg-success rounded-pill bg-large" style={{margin: '0 4px'}}>
                                                {item.cuisines[1].cuisine_name}
                                            </div>
                                            <div className="badge bg-danger rounded-pill bg-large" style={{margin: '0 4px 0 0'}}>
                                                {item.mealTypes[0].mealtype_name}
                                            </div>
                                            <div className="badge bg-warning rounded-pill bg-large">{item.mealTypes[1].mealtype_name}</div>
                                        </span>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="column-heading">
                                        <h5 class="rating">
                                            <span>Rating:&nbsp;</span>
                                            <span>{item.average_rating}</span>
                                        </h5>
                                        <span>
                                            <span className="text-per-two">Cost for two:</span>
                                            <span className="price"><i class="fas fa-rupee-sign"></i> {item.cost}</span>
                                        </span>
                                    </div>
                                    <div class="column-content">
                                        <Link to={`/details/${item.restaurant_id}`} className="btn btn-primary">Proceed</Link>                                    
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }
            else{
                return(
                    <div>
                        <center><h4>No Data Found</h4></center>
                    </div>
                )
            }
        }
        else{
            return(
                <div>
                    <img src="/images/loader.gif" className="img-fluid" alt="loader"/>
                </div>
            )
        }
    }
    return (
        <>
            {renderData(props)}
        </>
        
    )
}
export default ListingDisplay;
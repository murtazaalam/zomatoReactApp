import React from 'react';
import axios from 'axios';
import ViewDisplay from './ViewDisplay';

const url = "https://xhomato.herokuapp.com/orders";
const putUrl = "https://xhomato.herokuapp.com/updateStatus"

class ViewApi extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            orders: '',
            status: 'Pending'
        }
    }
    render() {
        if(localStorage.getItem('token') != ""){
            return (
                <ViewDisplay bookData={this.state.orders} />
            )
        }
        else{
            
            return (
                <>
                    {this.props.history.push('/')}
                </>
            )
        }
        
    }
    componentDidMount() {
        if(this.props.location){
            var qparams = this.props.location.search;
            if(qparams){
                var data = {
                    "date": qparams.split('&')[2].split('=')[1],
                    "bank_status": qparams.split('&')[0].split('=')[1],
                    "bank": qparams.split('&')[3].split('=')[1]
                }
                var id = qparams.split('&')[1].split('=')[1].split('_')[1];
                axios.put(`${putUrl}/${id}`, data).then((res)=>{
                    this.setState({status:'Paid'});
                    this.props.history.push('/viewbooking');
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
        axios.get(`${url}?email=${localStorage.getItem('email')}`, {method: 'GET'})
        .then((res) => {
            this.setState({orders: res.data})
        })
    }
}
export default ViewApi;
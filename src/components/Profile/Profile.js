import React from 'react';
import './profile.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

const url = "https://signinup.herokuapp.com/api/auth/user-info";
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:''
        }
    }
    render() {
        if(this.state.user){
            let userData = this.state.user
            return(
                <>
                    <div className="container profile-box">
                        <div className="profile">
                            <div>
                                <div className="abbr-box">
                                    <h3 className="abbr">{userData.name[0]}</h3>
                                </div>
                                <div className="text">
                                    <span className="title">Name : </span>
                                    <span className="title-value">{userData.name}</span>
                                </div>
                                <div className="text">
                                    <span className="title">Email : </span>
                                    <span className="title-value">{userData.email}</span>
                                </div>
                                <div className="text">
                                    <span className="title">Phone : </span>
                                    <span className="title-value">{userData.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        else{
            if(localStorage.getItem("token") == ""){
                this.props.history.push("/");
                return (
                    <>
                    </>
                )
            }
            else{
                return(
                    <div>Loading User Information...</div>
                )
            }
        }
    }
    componentDidMount(){
        axios.get(url, {
            headers:{
                "x-access-token":localStorage.getItem("token")
            }
        }).then((res) => {
            this.setState({user:res.data})
        })
    }
}
export default withRouter(Profile);
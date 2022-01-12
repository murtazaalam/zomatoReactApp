import React from 'react';
import axios from 'axios';
import './user.css';

const url = "https://signinup.herokuapp.com/api/auth/login";
const urlUser = "https://signinup.herokuapp.com/api/auth/user-info";

let validation = true;

class Login extends React.Component {
    checkValue = (event) => {
        var id = event.target.id;
        var index;
        var inputValue = document.getElementById(id).value;
        
        if(id == "lemail"){
            index = 0;
        }
        if(id == "lpassword"){
            index = 1;
        }
        document.getElementsByClassName("lerror")[index].style.display = 'none';
        document.getElementById(id).style.borderColor = "#88797a";
        if(inputValue == ""){
            document.getElementsByClassName("lerror")[index].style.display = 'block';
            document.getElementById(id).style.borderColor = "red";
            validation = false;
        }
        else{
            validation = true;
        }
    }
    showHide = (id) => {
        if(document.getElementById(id).type == "text") {
            document.getElementById(id).type = "password";
        }else{
            document.getElementById(id).type = "text";
        }
    }
    formSubmit = () => {
        var email = document.getElementById("lemail").value;
        var password = document.getElementById("lpassword").value;
        document.getElementById("btn-user").disabled = true;
        document.getElementById("btn-user").style.opacity = "0.5";
        
        if(email == ""){
            document.getElementById("lemail").style.borderColor = "red";
            document.getElementById("lmessg").innerText = "Email or Password can't be blank."
            document.getElementById("lmessg").style.color = "red";
            document.getElementById("btn-user").disabled = false;
            document.getElementById("btn-user").style.opacity = "0.5";
            validation = false;

        }
        if(password == ""){
            document.getElementById("lpassword").style.borderColor = "red";
            document.getElementById("lmessg").innerText = "Email or Password can't be blank.";
            document.getElementById("lmessg").style.color = "red";
            document.getElementById("btn-user").disabled = false;
            document.getElementById("btn-user").style.opacity = "0.5";
            validation = false;
        }
        var data={
            email: email,
            password: password
        }
        if(validation){
            document.getElementById("lmessg").innerText = "";
            axios.post(url, data)
            .then((res) => {
                localStorage.setItem("token",res.data.token);
                document.getElementById("lmessg").innerText = "Logged in Successfully.";
                document.getElementById("lmessg").style.color = "green";
                axios.get(urlUser, {
                    headers:{
                        "x-access-token":res.data.token
                    }
                }).then((result) => {
                    localStorage.setItem("name",result.data.name);
                    localStorage.setItem("email",result.data.email);
                    localStorage.setItem("phone",result.data.phone);
                    document.getElementById("btn-user").disabled = false;
                    document.getElementById("btn-user").style.opacity = "0.5";
                    this.props.history.push("/");
                })
                
            })
            .catch((err) => {
                document.getElementById("lmessg").innerText = err.response.data.token;
                document.getElementById("lmessg").style.color = "red";
                document.getElementById("btn-user").style.opacity = "0.5";
                document.getElementById("btn-user").disabled = false;
            })
        }
    }
    render() {
        return(
            <>
                <div className="container">
                    <div className="signup-modal">
                        <div className="form-aria">
                            <h5>Login</h5>
                            <p id="lmessg" className="messg"></p>
                            <form className="row">
                                <div className="col-md-12 input-area">
                                    <label for="email" className="form-label">EMAIL*</label>
                                    <input type="email" className="form-control" id="lemail"
                                    placeholder="Email" onInput={(id) => this.checkValue(id)} />
                                    <p className="error lerror">Please Enter Your Email</p>
                                </div>
                                <div className="col-md-12 password input-area">
                                    <label for="password" className="form-label">PASSWORD*</label>
                                    <div className="position-relative">
                                        <input type="password" className="form-control" id="lpassword"
                                            placeholder="Password" onInput={(id) => this.checkValue(id)} />
                                        <div className="icon eye-icon" onClick={() => this.showHide('lpassword')}>
                                            <i className="fas fa-eye"></i>
                                        </div>
                                    </div>
                                    <p className="error lerror">Please Enter Your Password</p>
                                </div>
                                <div className="col-md-12">
                                    <button type="button" onClick={this.formSubmit} className="btn-register" id="btn-user">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
export default Login;
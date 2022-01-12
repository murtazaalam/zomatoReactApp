import React from 'react';
import axios from 'axios';
import './user.css';

const url ="https://signinup.herokuapp.com/api/auth/register";

let validation = true;

const Register = () => {
    const checkValue = (event) => {
        var id = event.target.id;
        var index;
        var inputValue = document.getElementById(id).value;
        validation = true;
        document.getElementById("strength").style.display = 'none';
        if(id == "name"){
            index = 0;
        }
        if(id == "phone"){
            index = 1;
        }
        if(id == "email"){
            index = 2;
        }
        if(id == "password"){
            index = 3;
        }
        if(id == "reEnterPassword"){
            index = 4;
        }
        if(inputValue == ""){
    
            document.getElementsByClassName("error")[index].style.display = 'block';
            document.getElementById(id).style.borderColor = "red";
            document.getElementById("strength").style.display = 'none';
            validation = false;
        }
        else{
    
            document.getElementsByClassName("error")[index].style.display = 'none';
            document.getElementById(id).style.borderColor = "#88797a";
    
            if(id == "password"){
                document.getElementById("strength").style.display = 'block';
                var password = document.getElementById(id).value;
                if(password.toString().trim().length < 16){
    
                    if(password.toString().trim().length < 6){
    
                        document.getElementById("stren").innerHTML = "Weak";
                        document.getElementById("stren").style.color = "red";
                        document.getElementById("strenLine").style.backgroundColor = "red";
                    }
                    else if(password.toString().trim().length >= 6 && password.toString().trim().length < 10){
    
                        document.getElementById("stren").innerHTML = "Medium";
                        document.getElementById("stren").style.color = "#ffd35e";
                        document.getElementById("strenLine").style.backgroundColor = "#ffd35e";
    
                    }
                    else if(password.toString().trim().length >= 10 && password.toString().trim().length < 16){
    
                        document.getElementById("stren").innerHTML = "Strong";
                        document.getElementById("stren").style.color = "#3abb1c";
                        document.getElementById("strenLine").style.backgroundColor = "#3abb1c";
    
                    }
                }
    
            }
            else if(id == "reEnterPassword"){
                var password = document.getElementById("password").value;
                var cPassword = document.getElementById(id).value;
                if(password.toString().trim() != cPassword.toString().trim()){
                    document.getElementsByClassName("error")[index].style.display = 'block';
                    document.getElementById("reEnterPassword").style.borderColor = "red";
                    validation = false;
                }
                else{
                    document.getElementById(id).style.borderColor = "#88797a";
                    validation = true;
                }
            }
    
        }
    }
    const showHide = (id) => {
        if(document.getElementById(id).type == "text") {
            document.getElementById(id).type = "password";
        }else{
            document.getElementById(id).type = "text";
        }
    }
    const formSubmit = () => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        document.getElementsByClassName("error")[4].style.display = 'none';

        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var rePassword = document.getElementById("reEnterPassword").value;
        if(name == ""){
            document.getElementsByClassName("error")[0].style.display = 'block';
            document.getElementById("name").style.borderColor = "red";
            validation = false;
        }
        if(phone == ""){
            document.getElementsByClassName("error")[1].style.display = 'block';
            document.getElementById("phone").style.borderColor = "red";
            document.getElementsByClassName("error")[1].innerText = "Please Enter Your Number";
            validation = false;
        }
        if(phone.length > 0 && phone.length != 10){
            document.getElementsByClassName("error")[1].style.display = 'block';
            document.getElementsByClassName("error")[1].innerText = "Invalid Phone Number";
            document.getElementById("phone").style.borderColor = "red";
            validation = false;
        }
        
        if(!email.match(mailformat)){
            if(email == ""){
                document.getElementsByClassName("error")[2].innerText = "Please Enter Your Email";
                document.getElementsByClassName("error")[2].style.display = 'block';
                document.getElementById("email").style.borderColor = "red";
                validation = false;
            }
            else{
                document.getElementsByClassName("error")[2].style.display = 'block';
                document.getElementsByClassName("error")[2].innerText = "Invalid Email";
                document.getElementById("email").style.borderColor = "red";
                validation = false;
            }
        }
        if(password == ""){
            document.getElementsByClassName("error")[3].style.display = 'block';
            document.getElementById("password").style.borderColor = "red";
            validation = false;
        }
        if(password != rePassword){
            document.getElementsByClassName("error")[4].style.display = 'block';
            document.getElementsByClassName("error")[4].innerText = "Password does not match";
            document.getElementById("reEnterPassword").style.borderColor = "red";
            validation = false;
        }
        var data = {
            name:name,
            phone:phone,
            email:email,
            password:password
        }
        if(validation){
            axios.post(url, data).then((res) => {
                if(res.status === 200){
                    document.getElementById("messg").innerText = "Registration Successful.";
                    document.getElementById("messg").style.color = "green";
                    document.getElementById("name").value = "";
                    document.getElementById("phone").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("reEnterPassword").value = "";
                    document.getElementById("strength").style.display = 'none';
                }
            }).catch((err) => {
                document.getElementById("messg").innerText = err.response.data.token;
                document.getElementById("messg").style.color = "red";
            })
        }
    }
    return(
        <>  
            <div className="container">
                <div className="signup-modal">
                    <div className="form-aria">
                        <h5>Register</h5>
                        <p id="messg" className="messg"></p>
                        <form className="row">
                            <div className="col-md-6 input-area">
                                <label for="name" className="form-label">NAME*</label>
                                <input type="text" className="form-control" id="name" minlength="3"
                                placeholder="Name" onInput={(id) => checkValue(id)} />
                                <p className="error">Please Enter Your First Name</p>
                            </div>
                            <div className="col-md-6 input-area">
                                <label for="phone" className="form-label">PHONE*</label>
                                <input type="number" className="form-control" id="phone"
                                placeholder="Phone" onInput={(id) => checkValue(id)} />
                                <p className="error">Please Enter Phone</p>
                            </div>
                            <div className="col-md-6 input-area">
                                <label for="email" className="form-label">EMAIL*</label>
                                <input type="email" className="form-control" id="email"
                                placeholder="Email"onInput={(id) => checkValue(id)} />
                                <p className="error">Please Enter Your Email</p>
                            </div>
                            <div className="col-md-6 password input-area">
                                <label for="password" className="form-label">PASSWORD*</label>
                                <div className="position-relative">
                                    <input type="password" className="form-control" id="password"
                                        placeholder="Password" onInput={(id) => checkValue(id)} />
                                    <div className="icon eye-icon" onClick={() => {showHide('password')}}>
                                        <i className="fas fa-eye"></i>
                                    </div>
                                </div>
                                <p className="error">Please Enter Your Password</p>
                                <div className="strength" id="strength">
                                    <p id="stren">Weak</p>
                                    <div className="stren-line" id="strenLine"></div>
                                </div>
                            </div>
                            <div className="col-md-6 password input-area">
                                <label for="reEnterPassword" className="form-label">RE-ENTER PASSWORD</label>
                                <div className="position-relative">
                                    <input type="password" className="form-control" id="reEnterPassword" 
                                        onInput={(id) => checkValue(id)} placeholder="Re-Enter Password"/>
                                    <div className="icon eye-icon" onClick={() => {showHide('reEnterPassword')}}>
                                        <i className="fas fa-eye"></i>
                                    </div>
                                </div>
                                <p className="error">Password does not match</p>
                            </div>
                            <div className="col-md-12">
                                <button type="button" onClick={formSubmit} className="btn-register">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;
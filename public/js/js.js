var orderId;
var totalPrice;
function coupon(){
    setTimeout(function(){
        document.getElementById("coupon").style.display = "flex";
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        orderId = Math.floor(Math.random()*1000000);
        document.getElementById("orderId").value = `ZMT${orderId}`;
    }, 3000)
    
}
function closeCoupon(){
    document.getElementById("coupon").style.display = "none";
    document.getElementsByTagName("body")[0].style.overflow = "auto";
}
var getCouponCode = (id) => {
    var couponCode = document.getElementById(id).innerText;
    document.getElementById("couponApplied").innerHTML = `Coupon Code ${couponCode} Applied Successfully. Enjoy the Meal!!`;
    document.getElementById("coupon").style.display = "none";
    document.getElementById("couponAppliedArea").style.display = "flex";
    document.getElementsByTagName("body")[0].style.overflow = "auto";
}
var getLocations = () => {
    document.getElementById("top-section").href = "#";
    document.getElementById("top-section").trigger = "click";
    fetch("https://developerfunnel.herokuapp.com/location")
    .then((res) => res.json())
    .then((data) => {
        document.getElementById("body-loader").style.display = "none";
        coupon();
        for(i = 0; i < data.length; i++) {
            var element = document.createElement('option');
            element.value = data[i]._id;
            var textNode = document.createTextNode(data[i].city_name);
            element.appendChild(textNode);
            document.getElementById("locations").appendChild(element);
        }
    })
    
}
var getRestaurant = () => {
    
    var city_name = $("#locations option:selected").text();
    var city_id = $("#locations option:selected").val();
    var hotels = document.getElementById("data");
    while(hotels.options.length>0){
        $("#data").empty();
    }
    fetch(`https://developerfunnel.herokuapp.com/hotels?city=${city_id}`)
    .then((res) => res.json())
    .then((data) => {
        for(i = 0; i < data.length; i++) {
            var element = document.createElement('option');
            var textNode = document.createTextNode(data[i].name+" | "+data[i].city_name);
            element.appendChild(textNode);
            document.getElementById("data").appendChild(element);
        }
    }) 
}
var calculateTotal = () => {
    var quantity = document.getElementById("quantity").value;
    var rate = document.getElementById("rate").innerHTML;
    totalPrice = parseFloat(quantity)*parseFloat(rate);
    document.getElementById("total").innerText = totalPrice.toFixed(2);
}
var getDetail = (id) => {
    var heading = document.getElementsByClassName("heading");
    var itemRate = document.getElementsByClassName("itemRate");
    var image = document.getElementsByClassName("f-image");
    document.getElementById("quantity").value = 1;

    if(id == "breakfast"){
        document.getElementById("rate").innerText = itemRate[0].innerHTML
        document.getElementById("oHeading").innerText = heading[0].innerHTML;
        document.getElementById("total").innerText = itemRate[0].innerHTML;
        document.getElementById("fImage").src = image[0].src;
    }
    else if(id == "lunch"){
        document.getElementById("rate").innerText = itemRate[1].innerHTML
        document.getElementById("oHeading").innerText = heading[1].innerHTML;
        document.getElementById("total").innerText = itemRate[1].innerHTML;
        document.getElementById("fImage").src = image[1].src;
    }
    else if(id == "snacks"){
        document.getElementById("rate").innerText = itemRate[2].innerHTML
        document.getElementById("oHeading").innerText = heading[2].innerHTML;
        document.getElementById("total").innerText = itemRate[2].innerHTML;
        document.getElementById("fImage").src = image[2].src;
    }
    else if(id == "dinner"){
        document.getElementById("rate").innerText = itemRate[3].innerHTML
        document.getElementById("oHeading").innerText = heading[3].innerHTML;
        document.getElementById("total").innerText = itemRate[3].innerHTML;
        document.getElementById("fImage").src = image[3].src;
    }
    else if(id == "drinks"){
        document.getElementById("rate").innerText = itemRate[4].innerHTML
        document.getElementById("oHeading").innerText = heading[4].innerHTML;
        document.getElementById("total").innerText = itemRate[4].innerHTML;
        document.getElementById("fImage").src = image[4].src;
    }
    else if(id == "nightlife"){
        document.getElementById("rate").innerText = itemRate[5].innerHTML
        document.getElementById("oHeading").innerText = heading[5].innerHTML;
        document.getElementById("total").innerText = itemRate[5].innerHTML;
        document.getElementById("fImage").src = image[5].src;

    }
}
$(document).ready(function(){
    $("#orderForm").on("submit", function(e) {
        e.preventDefault();
        var name = $("#name").val();
        var mobile = $("#mobile").val();
        var state = $("#state").val();
        var city = $("#city").val();
        var address = $("#address").val();
        if(name == ""){
            document.getElementById("name").style.borderColor = "red";
            document.getElementById("name").focus();
            document.getElementById("nameError").style.display = "block";
            document.getElementById("nameError").innerText = "Please Enter Your Name";
        } 
        if(mobile == ""){
            document.getElementById("mobile").style.borderColor = "red";
            document.getElementById("mobileError").style.display = "block";
            document.getElementById("mobileError").innerText = "Please Enter Your Mobile";
        }
        if(address == ""){
            document.getElementById("address").style.borderColor = "red";
            document.getElementById("addressError").style.display = "block";
            document.getElementById("addressError").innerText = "Please Enter Your Address";
        }
        if(name != "" && name.length < 3){
            document.getElementById("name").style.borderColor = "red";
            document.getElementById("name").focus();
            document.getElementById("nameError").style.display = "block";
            document.getElementById("nameError").innerText = "Invalid Name Entered";
        }
        if(mobile != "" && mobile.length != 10){
            document.getElementById("mobile").style.borderColor = "red";
            document.getElementById("mobile").focus();
            document.getElementById("mobileError").style.display = "block";
            document.getElementById("mobileError").innerText = "Invalid Mobile Number Entered";
        }
        if(address != "" && address.length < 5){
            document.getElementById("address").style.borderColor = "#ced4da";
            document.getElementById("address").focus();
            document.getElementById("addressError").style.display = "block";
            document.getElementById("addressError").innerText = "Invalid Address Entered";
        }
        if(name.length > 2){
            document.getElementById("name").style.borderColor = "#ced4da";
            document.getElementById("nameError").style.display = "none";
            if(mobile == "" || mobile.length != 10){
                document.getElementById("mobile").focus();
            }else if(address == "" || address.length < 5){
                document.getElementById("address").focus();
            }
        }
        if(mobile.length == 10){
            document.getElementById("mobile").style.borderColor = "#ced4da";
            document.getElementById("mobileError").style.display = "none";
            if(name == "" || name.length < 3){
                document.getElementById("name").focus();
            }else if(address == "" || address.length < 5){
                document.getElementById("address").focus();
            }
        }
        if(address.length > 4){
            document.getElementById("address").style.borderColor = "#ced4da";
            document.getElementById("addressError").style.display = "none";
            if(name == "" || name.length < 3){
                document.getElementById("name").focus();
            }else if(mobile == "" || mobile.length != 10){
                document.getElementById("mobile").focus();
            }
        }
        if(name.length > 2 & mobile.length == 10 & address.length > 4){
            var quantity = document.getElementById("quantity").value;
            if(quantity <= 0){
                document.getElementById("quantity").style.borderColor = "red";
                document.getElementById("quantity").focus();
                document.getElementById("quantityError").style.display = "block";
                document.getElementById("quantityError").innerText = "Invalid";
            }
            else{
                document.getElementById("quantity").style.borderColor = "#ced4da";
                document.getElementById("quantityError").style.display = "none";
            }
        } 
    })
})
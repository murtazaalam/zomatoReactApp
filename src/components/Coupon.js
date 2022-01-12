import React from 'react';

const Coupon = () => {
    return (
        <section className="coupon-section" id="coupon">
            <div className="container d-flex justify-content-center">
                <div className="row main-box">
                    <div className="close">
                        <span onclick="closeCoupon()">
                            <i className="fa fa-times"></i>
                        </span>
                    </div>
                    <h2>Offers<sup>*</sup></h2>
                    <div className="col-md-6 col-md-6 coupon-item">
                        <div className="coupon">
                            <div className="coupon-header">
                                <div className="coupon-img">
                                    <img src="coupon_image/coupon_2.jpg" className="img-fluid"/>
                                </div>
                                <div className="coupon-details">
                                    <div>
                                        <h4>Summer Special</h4>
                                        <span>Coupon code</span>
                                        <div className="code" id="code_1" onclick="getCouponCode(this.id)">
                                            Z2F3C5
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="coupon-footer">
                                <p className="coupon-description">
                                    Coupon is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s... 
                                    <a href="#">Read More</a><br/> 
                                    <a>Terms & Conditions<sup>*</sup></a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 coupon-item">
                        <div className="coupon">
                            <div className="coupon-header">
                                <div className="coupon-img">
                                    <img src="coupon_image/coupon_7.jpg" className="img-fluid"/>
                                </div>
                                <div className="coupon-details">
                                    <div>
                                        <h4 style={{color: '#ff4364'}}>Diwali Offer</h4>
                                        <span>Coupon code</span>
                                        <div className="code" id="code_2" style={{background: '#ff4364'}} onclick="getCouponCode(this.id)">
                                            DIWALI
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="coupon-footer">
                                <p className="coupon-description">
                                    Coupon is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s... 
                                    <a href="#">Read More</a><br/> 
                                    <a>Terms & Conditions<sup>*</sup></a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-md-6 coupon-item">
                        <div className="coupon">
                            <div className="coupon-header">
                                <div className="coupon-img">
                                    <img src="coupon_image/coupon_3.jpg" className="img-fluid"/>
                                </div>
                                <div className="coupon-details">
                                    <div>
                                        <h4 style={{color: '#38070a'}}>First User</h4>
                                        <span>Coupon code</span>
                                        <div className="code" id="code_3" style={{background: '#38070a'}} onclick="getCouponCode(this.id)">
                                            FIRST1
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="coupon-footer">
                                <p className="coupon-description">
                                    Coupon is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s... 
                                    <a href="#">Read More</a><br/> 
                                    <a>Terms & Conditions<sup>*</sup></a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 coupon-item">
                        <div className="coupon">
                            <div className="coupon-header">
                                <div className="coupon-img">
                                    <img src="coupon_image/coupon_6.png" className="img-fluid"/>
                                </div>
                                <div className="coupon-details">
                                    <div>
                                        <h4 style={{color: '#e10065'}}>Summer Special</h4>
                                        <span>Coupon code</span>
                                        <div className="code" id="code_4" style={{background: '#e10065'}} onclick="getCouponCode(this.id)">
                                            Z2F3C5
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="coupon-footer">
                                <p className="coupon-description">
                                    Coupon is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s... 
                                    <a href="#">Read More</a><br/> 
                                    <a>Terms & Conditions<sup>*</sup></a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Coupon;

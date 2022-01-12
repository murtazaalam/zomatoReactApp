
import React from 'react';
import './appSection.css';
const AppSection = () => {
    return (
        <section className="app-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 textAlignRight mobile-image">
                        <img src="https://i.ibb.co/JscJzs2/mobile.jpg" alt="mobile image" width="300"/>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 content">
                        <h1>Get the Zomato App</h1>
                        <p>we will send you a link, open it on your phone to download the app</p>
                        <div className="radio-btn">
                            <div className="form-check">
                                <input type="radio" className="form-check-input"/>
                                <label className="form-check-label">Email</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input"/>
                                <label className="form-check-label">Phone</label>
                            </div>
                        </div>
                        <div className="form form-group">
                            <input type="text" className="form-control" placeholder="Email" style={{borderRadius: '8px'}}/>
                            <button type="submit" className="btn btn-danger mobile-btn">Share</button>
                            <button type="submit" className="btn btn-danger desktop-btn">Share App Link</button>
                        </div>
                        <div className="marginTop30">
                            <p style={{color: 'grey'}}>Download app from</p>
                            <div className="icons">
                                    <img src="https://i.ibb.co/6YqyqP5/app-store.webp" alt="app-store" height="42"/>
                                    <img src="https://i.ibb.co/VjFXD6x/play-store.webp" alt="play-store" height="42" 
                                    className="marginLeft14"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default AppSection;
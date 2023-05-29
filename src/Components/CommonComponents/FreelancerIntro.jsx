import React from 'react';
import './freelancerintro.style.css';

const FreelancerIntro = () => {
    return (
        <div className="freelancer__intro__sec">
            <div className="profile__img__sec">
                <div id="img"></div>
                <h3 className="small__text">$50/hr</h3>
            </div>
            <div className="name__sec">
                <h1 className="medium__text">Suzana M.</h1>
                <h2 className="small__text" id="skills">Graphic Designer * Email * Templates * Websites</h2>
                <h3 className="small__text" id="job__success">90% SUCCESS <span>(100 Jobs)</span></h3>
                <h3 className="small__text">NY/USA</h3>
            </div>
        </div>
    )
}

export default FreelancerIntro

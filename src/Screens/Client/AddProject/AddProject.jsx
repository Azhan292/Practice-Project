import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';

// components
import UploadSection from '../../../Components/Client/AddProject/UploadSection'
import Footer from '../../../Components/Footer/Footer'
import Navbar from '../../../Components/Headers/Navbar'

// redux
import { useSelector } from 'react-redux'

const AddProject = () => {
    const history = useHistory();
    const userType = useSelector(state => state.userReducer.userType)
    useEffect(() => {
        if(userType==='Freelancer') {
            history.push('/Jobs');
        }
    }, []);
    const color = {
        color: "var(--txtWhite)"
    };
    return (
        <div className="page">
            <Navbar menu={true} />
            <div className="container padding__main">
                <h1 className="main__heading" style={color}>Hire A Freelancer</h1>
                <h2 className="medium__text" style={color}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, distinctio,</h2>
                <UploadSection />
            </div>
            <Footer />
        </div>
    )
}

export default AddProject

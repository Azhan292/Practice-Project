import React from 'react';
import Navbar from '../../Components/Headers/Navbar';
import Footer from '../../Components/Footer/Footer';

// Data
import { termsData } from './termsData';

const Terms = () => {
    return (
        <>
        <div className="main__section container">
            <h1 className="main__heading">TERMS OF USE DSPR Connect Online Terms of Use</h1>
            {termsData.map(term => {
                return (
                    <div key={term.id}>
                        <h2 className="medium__text__bold">{term.id}. {term.title}</h2>
                        <p className="small_text">{term.description}</p>
                    </div>
                )
            })}
        </div>
        <Footer />
        </>
    )
}

export default Terms

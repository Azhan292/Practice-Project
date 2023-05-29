import React from 'react'

// components
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Headers/Navbar'
import TransactionsList from '../../Components/Transactions/TransactionsList';

// style
import './Transactions.style.css'

const Transactions = () => {
    return (
        <div>
            <Navbar menu={true} />
            <div className="padding__main transactions__page page">
                <div className="container padding__main">
                    <h1 className="main__heading">Transaction History</h1>
                    <div className="flex">
                        <div className="duration">
                            <h2 className="small__text"><strong>26 Jul, 2021 - 1 Aug, 2021</strong></h2>
                        </div>
                        <div className="download__invoice_btn">
                            <button>Download Invoice</button>
                        </div>
                    </div>
                    <TransactionsList />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Transactions

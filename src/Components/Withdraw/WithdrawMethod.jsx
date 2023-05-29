import React from 'react'
import { Link } from 'react-router-dom'
import './withdrawmethod.style.css'

// data
import { methodsData } from './methodsData';

const WithdrawMethod = () => {
    return (
        <div className="withdraw__method">
            <h1 className="main__heading">Withdraw Request</h1>
            <div className="flex">
                <div className="table__1">
                    <table>
                        <thead>
                            <tr>
                                <th>Method</th>
                                <th>Description</th>
                                <th>Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {methodsData.map((val, index) => {
                                return (
                                    <tr key={index}>
                                        <td><Link to={val.link}>{val.name}</Link></td>
                                        <td>Withdraw funds through your {val.name} account</td>
                                        <td>{val.fee}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="table__2">
                    <table id="second__table">
                        <thead>
                            <tr>
                                <th>Currency</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>USD</td>
                                <td>$20</td>
                            </tr>
                            <tr>
                                <td>AUD</td>
                                <td>$0.19</td>
                            </tr>
                            <tr>
                                <td>GBP</td>
                                <td>45.00</td>
                            </tr>
                            <tr>
                                <td>CAD</td>
                                <td>0.50</td>
                            </tr>
                            <tr>
                                <td>SAR</td>
                                <td>100.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default WithdrawMethod

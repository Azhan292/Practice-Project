import React, { useState, useEffect } from "react";
import "./transactionslist.style.css";

// data
import useTransactions from "../../hooks/useTransactions";
import { handlePaymentStatus } from "../../Apis/API";

const TransactionsList = () => {
  const { transactionData } = useTransactions();

  return (
    <div className="transations__list">
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Amount</th>
              <th>Project ID</th>
              <th>Status</th>
            </tr>
          </thead>
          {transactionData.length > 0 ? (
            <tbody>
              {transactionData.map((val, index) => {
                return (
                  <tr key={index}>
                    <td>{val.clientName}</td>
                    <td>${val.price}</td>
                    <td>{val.projectId}</td>
                    <td>
                      <button
                        className="status__btn"
                        onClick={() => handlePaymentStatus(val.id)}
                      >
                        {val.status}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            "No Transactions History"
          )}
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;

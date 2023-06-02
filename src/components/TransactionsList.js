import React from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions, searchTerm, deleteTransaction }) {
  const searchedTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
        </tr>
        {searchedTransactions.map((transaction, index) => (
          <Transaction
            key={index}
            transaction={transaction}
            deleteTransaction={deleteTransaction}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;

import React from "react";

function Transaction({ transaction, deleteTransaction }) {
  return (
    <>
      <tr onClick={() => deleteTransaction(transaction.id)}>
        <td>{transaction.date}</td>
        <td>{transaction.description}</td>
        <td>{transaction.category}</td>
        <td>{transaction.amount}</td>
      </tr>
    </>
  );
}

export default Transaction;

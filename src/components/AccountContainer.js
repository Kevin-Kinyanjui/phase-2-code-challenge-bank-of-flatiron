import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(searchText) {
    setSearchTerm(searchText);
  }

  const handleSortByCategory = () => {
    setTransactions((prevTransactions) =>
      [...prevTransactions].sort((a, b) => a.category.localeCompare(b.category))
    );
  };

  const handleSortByDescription = () => {
    setTransactions((prevTransactions) =>
      [...prevTransactions].sort((a, b) =>
        a.description.localeCompare(b.description)
      )
    );
  };

  function deleteTransaction(transactionID) {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== transactionID
    );
    setTransactions(updatedTransactions);

    fetch(`http://localhost:8001/transactions/${transactionID}`, {
      method: "DELETE",
    });
  }

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  function addTransaction(newTransaction) {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  }

  return (
    <div>
      <Search onSearch={handleSearch} />
      <AddTransactionForm addTransaction={addTransaction} />

      <button onClick={() => handleSortByCategory()}>Sort by Category</button>
      <button onClick={() => handleSortByDescription()}>
        Sort by Description
      </button>

      <TransactionsList
        transactions={transactions}
        searchTerm={searchTerm}
        deleteTransaction={deleteTransaction}
      />
    </div>
  );
}

export default AccountContainer;

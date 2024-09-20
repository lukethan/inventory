import { useState, useEffect, useRef } from "react";

function CardAdd({ onAdd }) {
    const [item, setItem] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("https://kegsouth.pythonanywhere.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                item: item,
                amount: amount,
            }),
        });

        if (response.ok) {
            const newProduct = await response.json();
            onAdd(newProduct); // Call the function to add the product
            console.log("Successfully Added!");
            setItem("");
            setAmount("");
        } else {
            console.error("Submission failed:", response.statusText);
        }
    };

    return (
        <div className="card">
            <form className="card-add" onSubmit={handleSubmit}>
                <h2 className="card-new">Add Item</h2>
                <input
                    className="item-add"
                    required
                    name="item"
                    placeholder="Enter Item Name"
                    value={item}
                    type="text"
                    onChange={(e) => setItem(e.target.value)}
                ></input>
                <input
                    className="amount-add"
                    required
                    name="amount"
                    placeholder="Enter Amount"
                    value={amount}
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                ></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CardAdd;

import { useState, useEffect } from "react";
import CardTest from "./CardTest";

const FetchKeg = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("https://kegsouth.pythonanywhere.com")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setProducts(data);
            });
    }, []);
    return (
        <div>
            {products.map((product) => (
                <CardTest
                    key={product.id}
                    id={product.id}
                    item={product.item}
                    amount={product.amount}
                    image={product.image || "https://placehold.co/400?text=Placeholder+Image"}
                />
            ))}
        </div>
    );
};
export default FetchKeg;

import CardAdd from "./CardAdd";

import FetchKeg from "./FetchKeg";
import Footer from "./Footer";
import { useState } from "react";

function App() {
    const [products, setProducts] = useState([]);
    const handleAdd = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    return (
        <>
            <FetchKeg products={products} />
            <CardAdd onAdd={handleAdd} />
            <Footer />
        </>
    );
}

export default App;

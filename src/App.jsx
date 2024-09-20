import CardAdd from "./CardAdd";
import Header from "./Header";
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
            <Header />
            <FetchKeg products={products} />
            <CardAdd onAdd={handleAdd} />
            <Footer />
        </>
    );
}

export default App;

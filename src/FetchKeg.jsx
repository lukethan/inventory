import { useState, useEffect } from "react";
import CardInventory from "./CardInventory";
import CardAdd from "./CardAdd";

const FetchKeg = ({ products }) => {
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [newProduct, setNewProduct] = useState({ item: "", amount: 0, image: "" });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://kegsouth.pythonanywhere.com");
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data);
                setFetchedProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        //     fetchProducts();
        // }, [products]);

        fetchProducts();
    }, [products]);

    const handleDelete = async (itemToDelete) => {
        const response = await fetch(`https://kegsouth.pythonanywhere.com/${encodeURIComponent(itemToDelete)}`, {
            method: "DELETE",
        });

        if (response.ok) {
            console.log("Response received:", await response.json());
            setFetchedProducts((prevProducts) => {
                const updatedProducts = prevProducts.filter((product) => product.item !== itemToDelete);
                return updatedProducts;
            });
        } else {
            console.error("Deletion failed:", response.statusText);
        }
    };

    const handleAdd = (newProduct) => {
        setFetchedProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    // const handleAdd = async (event) => {
    //     event.preventDefault();

    //     const response = await fetch("https://kegsouth.pythonanywhere.com/", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newProduct),
    //     });

    //     if (response.ok) {
    //         const addedProduct = await response.json();
    //         setFetchedProducts((prevProducts) => [...prevProducts, addedProduct]);
    //         setNewProduct({ item: "", amount: 0, image: "" }); // Reset input fields
    //     } else {
    //         console.error("Addition failed:", response.statusText);
    //     }
    // };

    // const handleAdd = (newProduct) => {
    //     setProducts((prevProducts) => [...prevProducts, newProduct]);
    // };

    // const handleAdd = async (newProduct) => {
    //     const response = await fetch("https://kegsouth.pythonanywhere.com/", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newProduct),
    //     });

    //     if (response.ok) {
    //         const addedProduct = await response.json();
    //         setProducts((prevProducts) => [...prevProducts, addedProduct]); // Add new product to the state
    //         console.log("Product added successfully:", addedProduct);
    //     } else {
    //         console.error("Addition failed:", response.statusText);
    //     }
    // };

    return (
        <div>
            {/* <CardAdd onAdd={handleAdd} /> */}
            {fetchedProducts.map((product) => (
                <CardInventory
                    key={product.id}
                    id={product.id}
                    item={product.item}
                    amount={product.amount}
                    image={product.image || "https://placehold.co/400?text=Click+Me!"}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};
export default FetchKeg;

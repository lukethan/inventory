import { useState, useEffect, useRef } from "react";
import PlusButton from "./PlusButton";
import MinusButton from "./MinusButton";
import DeleteButton from "./DeleteButton";

const CardInventory = ({ id, item, amount, image, onDelete }) => {
    const [count, setCount] = useState(amount);
    const [imageSrc, setImageSrc] = useState(image);
    const fileInputRef = useRef(null);
    // const contentRef = useRef(null);

    useEffect(() => {
        setCount(amount);
    }, [amount]);

    useEffect(() => {
        setImageSrc(image);
    }, [image]);

    const increment = () => setCount((c) => c + 1);
    const decrement = () => count > 0 && setCount((c) => c - 1);

    const deleteEntry = async () => {
        const success = await onDelete(item); // Call the parent's delete function
        if (success) {
            console.log("Deleted!");
        }
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input click
        }
    };

    const handleImageUpload = async (event) => {
        const selectedFile = event.target.files[0]; // Get the selected file
        if (!selectedFile) return; // If no file is selected, exit

        const formData = new FormData();
        formData.append("image", selectedFile); // Append the selected file
        formData.append("item_id", id);
        console.log("FormData:", Array.from(formData.entries())); // Log the FormData content

        // Send the file to your server
        const response = await fetch("https://kegsouth.pythonanywhere.com/upload", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json(); // Get the response from the server
            setImageSrc(data.imageUrl); // Assuming the server responds with the image path
            console.log("Image uploaded successfully");
        } else {
            console.error("Upload failed:", response.statusText);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("https://kegsouth.pythonanywhere.com/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                item: item,
                amount: count,
            }),
        });

        if (response.ok) {
            console.log("Successfully submitted:", await response.json());
        } else {
            console.error("Submission failed:", response.statusText);
        }
    };

    return (
        <div className="card">
            <div className="delete-div">
                <DeleteButton onClick={deleteEntry} />
            </div>
            <form className="card-form" onSubmit={handleSubmit}>
                <input type="hidden" name="item_id" value={id} />
                <img className="card-image" src={imageSrc} alt="PlaceHolder" onClick={handleImageClick} />
                <h2 className="card-title">{item}</h2>

                <div className="plusminus-div">
                    <MinusButton onClick={decrement} />
                    <p className="card-text">Inventory: {count}</p>
                    <PlusButton onClick={increment} />
                </div>
                <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleImageUpload} />
            </form>
        </div>
    );
};

export default CardInventory;

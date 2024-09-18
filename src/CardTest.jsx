import { useState, useEffect } from 'react';
import PlusButton from './PlusButton';
import MinusButton from './MinusButton';

const CardTest = (props) => {
    const [count, setCount] = useState(props.amount);
    const [image, setImage] = useState(props.image);
    const [file, setFile] = useState(null);

    useEffect(() => {
        setCount(props.amount);
    }, [props.amount]);

    useEffect(() => {
        setImage(props.image);
    }, [props.image]);

    const increment = () => setCount(count + 1);
    const decrement = () => count > 0 && setCount(count - 1);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        console.log('Selected file:', selectedFile);
    };

    const handleImageUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file); // Append the file to the form data
        formData.append('item_id', props.id)
        console.log('FormData:', Array.from(formData.entries())); // Log the FormData content

        // Send the file to your server (update the URL accordingly)
        const response = await fetch('https://kegsouth.pythonanywhere.com/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json(); // Get the response from the server
            setImage(data.image); // Assuming the server responds with the image path
            console.log('Image uploaded successfully:', data.imageUrl);
        } else {
            console.error('Upload failed:', response.statusText);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('https://kegsouth.pythonanywhere.com/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item: props.item,
                amount: count,
                image: image,
            }),
        });

        if (response.ok) {
            console.log('Successfully submitted:', await response.json());
        } else {
            console.error('Submission failed:', response.statusText);
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="item_id" value={props.id} />
                <img className="card-image" src={props.image} alt="PlaceHolder"></img>
                <h2 className="card-title">{props.item}</h2>
                <p className="card-text">Inventory: {count}</p>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="button" onClick={handleImageUpload}>Upload Image</button>
                <PlusButton onClick={increment} />
                <MinusButton onClick={decrement} />
            </form>
        </div>
    );
};

export default CardTest;

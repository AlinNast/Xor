import React from 'react';
import { useState } from 'react';

export default function App() {
    const [selectedFile, setSelectedFile] = useState();
	const [IsSelected, setIsSelected] = useState(false);
    const [key, setKey] = useState()

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0].name);
		setIsSelected(true);
	};

    const validateKey = (e) => {
        console.log(e.target.value)
        if (! /^[a-fA-F0-9]+$/.test(e.target.value)) {
            setKey(e.target.value)
        }
        else{
            alert("the key you entered is not HEXDEC, try again")
        }
    }

	const handleSubmission = () => {
        const formData = new FormData();

		formData.append('File', selectedFile);

		fetch(
			'https://localhost:5000/upload',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

        return (
            <div>
                <h1 >XOR Cipher</h1>
                <input type="file" name="file" onChange={changeHandler} />

                {/* conditional display logic */}
                {IsSelected ? (
                                <div>
                                    <p>Filename: {selectedFile.name}</p>
                                    <p>Filetype: {selectedFile.type}</p>
                                    <p>Size in bytes: {selectedFile.size}</p>
                                    <p>
                                        lastModifiedDate:{' '}
                                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <p>Select a file to show details</p>
                                )}
                
                <input type="text" name="key" value={key} onChange={validateKey} />


                <div>
                    <button onClick={handleSubmission}>Submit</button>
                </div>
                
            </div>
        );
    

        

    
}

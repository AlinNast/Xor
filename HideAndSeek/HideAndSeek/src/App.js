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

	const handleSubmission = async () => {
        const formData = new FormData();
        const url = "http://localhost:5000/Home"


		formData.append('File', selectedFile);
        const data = { binary: "1001",
                       FileToEncrypt: formData}

		const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            //mode: 'cors', // no-cors, *cors, same-origin
            //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            //    "Accept": "application/json"
             },
            //redirect: 'follow', // manual, *follow, error
            //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data // body data type must match "Content-Type" header
          });
          console.log(response);

          return response.json(); // parses JSON response into native JavaScript objects
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

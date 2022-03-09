import React from 'react';
import { useState } from 'react';

export default function App() {
    const [selectedFile, setSelectedFile] = useState();
	const [IsSelected, setIsSelected] = useState(false);

    const [key, setKey] = useState()
    const [isKeyValid, setIsKeyValid] = useState(false);

    const [operationType, setOperationType] = useState();
    

    const operationHandler = (e) => {
        setOperationType(e.target.value);
        console.log(operationType);
    }

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

    const keyHandler = (e) => {
        setKey(e.target.value)
        setIsKeyValid(true);

        if(key.length == 0){
            setIsKeyValid(false);
        }
        for (let i = 0; i < key.length; i++) {
            if(!"1234567890abcdefABCDEF".includes(key[i])){
                setIsKeyValid(false);
            }
        }
        console.log(key);

    }

	const handleSubmission = async () => {
        const formData = new FormData();
        const url = "http://localhost:5000/Home";


		formData.append('FileToEncrypt', selectedFile);
        formData.append('EncryptionKey', key);
        formData.append('OperationType', operationType)
        

		const response = await fetch(url, {
            method: 'POST', 
            
            //headers: { },
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true,
            body: formData // body data type must match "Content-Type" header
          });

          return await response.json(); // parses JSON response into native JavaScript objects
        };

        return (
            <div>
                <h1 >XOR Cipher</h1>
                <input type="file" name="file" onChange={ changeHandler} />

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

                <input type="text" name="key" value={key} onChange={keyHandler} />
                {isKeyValid ? (
                            <div>
                            <p style={{color: "green"}}>Key is ok</p>
                            </div>
                            ):(
                                <div>
                                <p style={{color: "red"}}>
                                    The key should be made from characters from 0 to 9 and "a" to "f".
                                </p>
                                </div>
                            )}
                
                <p>Select operation type:</p>
                <div onChange={operationHandler}>
                <input type="radio" value="Encrypt" name="operation" /> Encrypt
                <input type="radio" value="Decrypt" name="operation" /> Decrypt
                </div>
                


                <div>
                    <button onClick={handleSubmission}>Submit</button>
                </div>

            </div>
        );
}

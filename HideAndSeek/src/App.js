import React from 'react';
import { useState } from 'react';

export default function App() {
    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

    const [key, setKey] = useState("")

    const [operationType, setOperationType] = useState(null);

    const [isCRCChecked, setIsCRCChecked] = useState(false);

    const [isFileUploaded, setIsFileUploaded] = useState(false);

    

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

    const isHex = (inputKey) => {
        var a = parseInt(inputKey,16);
        return (a.toString(16) === inputKey)
    }

    const handleDownload = () =>{
        window.open('http://localhost:5000/Home', '_blank');
    }

	const handleSubmission = async () => {
        const formData = new FormData();
        const url = "http://localhost:5000/Home";


		formData.append('FileToEncrypt', selectedFile);
        formData.append('EncryptionKey', key);
        formData.append('OperationType', operationType);
        formData.append('isCRCChecked', isCRCChecked);
        

		const response = await fetch(url, {
            method: 'POST', 
            
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true,
            body: formData // body data type must match "Content-Type" header
          });
          console.log(response)

          if(response.ok){
              setIsFileUploaded(true);
          }

          return await response.json();
        };

        return (
            <div className="container">
                <h1 >XOR Cipher</h1>
                <input type="file" name="file" onChange={ changeHandler} />

                {isSelected ? (
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

                <input type="text" name="key" value={key} onChange={(e) => {setKey(e.target.value)}} />
                {((key.length != 0) && isHex(key)) ? (
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
                <div onChange={ (e) => {setOperationType(e.target.value)}}>
                <input type="radio" value="Encrypt" name="operation" /> Encrypt
                <input type="radio" value="Decrypt" name="operation" /> Decrypt
                </div>
                

                {operationType=="Decrypt" ? (
                    <div>
                    <input type="checkbox" checked={isCRCChecked} name="CRC" onChange={() => {setIsCRCChecked(!isCRCChecked)}} /> Add CRC (optional)
                    </div>
                ) : (<p></p>)}
                
                

                {(isSelected&&((key.length != 0) && isHex(key))&&(operationType != null)) ? (
                    <div>
                    <button onClick={handleSubmission}>Submit</button>
                    </div>
                ) : (
                    <div>
                    <p>All fields are mandadory</p>
                    <button disabled>Submit</button>
                    </div>
                )}


                {(isFileUploaded) ? (
                    <div>
                            <p style={{color: "green"}}>Your operation was succesfull</p>
                            
                    <button onClick={handleDownload}>Download</button>
                    </div>
                ) : (<p></p>)}
                    
            </div>
        );
}

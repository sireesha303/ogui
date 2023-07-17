import React, { useState, memo, useEffect } from 'react';
import CopyIcon from './../../assets/images/files.png';
import * as API from '../API/API';
import { pythonIdentifierPattern } from '../Utilities/globalFunction';

function Save(props: {
    onDataUploaded(parsedData: any): unknown; data?: any; type?: any; onClose?: any;
}) {

    const data = JSON.stringify(props.data, null, 2);
    const { onClose } = props;
    const [copied, setCopied] = useState(false);
    const [dagName, setDagName] = useState('');
    const [errorExist, setErrorExist] = useState(false);


    const handleCopy = () => {
        navigator.clipboard.writeText(data);
        setCopied(true);
    };

    const dagNameHandler = (event: { target: { value: string; }; }) => {
        const inputValue = event.target.value;
        if (pythonIdentifierPattern.test(inputValue)) {
            setDagName(inputValue);
        }
    };


    const submitHandler = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log('props.data', props.data);



        const combinedObj = {
            dagName,
            ...props.data,
        };
        onClose();

        console.log('combinedObj', JSON.stringify(combinedObj));

        // API.saveDag(combinedObj).then(x => {
        //     // console.log('x', x);
        //     // Response Handler
        // }).catch(err => console.log('error', err.message));

        // const parsedData = 
        const parsedData = JSON?.parse(props.data);
        console.log('parsedDataparsedDataparsedData.data', parsedData);
        try {
            const parsedData = JSON.parse(props.data);
            console.log('parsedDataparsedDataparsedData.data', parsedData);

        } catch (error) {
            setErrorExist(true);
            return;
        }

    };



    return (
        <div className='ModalBox'>
            <form onSubmit={submitHandler} className='jsonData'>
                <h3 className='ModalTitle'>Save DAG</h3>
                <div className='dagNameSection'>
                    <label htmlFor="text">Name:</label>
                    <input id="text" name="text" className="dagNameBox" placeholder='Name of DAG' required onChange={dagNameHandler} value={dagName} />
                </div>
                {<img onClick={handleCopy} src={CopyIcon} alt='copyBtn' className='copyBtn' title={copied ? 'Copied!' : 'Copy'} />}
                <textarea
                    name="data"
                    id="textarea"
                    value={data}
                    className='textAreaSize'
                    placeholder="Copy Your JSON"
                    required
                    readOnly
                />
                {errorExist && <p className='jsonError'>The JSON upload failed. Please check the variable Names and try again</p>}
                <button type="submit" className='uploadSubmitButton btnSize'>Save</button>
                <button onClick={onClose} className='uploadCancelButton btnSize'>Close</button>
            </form>
        </div>
    );
}

export default memo(Save);

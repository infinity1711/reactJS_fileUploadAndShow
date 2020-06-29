import React, { useState } from 'react'
import HttpService from '../services/api_service';
import Rows from './rows'


export default function Dashbaord() {

    const [selectedFile, setSelectedFile] = useState(null)
    const [resData, setResData] = useState([])
    const [delimiter, setDelimiter] = useState(",")
    const [lines, setLines] = useState(2)


    // On file select (from the pop up) 
    const onFileChange = event => {

        // Update the state 
        setSelectedFile(event.target.files[0])

    };

    // On file upload (click the upload button) 
    const onFileUpload = () => {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );

        // Details of the uploaded file 
        console.log(selectedFile);

        // Request made to the backend api 
        HttpService.uploadFile(formData).then(
            res => {
                setResData(res.data)
            },
            err => {
                console.log(err)
            }
        )
    };

    const handleChange = (event) => {
        let { name, value } = event.target;

        //check for delimiter value if not set to default 
        if (name === 'delimiter') {
            setDelimiter(value ? value : ',')
        }
        //check for lines value if not set to default 
        if (name === 'lines') {
            setLines(value ? value : 2)
        }
        // update the state
    }


    return (
        <>
            <h3 className="header">Dashboard</h3>
            <div style={{ margin: '15px 0' }}>
                <input type="file" onChange={onFileChange} />
                <button className="btn btn-outline-secondary" onClick={onFileUpload}>Upload</button>&emsp;
                </div>

            {resData.length !== 0 ?
                <div>
                    <div className="row">
                        <div className="col-6">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Delimeter</span>
                                </div>
                                <input
                                    type="text"
                                    name="delimiter"
                                    placeholder=""
                                    onChange={handleChange}
                                />
                            </div>
                            <p><small style={{ marginTop: '5px' }}><b>Default delimiter is ','</b></small></p>
                        </div>
                        <div className="col-6">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Lines</span>
                                </div>
                                <input
                                    type="number"
                                    name="lines"
                                    placeholder=""
                                    onChange={handleChange}
                                />
                            </div>
                            <p><small style={{ marginTop: '5px' }}><b>Default lines is 2</b></small></p>
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <tbody>
                            {
                                resData.map((ele, i) =>
                                    (<>
                                        {i + 1 <= lines ?
                                            <Rows ele={ele} delimiter={delimiter} />
                                            : null}
                                    </>))
                            }
                        </tbody>
                    </table>
                </div>
                : null}
        </>
    )

}

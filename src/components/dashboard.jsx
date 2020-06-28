import React from 'react'
import HttpService from '../services/api_service';
import Rows from './rows'

class Dashbaord extends React.Component {

    constructor() {
        super()

        this.state = {
            selectedFile: null,
            resData: [],
            delimiter: ",",
            lines: 2
        }
    }


    // On file select (from the pop up) 
    onFileChange = event => {

        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button) 
    onFileUpload = () => {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file 
        console.log(this.state.selectedFile);

        // Request made to the backend api 
        HttpService.uploadFile(formData).then(
            res => {
                this.setState({ resData: res.data })
            },
            err => {
                console.log(err)
            }
        )
    };

    handleChange = (event) => {
        let { name, value } = event.target;

        //check for delimiter value if not set to default 
        if (name === 'delimiter') {
            console.log(value)
            if (!value) {
                value = ","
            }
        }
        //check for lines value if not set to default 
        if (name === 'lines') {
            if (!value) {
                value = 2
            }
        }
        // update the state
        this.setState({ [name]: value })
    }

    render() {
        return (
            <>
                <h3 className="header">Dashboard</h3>
                <div style={{ margin: '15px 0' }}>
                    <input type="file" onChange={this.onFileChange} />
                    <button className="btn btn-outline-secondary" onClick={this.onFileUpload}>Upload</button>&emsp;
                </div>

                {this.state.resData.length !== 0 ?
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
                                        onChange={this.handleChange}
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
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <p><small style={{ marginTop: '5px' }}><b>Default lines is 2</b></small></p>
                            </div>
                        </div>
                        <table className="table table-bordered">
                            <tbody>
                                {
                                    this.state.resData.map((ele, i) =>
                                        (<>
                                            {i + 1 <= this.state.lines ?
                                                <Rows ele={ele} delimiter={this.state.delimiter} />
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
}

export default Dashbaord
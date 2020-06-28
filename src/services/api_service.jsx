import axios from 'axios';


var HttpService = {
    uploadFile: function(data){
        return axios.post('http://localhost:8080/uploadDoc',data);
    },
    getFile: function(data){
        return axios.get('http://localhost:8080/fileData');
    }
}

export default HttpService;
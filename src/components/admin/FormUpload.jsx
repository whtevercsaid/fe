import React, { Component } from 'react'
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
// import Bootstrap from 'bootstrap'


class FormUploadData extends Component {

  state = {
    file: null,
    isSucces: false
  }

  onFileChange = event => {
    this.setState({ file: event.target.files[0] });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSucces: false })
    const formData = new FormData();
    formData.append('file', this.state.file)
    Axios.post(`http://localhost:2019/helper/upload`, formData)
      .then(res => {
        console.log(res);
        console.log(res.data);
      }).catch(err => alert(err))
  }
  render() {
    return (

      <div className="container col-md-6">
        <div className="card">
          <div className="card-header">
            Upload Form
            </div>
          <div className="list-group">
            <div className="list-group-item">
              <button className="btn btn-sm btn-success" style={{ float: "right", marginBottom: 10 }} >Download Template</button>
              <div className="form-group">
                <label align="left">SILAHKAN PILIH FILE :</label>
                  <div>   
                  <input className="form-control-file" onChange={this.onFileChange}
                  type="file"
                  name="file"
                /></div>

              </div>
            </div>
            <div className="list-group-item">
              <div className="input-group">
                <button className="btn" style={{ background: "#008bca", color: "white" }} onClick={this.handleSubmit} >UPLOAD</button>
              </div>
            </div>
          </div>
          <p>
            Untuk Format file ini bisa berupa adalah Xls (.xls) Apabila ingin melihat jenis format xls untuk upload dan contoh pengisian nya, silahkan klik tombol Download di pojok kanan atas.
          </p>
        </div>
      </div>

    )
  }


}

export default FormUploadData
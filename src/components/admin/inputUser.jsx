import React, { Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomInput } from 'reactstrap';
import SidebarAdmin from './SidebarMC';
import { KONEKSI } from '../../support/config';

class MasterArea extends Component {
    state = {listArea: [], AddBookImage: 'Unggah Gambar Buku', listProduk: [], EditBookImage: 'Pilih Gambar', selectedEditBookId: 0, searchListProduk: [] }
    
    componentDidMount() {
        this.getListArea();
    }

    getListArea = () => {
        axios.get(`http://localhost:2019/master/area`
        ).then((res) => {
            this.setState({listArea: res.data}); 
            console.log(this.state.listArea)          
        }).catch((err) => {
            console.log(err);
        })
    }

    onBtnAddClick = () => {
        if(document.getElementById("AddBookImage").files[0] !== undefined) {
            var formData = new FormData()
            var headers = {
                headers: 
                {'Content-Type': 'multipart/form-data'}
            }

            var data = {
                isbn: this.refs.addIsbn.value,
                judul: this.refs.addJudul.value,
                harga: this.refs.addHarga.value,
                berat: this.refs.addBerat.value,
                jumlah_halaman: this.refs.addJumlahHalaman.value,
                deskripsi: this.refs.addDeskripsi.value,
                penulis: this.refs.addPenulis.value,
                penerbit: this.refs.addPenerbit.value
            }

            console.log(data)

            if(document.getElementById('AddBookImage')){
                formData.append('gambar', document.getElementById('AddBookImage').files[0])
            }
            formData.append('data', JSON.stringify(data))
            console.log(data)
            axios.post(`${KONEKSI}/product/addproduct`, formData, headers)
            .then((res) => {
                
                alert("Buku & Gambar Berhasil Diunggah!")
                console.log(res.data);
                this.refs.formLeft.reset();
                this.refs.formRight.reset(); 
                this.getListProduct()
                //this.setState({ brandList: res.data })
                //this.setState({message:"Bukti Pembayaran Berhasil Diunggah"})
                //this.getListPayment();
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        else {
            alert('Image harus diisi!')
        }
    }

    onBtnSaveClick = (isbn) => {
        
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'}
        }

        var data = {
            judul: this.refs.editJudul.value,
            harga: this.refs.editHarga.value,
            berat: this.refs.editBerat.value,
            jumlah_halaman: this.refs.editJmlHalaman.value,
            deskripsi: this.refs.editDeskripsi.value,
            penulis: this.refs.editPenulis.value,
            penerbit: this.refs.editPenerbit.value
        }

        if(document.getElementById('EditBookImage')){
            formData.append('gambar', document.getElementById('EditBookImage').files[0])
        }
        formData.append('data', JSON.stringify(data))

        axios.put(`${KONEKSI}/product/editproduct/` + isbn, formData, headers)
        .then((res) => {
            alert("Edit Book Success")
            this.setState({ listProduk: res.data, searchListProduk: res.data, selectedEditBookId: 0 })
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure to delete?')) {
            axios.delete(`http://localhost:2019/master/deletearea/` + id)
            .then((res) => {
                alert('Delete Success');
                this.setState({ listProduk: res.data, searchListProduk: res.data })
                //this.getListProduct()
            })
            .catch((err) => {
                alert('Error')
                console.log(err);
            })
        }
    }

    onBtnSearchClick = () => {
        var isbn  = this.refs.searchIsbn.value;
        var penulis = this.refs.searchPenulis.value;
        var judul = this.refs.searchJudul.value;

        var arrSearch = this.state.listProduk.filter((item) => {
            return item.isbn.includes(isbn) 
            && item.judul.toLowerCase().includes(judul.toLowerCase())
            && item.penulis.toLowerCase().includes(penulis.toLowerCase());
        })
        this.setState({searchListProduk: arrSearch})
        console.log(this.state.searchListProduk)
    }
    
    renderListJSX = () => {
        //var srcgambar = `${KONEKSI}/images/book`;
        var listJSX = this.state.listArea.map(item => {
        var {urutan, area} = item
                return (
                    <tr  className="text-wrap" style={{fontSize:'12px'}}>                        
                        <td className="align-middle">{urutan}</td>
                        <td className="align-middle">{area}</td>
                        <td className="align-middle"><button type="button" className="btn btn-sm btn-warning" onClick={() => this.setState({selectedEditBookId: item.isbn})} ><i className="fas fa-edit"></i></button> {' '}
                        <button type="button" className="btn btn-sm btn-danger" onClick={() => this.onBtnDeleteClick(item.isbn)} ><i className="fas fa-trash-alt"></i></button></td>
                    </tr>
                )
        })

        return listJSX;
    }

    render(){
        const { username, role } = this.props.user;

        if(username !== "" && role === "Admin" ){
            return (
                <div className="container-fluid">
                    <div className="row">
                        <SidebarAdmin />
                        
                        <div className="col-md-10 bg-light pl-3 pt-3">
                                <div className="alert alert-warning media col-12">
                                    <img className="img img-fluid" src="http://localhost:3000/images/flat/046-accounting-1.png" width="90px" />
                                    <div className="col-md-10 media-body">
                                        <h4>Input Area</h4>
                                        <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, cupiditate minima similique quaerat nulla iusto dolorem quam asperiores ratione ex tempore in nemo harum consequatur fuga necessitatibus voluptatem sint dolor. </p>
                                    </div>
                                </div>
                                {/* ------------------------------------------------------------------------------------------------ */}
                                <div className="row justify-content-sm-left mt-3 ml-1 text-left text-secondary" style={{fontSize:"14px"}} >
                                    <form ref="formLeft" style={{boxShadow:"none"}} className="col-md-6">                                        
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Urutan</label>
                                            <div className="col-sm-9">
                                                <input type="text" ref="addIsbn" className="form-control form-control-sm" id="inputIsbn" placeholder="Urutan" required autoFocus/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Area</label>
                                            <div className="col-sm-9">
                                                <input type="text" ref="addJudul" className="form-control form-control-sm" id="inputJudul" placeholder="Area" required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-9 offset-sm-3">
                                                <button type="button" class="btn btn-success btn-sm col-12" onClick={this.onBtnAddClick} ><i class="fas fa-plus-circle"></i> Add </button>
                                            </div>
                                        </div>                                    
                                    </form>
                                </div>
                                {/* ------------------------------------------------------------------------------------------------ */}
                                
                                <hr />

                                <div className="card border col-12 pt-2 pb-2">
                                    <h5 className="text-secondary text-left mt-1"><i class="fas fa-cogs"></i> Manage Area</h5><hr />
                                        <form style={{boxShadow:"none"}} ref="formSearch">
                                        <div className="form-row">
                                            <div className="form-group col-md-2">
                                                <input type="text" ref="searchIsbn" className="form-control form-control-sm" id="searchIsbn" placeholder="No. ISBN" />                                                
                                            </div>
                                            <div className="form-group col-md-3">
                                                <input type="text" ref="searchJudul" className="form-control form-control-sm" id="searchJudul" placeholder="Judul Buku" />                                                
                                            </div>
                                            <div className="form-group col-md-3">
                                                <input type="text" ref="searchPenulis" className="form-control form-control-sm" id="searchPenulis" placeholder="Nama Penulis" />                                                
                                            </div>
                                            <div className="form-group col-md-1">
                                                <button type="button" ref="btnSearch" className="btn btn-success btn-sm" id="searchIsbn" onClick={() => {this.onBtnSearchClick()}} ><i class="fas fa-search"></i> Cari</button>                                                
                                            </div>
                                        </div>                                        
                                    </form>
                                    <hr />
                                    <table className="table table-hover text-secondary" style={{fontSize:"12px"}}>
                                        <thead>
                                            <th>Urutan</th>
                                            <th>Area</th>
                                            <th>Action</th>
                                        </thead>
                                        <tbody>
                                            {this.renderListJSX()}
                                        </tbody>
                                    </table>
                                </div>   
                        </div>
                    </div>
                    
                </div>
            );
        }
        return(
            <Redirect to="/" />
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        user: state.auth
    };
}

export default connect(mapStateToProps)(MasterArea);
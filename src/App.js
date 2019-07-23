import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

import { keepLogin, cookieChecked, onUserLogin, loadOfCart } from './actions'
import './App.css';
import HeaderKu from './components/HeaderKu';
import HomeKu from './components/HomeKu';
import LoginKu from './components/LoginKu';
import HomeAdmin from './components/admin/HomeAdmin';
import MasterData from './components/admin/MasterData';
import MasterCode from './components/admin/MasterCode';
import DataSales from './components/admin/DataSales';
import Report from './components/admin/Report';
import Mapping from './components/admin/mapping';
import InputProductAdmin from './components/admin/InputProductAdmin';
import ExCalender from './components/admin/cobakalender';
import MasterArea from './components/admin/inputUser';
import InputDT from './components/admin/inputDistributor';
import principle from './components/admin/principle';
import pageUploadData from './components/admin/pageUpload';
import detaildatasales from './components/admin/detaildatasales';

const cookies = new Cookies();

class App extends Component {
  
  componentDidMount() {
      const username = cookies.get('myPengguna');
      //console.log(username);
      if(username !== undefined){
          this.props.keepLogin(username);
          this.props.loadOfCart({username});
      } else {
        this.props.cookieChecked();
      }
  }

  render() {
    if(this.props.cookie){ 
      return (
        <div className="App">
          <HeaderKu />
          <div className="container-fluid myBody border bg-light" >
          {/* style={{borderRadius: "5px"}} */}
            <Route exact path="/" component={HomeKu} />
            <Route path="/login" component={LoginKu} />
            <Route path="/admin/home" component={HomeAdmin} />
            <Route path="/admin/masterdata" component={MasterData} />
            <Route path="/admin/mastercode" component={MasterCode} />
            <Route path="/admin/datasales" component={DataSales} />
            <Route path="/admin/report" component={Report}/>
            <Route path="/admin/map" component={Mapping}/>
            <Route path="/admin/inputproduct" component={InputProductAdmin} />
            <Route path="/admin/calender" component={ExCalender}/>
            <Route path="/admin/area" component={MasterArea}/>
            <Route path="/admin/dt" component={InputDT}/>
            <Route path="/admin/principle" component={principle}/>
            <Route path ="/admin/upload" component={pageUploadData}/>
            <Route path ="/datasales/detail" component={detaildatasales}/>
          </div>

        </div>
      );
    }
    return (  
      <div className="App">
        <HeaderKu />
        <div className="row" style={{borderRadius: "5px"}}>
          <div className="ml-auto mr-auto loader"></div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {  cookie: state.auth.cookie,
            user: state.auth,
            cart: state.loadOfCart }
}
export default withRouter(connect(mapStateToProps, {keepLogin, cookieChecked, onUserLogin, loadOfCart})(App));

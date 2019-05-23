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

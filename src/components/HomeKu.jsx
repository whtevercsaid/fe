import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class HomeKu extends Component {
    render(){
        const { username, role } = this.props.user;

        if(username !== "" && role === "Admin" ){
            return (
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-12 bg-light pl-3 pt-3">
                                <div className="alert alert-warning media col-12">
                                    <img className="img img-fluid" src="http://localhost:3000/images/flat/039-stadistics.png" width="100px" />
                                    <div className="col-md-12 media-body">
                                        <h4>Hallo Admin</h4>
                                        <p>Happy Working</p>
                                    </div>
                                </div>                            
                        </div>
                    </div>

                </div>
            );
        }
        return(
            <Redirect to="/login" />
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        user: state.auth
    };
}

export default connect(mapStateToProps)(HomeKu);
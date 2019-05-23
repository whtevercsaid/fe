import React, { Component} from 'react';
import SidebarMD from './SidebarMD';

class MasterData extends Component {
    render(){
            return (
                <div className="container-fluid">
                    <div className="row">
                        <SidebarMD />

                        <div className="col-md-10 bg-light pl-3 pt-3">
                                <div className="alert alert-warning media col-12">
                                    <img className="img img-fluid" src="http://localhost:3000/images/flat/039-stadistics.png" width="100px" />
                                    <div className="col-md-10 media-body">
                                        <h4>Hallo Admin</h4>
                                        <p>Happy Working</p>
                                    </div>
                                </div>                            
                        </div>
                    </div>

                </div>
            );
    }
}

export default MasterData
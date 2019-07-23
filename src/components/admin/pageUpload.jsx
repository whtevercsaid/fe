import React, { Component} from 'react';
import SidebarMD from './SidebarMD';
import FormUploadData from './FormUpload';

class pageUploadData extends Component {

    componentDidMount(){
        console.log()
    }
    render(){
            return (
                <div className="container-fluid">
                    <div className="row">
                        <SidebarMD />
                        <FormUploadData/>
                    </div>
                </div>
            );
    }
}

export default pageUploadData
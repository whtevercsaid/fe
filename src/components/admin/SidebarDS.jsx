import React from 'react'
import {Link} from 'react-router-dom'

class SidebarDS extends React.Component{
    render(){
        return(
            <nav className="col-md-2 d-none d-md-block bg-light sidebar border-right" style={{minHeight:"600px"}}>
                <div className="sidebar-sticky mt-2">
                    <ul className="nav flex-column text-left text-dark" >
                        <li className="nav-item border-bottom">
                            <Link to="/datasales/detail" className="nav-link active">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>{' '}
                                Detail
                            </Link>
                        </li>
                            
                        <li className="nav-item border-bottom">
                            <Link to="/admin/verifyorder" className="nav-link active">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>{' '}
                                Monitoring
                            </Link>
                        </li>
                    </ul>

                </div>
            </nav>
        )
    }
}

export default SidebarDS
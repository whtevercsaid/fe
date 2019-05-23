import React from 'react'
import {Link} from 'react-router-dom'   

class SidebarRP extends React.Component{
    render(){
        return(
            <nav className="col-md-2 d-none d-md-block bg-light sidebar border-right" style={{minHeight:"600px"}}>
            <div className="sidebar-sticky mt-2">
                <ul className="nav flex-column text-left text-dark" >
                    <li className="nav-item border-bottom">
                        <Link to="/admin/home" className="nav-link active">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>{' '}
                            Daily <span className="sr-only">(current)</span>
                        </Link>
                    </li>

                    <li className="nav-item border-bottom">
                        <Link to="/admin/verifyorder" className="nav-link active">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>{' '}
                            Absensi
                        </Link>
                    </li>
                    <li className="nav-item border-bottom">
                        <Link to="/admin/inputproduct" className="nav-link active"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>{' '}
                            Kunjungan
                        </Link>
                    </li>
                </ul>

            </div>
        </nav>
        )
    }
}

export default SidebarRP
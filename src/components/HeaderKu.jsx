import React,  { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onUserLogout, keepLogin    , loadOfCart } from '../actions';
import Loginku from './LoginKu';

const cookies = new Cookies();

class HeaderKu extends Component{

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false
      };
    }
    toggle() {
       this.setState({
         isOpen: !this.state.isOpen
       });
    }

    renderLinkIsAdmin = () => {
        if(this.props.role === "Admin"){
            return(
                <Link to="/admin/home">
                    <NavLink className="border-right">
                        <i class="fas fa-cogs"></i> Dashboard Admin 
                    </NavLink>
                </Link>
            );
        }
        return(
            <Link to="/cart">
                <NavLink className="border-right">
                    <i className="fas fa-shopping-cart"></i> Keranjang { this.renderBadgeCart() }
                </NavLink>
            </Link>
        );
    }



    onLogoutClick = () => {
        this.props.onUserLogout();
        cookies.remove('myPengguna');
        //cookies.remove('myKey');
    }

    renderBadgeCart = () => {
        if( this.props.load.total_item > 0 ) {
            return (
                <span class="badge badge-pill badge-danger">{this.props.load.total_item}</span>
            );
        }
    }



    render(){
        if (this.props.username === ""){ 
            return(
               <Redirect to='/login' />
            );
        }
        return(
            <div style={{marginBottom:"75px"}}>
                <Navbar color="light" light expand="md" fixed="top">
                    <NavbarBrand href="/admin/home" className="ml-2"><img src="http://localhost:3000/topan.png" alt="brand" width="200px" /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                        <Link to='/admin/mastercode'><NavLink>Master Code</NavLink></Link>
                        </NavItem>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <NavItem>   
                        <Link to='/admin/masterdata'><NavLink>Master Data</NavLink></Link>
                        </NavItem>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <NavItem>
                        <Link to='/admin/datasales'><NavLink>Data Sales</NavLink></Link>
                        </NavItem>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <NavItem>
                        <Link to='/admin/map'><NavLink>Mapping</NavLink></Link>
                        </NavItem>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                            <NavItem>
                                <Link to='/admin/report'><NavLink>Report</NavLink></Link>
                            </NavItem>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <NavItem>
                                {this.renderLinkIsAdmin()}                            
                            </NavItem>
                            
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Hello, <p className="text-capitalize" style={{display:"inline"}}>{this.props.username}</p>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={this.onLogoutClick}>
                                        <i className="fas fa-sign-out-alt text-danger"></i> Logout 
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        role: state.auth.role,
        load: state.loadOfCart
    }
}

export default connect(mapStateToProps, {onUserLogout, keepLogin, loadOfCart})(HeaderKu);
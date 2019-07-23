import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Card, Checkbox, FormControlLabel, Button } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MaterialTable from "material-table";
import Axios from "axios";
import MomentUtils from '@date-io/moment';
import Moment from "moment"

import 'bootstrap/dist/css/bootstrap.css'

class detaildata extends Component {

    state = {
        userList: [],
        startActionDate: new Date(),
        endActionDate: new Date(),
        startOrderDate: new Date(),
        endOrderDate: new Date(),
        actionCheck : false,
        orderCheck : false,
        main_data : []
    }

    constructor(props) {
        super(props);
        this.getDataTable = this.getDataTable.bind(this);
      } 


        
       getDataTable(){
        var formData = new FormData()
        formData.append("tgl_action_start",this.state.startActionDate.toISOString())
        formData.append("tgl_order_end",this.state.endOrderDate)
        formData.append("tgl_order_start",this.state.startOrderDate)
        formData.append("tgl_action_end",this.state.endActionDate.toISOString())
        formData.append ("cek_action",this.state.actionCheck)
        formData.append("cek_order",this.state.orderCheck)
        Axios.post("http://localhost:2019/master/laporan",formData).then(response=>{
            console.log(response.data)
            this.setState({main_data:response.data.main})
        }).catch(err=> console.log(err))
        console.log("ai")
    }

    date_picker = (label, onChange, value) => {
        return (<MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker className="row"
                autoOk
                variant="inline"
                animateYearScrolling="true"
                format="MM/DD/YYYY"
                label={label}
                value={value}
                onChange={onChange}
            />
        </MuiPickersUtilsProvider>);

    }

    

    onActionDateStartChange = startDate  => this.setState({ startActionDate:new Date(startDate) })
    onActionDateEndChange = endDateAction => this.setState({ endActionDate: new Date(endDateAction) })
    onOrderDateStartChange = startDateOrder => this.setState({ startOrderDate: new Date(startDateOrder) })
    onOrderDateEndChange = endtDateOrder => this.setState({ endOrderDate: new Date(endtDateOrder) })
    onCheckActionChange = (event, checked) =>  this.setState({actionCheck : checked})
    onCheckOrderChange = (event, checked) =>  this.setState({orderCheck : checked})

    render() {

        return <div className="container col-md-10">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <Card style={{ paddingLeft: 50, paddingRight: 40, paddingBottom: 20 }}>
                {/* action */}
                <Row >
                    <Col>
                        <FormControlLabel style={{ paddingTop: 10 }}
                            value="top"
                            control={<Checkbox color="primary" />}
                            label="Tanggal Action"
                            labelPlacement="end"
                            onChange= {this.onCheckActionChange}
                        />
                    </Col>
                    <Col>
                        {this.date_picker("Start Date", this.onActionDateStartChange, this.state.startActionDate)}
                    </Col>
                    <Col>
                        {this.date_picker("End Date", this.onActionDateEndChange, this.state.endActionDate)}
                    </Col>

                </Row>
                {/* order */}
                <Row>
                    <Col>
                        <FormControlLabel style={{ paddingTop: 10 }}
                            value="top"
                            control={<Checkbox color="primary" />}
                            label="Tanggal Order"
                            labelPlacement="end"
                            onChange = {this.onCheckOrderChange}
                           
                        />
                    </Col>
                    <Col>
                        {this.date_picker("Start Date", this.onOrderDateStartChange, this.state.startOrderDate)}
                    </Col>
                    <Col>
                        {this.date_picker("End Date", this.onOrderDateEndChange, this.state.endOrderDate)}
                    </Col>

                </Row>

                <Row>
                    <Button color="primary" variant="contained" onClick={this.getDataTable}> Prosess</Button>
                </Row>

            </Card>

            <Card style={{ marginTop: 10 }}>
                <MaterialTable
                options={{search : false}}
                    columns={[
                        {
                            title: "AccountNumber"
                            , field: "account_number"
                            ,headerStyle : {color:"red" }
                        }, {
                            title: "Status",
                            field: "result"
                        }, {
                            title: "Agent",
                            field: "slip_number",
                        }, { title: "Tanggal Order", field: "date"  }
                    ]}
              data = {this.state.main_data}
                />
            </Card>
        </div>


    }
}

export default detaildata
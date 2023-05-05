import { Bnav } from "../bnav";
import { Footer } from "../footer";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { Table } from '@mantine/core';
import { CSVLink, CSVDownload } from "react-csv";
import { showNotification } from '@mantine/notifications';
import { IconCheck,IconX } from '@tabler/icons';



function Insights(){
    var oid = ReactSession.get("id"); //user-id
    const [items,setItems] = useState([]);
    const [items1,setItems1] = useState([]); //payments
    useEffect( ()=>{
        fetchItems(oid);
        fetchItems1(oid);
      },[oid]);

      const fetchItems1 = async(id)=>{
        const response=await fetch("http://localhost:4000/payment/paymentReports?oid="+id)
        const data=await response.json()
        setItems1(data);
      }
      
      const fetchItems = async(id)=>{
        const response=await fetch("http://localhost:4000/maintenance/getAllRequests?oid="+id)
        const data=await response.json()
        setItems(data);
      }

      //payments
      
      console.log("payments:",items1);


     
      

      
      const tableData = items.map(element=>(
        <tr>
            <td>{element.p_name}</td>
            <td>{element.m_type}</td>
            <td>{element.m_date.split('T00:00:00.000Z')}</td>
            <td style={{"color":element.priority === "Medium"?"Orange":element.priority === "Low"?"green":"Red"}}><b>{element.priority}</b></td>
            <td style={{"color": element.m_status === "Not Completed"?"orange":"green" }}><b>{element.m_status}</b></td>
        </tr>
      ))

      const payTableData = items1.map(element=>(
        <tr>
          <td>{element.p_name}</td>
          <td>{element.t_name}</td>
          <td>{element.p_date.split('T00:00:00.000Z')}</td>
          <td>{element.rent}</td>
        </tr>
      ))


    return(
        <section>
            <Bnav user={[{name:"test",image:""}]} tabs={
            [
              {name:"Dashboard",value:"bdashboard"},
              {name:"Add +",value:"addproperty"},
              {name:"Manage",value:"manage"},
              {name:"Generate Docs.",value:"gendocs"},
              {name:"Maintain",value:"mrequestshome"},
              {name:"Insights✨",value:"insights"}
            ]}/>
            <div style={{"text-align":"center"}}>
                <h2>Insights✨</h2>
                <em>Reports regarding maintenance requests & payments</em>
            </div>
            <hr/>
            <div style={{"text-align":"center"}}>
                <h5>Maintenance Requests</h5>
            </div>
            <p style={{"text-align":"right","padding-right":"5%"}}><CSVLink data={items}  filename={"maintenance_report.csv"} onClick={()=>{
              showNotification({
                title: 'Downloading',
                message: 'Data will be downloaded now!',
                autoClose: 5000,
                color: 'green',
                icon: <IconCheck />,
              })}
            }>Download as CSV⬇️</CSVLink></p>
            
            <Table  striped highlightOnHover withBorder verticalSpacing="xs" fontSize="xs">
                        <thead>
                            <tr>
                            <th>Property Name</th>
                            <th>Maintenance Type</th>
                            <th>Request Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>{tableData}</tbody>
                    </Table>
                    <br/><br/>
                    <div style={{"text-align":"center"}}>
                      <h5>Recieved Payments</h5>
                    </div>
                    <p style={{"text-align":"right","padding-right":"5%"}}><CSVLink data={items1}  filename={"Payment_report.csv"} onClick={()=>{
                      showNotification({
                        title: 'Downloading',
                        message: 'Data will be downloaded now!',
                        autoClose: 5000,
                        color: 'green',
                        icon: <IconCheck />,
                      })}
                    }>Download as CSV⬇️</CSVLink></p>
                    <Table  striped highlightOnHover withBorder verticalSpacing="xs" fontSize="xs">
                        <thead>
                            <tr>
                            <th>Property Name</th>
                            <th>Payee Name</th>
                            <th>Payment Date</th>
                            <th>Recieved Amount</th>
                            </tr>
                        </thead>
                        <tbody>{payTableData}</tbody>
                    </Table>
            <Footer/>
        </section>
    )
}

export default Insights;
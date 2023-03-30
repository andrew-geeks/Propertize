import { Bnav } from "../bnav";
import { Footer } from "../footer";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { Table } from '@mantine/core';
import { CSVLink, CSVDownload } from "react-csv";




function Insights(){
    var oid = ReactSession.get("id"); //user-id
    const [items,setItems] = useState([]);
    useEffect( ()=>{
        fetchItems(oid);
      },[oid]);
      
      const fetchItems = async(id)=>{
        const response=await fetch("http://localhost:4000/maintenance/getAllRequests?oid="+id)
        const data=await response.json()
        setItems(data);
        
      }

     
      

      
      const tableData = items.map(element=>(
        <tr>
            <td>{element.p_name}</td>
            <td>{element.m_type}</td>
            <td>{element.m_date}</td>
            <td style={{"color":element.priority === "Medium"?"Orange":element.priority === "Low"?"green":"Red"}}><b>{element.priority}</b></td>
            <td style={{"color": element.m_status === "Not Completed"?"orange":"green" }}><b>{element.m_status}</b></td>
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
            <p style={{"text-align":"right","padding-right":"5%"}}><CSVLink data={items}  filename={"maintenance_report.csv"}>Download as CSV⬇️</CSVLink></p>
            
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
            <Footer/>
        </section>
    )
}

export default Insights;
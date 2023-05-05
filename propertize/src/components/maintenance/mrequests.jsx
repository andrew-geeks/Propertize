//FOR TENANT

import { Nav } from "../navbar1";
import { Table } from '@mantine/core';
import { Footer } from "../footer";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function MaintainRequests(){
    const navigate = useNavigate();
    var uid = ReactSession.get("id"); //user-id
    const [items,setItems] = useState([]);
    useEffect( ()=>{
        fetchItems(uid);
      },[uid]);

      const fetchItems = async(id)=>{
        const response=await fetch("http://localhost:4000/maintenance/getRequests?uid="+id)
        const data=await response.json()
        setItems(data);
      }


      const tableData = items.map(element=>(
        <tr>
            <td>{element.p_name}</td>
            <td>{element.m_type}</td>
            <td>{element.m_date.split('T00:00:00.000Z')}</td>
            <td style={{"color":element.priority === "Low"?"Green":element.priority === "Medium"?"Orange":"Red"}}><b>{element.priority}</b></td>
            <td style={{"color": element.m_status === "Not Completed"?"orange":"green" }}><b>{element.m_status}</b></td>
        </tr>
      ))



        return(
            <section>
                    <Nav user={[{name:"test",image:""}]} tabs={[{name:"Dashboard",value:"dashboard"},{name:"Maintenance",value:"maintenance"},{name:"Pay Rent",value:"payrent"}]}/>
                    <h3 style={{"text-align":"center"}}>Your Requests</h3>
                    <br/>
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
            </section>
        )
}

export default MaintainRequests;
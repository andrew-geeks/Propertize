//FOR OWNER
import { Bnav } from "../bnav";
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { Button } from '@mantine/core';
import { Table } from '@mantine/core';
import { Footer } from "../footer";
import axios from "axios";

function MrequestsHome(){
    const navigate = useNavigate();
    var oid = ReactSession.get("id"); //user-id
    const [items,setItems] = useState([]);
    useEffect( ()=>{
        fetchItems(oid);
      },[oid]);

      const fetchItems = async(id)=>{
        const response=await fetch("http://localhost:4000/maintenance/getPenRequests?oid="+id)
        const data=await response.json()
        setItems(data);
      }

      function setComplete(mid){
        axios.post("http://localhost:4000/maintenance/setComplete?mid="+mid)
        .then(res=>{
          //send notification
          
          //refresh to remove the completed item;
          window.location.reload(false);
        })
        .catch(err=>{
          console.log(err);
        })

      }

      const tableData = items.map(element=>(
        <tr>
        <td>{element.p_name}</td>
        <td>{element.m_type}</td>
        <td>{element.m_date}</td>
        <td style={{"color":element.priority === "Medium"?"Orange":"Red"}}><b>{element.priority}</b></td>
        <td>{element.m_status}</td>
        <td>{
            <button
            class="focus:outline-none text-white bg-orange-400 hover:bg-yellow-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={()=>setComplete(element._id)}>
            Set Complete
            </button>
        }
        </td>
    </tr>
      ))



    return(
        <section>
            <Bnav user={[{name:"test",image:""}]} tabs={[{name:"Dashboard",value:"bdashboard"},{name:"Add +",value:"addproperty"},{name:"Manage",value:"manage"},{name:"Maintain",value:"mrequestshome"},{name:"Generate Docs.",value:"gendocs"},{name:"Insights✨",value:"insights"}]}/>
            <div style={{"text-align":"center"}}>
                <h3>Pending Requests({items.length})</h3>
                <p>Finish maintenance of properties and set it <span style={{"color":"green"}}><b>complete</b></span> here.</p>
            </div>
            
            <Table  striped highlightOnHover withBorder verticalSpacing="xs" fontSize="xs">
                        <thead>
                            <tr>
                            <th>Property Name</th>
                            <th>Maintenance Type</th>
                            <th>Request Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Set Complete</th>
                            </tr>
                        </thead>
                        <tbody>{tableData}</tbody>
            </Table>
            <Footer/>
        </section>
    )
}


export default MrequestsHome;
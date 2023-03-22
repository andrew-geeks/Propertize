import {Nav} from "../navbar1";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

ReactSession.setStoreType("localStorage");

function Dashboard(){
    
    const loggedIn = ReactSession.get("id");
    useEffect( ()=>{
        fetchItems(loggedIn);
    },[loggedIn]);

    const [prop,setProp] = useState([]); //storing all assigned property data
    const fetchItems = async(id)=>{
        const response=await fetch("http://localhost:4000/property/getAprop?id="+loggedIn)
        const data=await response.json()
        setProp(data);
    }
   
    if(loggedIn === undefined){
        return <Navigate replace to="/login" />;
    }
    else{
        return(
            <div>
                <Nav user={[{name:"test",image:""}]} tabs={["Maintain","Pay Rent","Download Docs"]}/>

                <h1>Assigned Properties(0)</h1>
                {prop.map(id=>(
                    <p>{id.p_name}</p>
                ))}
            </div>
        )
    }

    
}

export default Dashboard;
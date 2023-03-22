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

    const [pid,setPid] = useState([]); //storing all  assigned property IDS
    const [prop,setProp] = useState([]); //storing all assigned property data
    const fetchItems = async(id)=>{
        const response=await fetch("http://localhost:4000/property/getApropId?id="+loggedIn)
        const data=await response.json()
        setPid(data);
    }
    pid.map(id=>(
        //iteratively store p-data
        axios.get("http://localhost:4000/property/getSProp?id="+id._id)
        .then(res=>{
            setProp(res.data)
        })
        .catch(error=>{
            console.log(error);
        })
    ));
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
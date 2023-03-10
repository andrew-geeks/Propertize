import {Nav} from "../navbar1";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

ReactSession.setStoreType("localStorage");

function Dashboard(){
    
    const loggedIn = ReactSession.get("id");

    if(loggedIn === undefined){
        return <Navigate replace to="/login" />;
    }
    else{
        return(
            <div>
                <Nav user={[{name:"test",image:""}]} tabs={["Maintain","Pay Rent","Download Docs"]}/>
                <h1>Dashboard</h1>
            </div>
        )
    }

    
}

export default Dashboard;
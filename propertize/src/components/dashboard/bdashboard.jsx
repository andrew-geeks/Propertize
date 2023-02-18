import NewNavbar from "../navbar1";
import { Bnav } from "../bnav";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

ReactSession.setStoreType("localStorage");

function BDashboard(){
    
    return(
        <div>
            <Bnav user={[{name:"test",image:""}]} tabs={["Add +":"/addproperty","Manage","Maintain","Payments","Generate Docs"]}/>
            <h1>Business Dashboard</h1>
        </div>
    )

    
}

export default BDashboard;
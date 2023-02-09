import NewNavbar from "../navbar1";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

ReactSession.setStoreType("localStorage");

function BDashboard(){
    
    return(
        <div>
            <NewNavbar/>
            <h1>Business Dashboard</h1>
        </div>
    )

    
}

export default BDashboard;
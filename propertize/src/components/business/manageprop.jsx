import { Footer } from "../footer";
import { Bnav } from "../bnav";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";



function ManageProp(){
    const {propid}  = useParams();

    return(
        <section>
            <Bnav user={[{name:"test",image:""}]} tabs={[{name:"Dashboard",value:"bdashboard"},{name:"Add +",value:"addproperty"},{name:"Manage",value:"manage"},{name:"Generate Docs.",value:"gendocs"}]}/>
            <h2>Manage {propid}</h2>

        </section>
    )
}

export default ManageProp;
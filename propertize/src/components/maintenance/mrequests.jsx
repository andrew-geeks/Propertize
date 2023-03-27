import { Nav } from "../navbar1";
import { Table } from '@mantine/core';


function MaintainRequests(){

    return(
        <section>
                <Nav user={[{name:"test",image:""}]} tabs={[{name:"Dashboard",value:"dashboard"},{name:"Maintenance",value:"maintenance"},{name:"Pay Rent",value:"payrent"}]}/>
                <h3 style={{"text-align":"center"}}>Your Requests</h3>
                <br/>
        </section>
    )
}

export default MaintainRequests;
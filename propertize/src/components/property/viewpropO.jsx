//OWNER
import { Footer } from "../footer";
import { Bnav } from "../bnav";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewpropO(){
    const {propid}  = useParams();
    const [items,setItems] = useState([]);
    //var id = ReactSession.get("id");
    useEffect( ()=>{
        fetchItems(propid);
    },[propid]);
    const fetchItems = async(propid)=>{
        const response=await fetch("http://localhost:4000/property/viewpropo?propid="+propid)
        const data=await response.json()
        setItems(data);
    }       
    console.log(items);

    return(
        <section>
            <Bnav user={[{name:"test",image:""}]} tabs={[{name:"Dashboard",value:"bdashboard"},{name:"Add +",value:"addproperty"},{name:"Manage",value:"manage"},{name:"Generate Docs.",value:"gendocs"},{name:"Maintain",value:"mrequestshome"}]}/>
            <div style={{"text-align":"center"}}>
                <h2>Property Details</h2>
                {
                 items.map(item=>(
                        <div>
                            <p>Property Name: {item.p_name}</p>
                            <p>Area Type: {item.p_type}</p>
                            <p>Size: {item.p_size} sqft</p>
                            <p>BHK/Rooms: {item.bhk}</p>
                            <p>Location: {item.location}</p>
                            <p>Rented to: {item.t_name}</p>
                        </div>
                        
                    ))
                }
            </div>
            
            

        </section>
    )
}

export default ViewpropO;
//TENANT
import { Footer } from "../footer";
import {Nav} from "../navbar1";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";







function ViewpropT(){
    const {propid}  = useParams();
    const [items,setItems] = useState([]);
    //var id = ReactSession.get("id");
    useEffect( ()=>{
        fetchItems(propid);
    },[propid]);
    const fetchItems = async(propid)=>{
        const response=await fetch("http://localhost:4000/property/viewprop?propid="+propid)
        const data=await response.json()
        setItems(data);
    }       
    console.log(items);
    return(
        <section>
            <Nav user={[{name:"test",image:""}]} tabs={[{name:"Dashboard",value:"dashboard"},{name:"Maintenance",value:"maintenance"},{name:"Pay Rent",value:"payrent"}]}/>
            <div style={{"text-align":"center"}}>
                {
                    items.map(item=>(
                        <div>
                            <h2>Property Details</h2>
                            <p>Property Name: {item.p_name}</p>
                            <p>Area Type: {item.p_type}</p>
                            <p>Size: {item.p_size} sqft</p>
                            <p>BHK/Rooms: {item.bhk}</p>
                            <p>Location: {item.location}</p>
                            <p>Owner: {item.o_name}</p>
                        </div>
                        
                    ))
                }
                
            </div>
            
        </section>
    )
}

export default ViewpropT;
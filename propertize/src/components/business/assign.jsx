import { Footer } from "../footer";
import { Bnav } from "../bnav";
import { ReactSession } from 'react-client-session';
import { createStyles, Select, TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import None from "../404";
import axios from 'axios';



const useStyles = createStyles((theme) => ({
    root: {
      position: 'relative',
    },
  
    input: {
      height: '60px',
      paddingTop: 18,
    },
  
    label: {
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: theme.fontSizes.xs,
      paddingLeft: theme.spacing.sm,
      paddingTop: theme.spacing.sm / 2,
      zIndex: 1,
    },
  }));



function Assign(){
    const navigate = useNavigate();
    ReactSession.setStoreType("localStorage");
    var id = ReactSession.get("id");
    var uid="";
    var actype="";
    const { classes } = useStyles();
    const {propid}  = useParams();
    const formData = {p_id:propid,u_id:"",o_id:id,tenure:"",email:"",assign:""}
    useEffect( ()=>{
        fetchItems(propid);
    },[propid]);
    const [items,setItems] = useState([]);
    const [error,setError] = useState("");
    const [suc,setSuc] = useState("");
    const [formValues,setFormValues] = useState(formData);

    const fetchItems = async(id)=>{
        const response=await fetch("http://localhost:4000/property/getSProp?pid="+id)
        const data=await response.json()
        setItems(data);
    }
    var assigned="";
    const formsubmit = (e)=>{
        e.preventDefault();
        //get tenant id and actype using mail
        axios.get("http://localhost:4000/account/getId?mail="+formValues.email)
        .then(async res=>{
            actype = res.data.actype;
            uid = res.data.id;
            //if tenant
            if(actype === "tenant"){
                formValues.u_id =uid; //setting userid
                console.log("uid:"+res.data.id)
                await axios.post("http://localhost:4000/property/assign",formValues)
                .then(resp=>{
                    //sucessful insertion
                    //updating property to assigned status
                    axios.post("http://localhost:4000/property/updateAssign?pid="+formValues.p_id)
                    .then(
                        async respo=>{
                            //updating property with u_id
                            await axios.post("http://localhost:4000/property/updateTID?pid="+formValues.p_id+"&tid="+formValues.u_id)
                            .then(respon=>{
                                //notification recommended!
                                setSuc("Property Assigned!");
                                setTimeout(() => {  console.log("Sleep!"); }, 2000);
                                navigate("/bdashboard")
                            })
                            
                        }
                    )
                    
                })  
                .catch(error=>{
                    console.log("Error in inserting")
                    console.log(formValues)
                    setError("Could not assign⚠️!");
                })
            }
    
            else{
                setError("Enter a tenant MailId⚠️!");
            }
        })
        .catch(error=>{
            console.log('actionError', error )
            setError("Invalid Email⚠️!");
        })
    }

    items.map(item=>(
        assigned = item.p_status
    ))
    formData.assign = assigned
    if(formData.assign === ""){
        return(
            <None/>
        )
    }
    else if(assigned === "Assigned"){
        console.log(assigned)
        return(
            <None/>
        )
    }
    else{
        return(
            <section>
                <Bnav user={[{name:"test",image:""}]} tabs={[{name:"Dashboard",value:"bdashboard"},{name:"Add +",value:"addproperty"},{name:"Manage",value:"manage"}]}/>
                
                {
                    items.map(item=>(
                        <section>
                        <div style={{"padding-left":"5%","text-align":"center"}}>
                            <h3>Assign {item["p_name"]}</h3>
                            <em>Assign your property according to your preferences!</em>
                            <p className="mail-warning">{error}</p>
                            <p style={{"color":"green"}}>{suc}</p>
                        </div>
                        <br/><br/>
                        <form style={{"padding-left":"5%"}}>
                        <div className="col">  
                            <p>Enter Tenant Email</p>
                             <TextInput label="Enter email"  classNames={classes} onChange={(e)=>setFormValues({...formValues,email:e.target.value})} required type="email"/>
                        </div>
                        <div className="col">  
                            <p>Property Id:</p>
                             <TextInput defaultValue={formValues.p_id} disabled = {true}  classNames={classes} required type="text"/>
                        </div>
                        <div className="col">  
                            <p>Assign Status</p>
                             <TextInput label="Assigned or Not" defaultValue={formData.assign} disabled = {true}  classNames={classes} required type="text"/>
                        </div>
                        <div className="col">  
                            <p>Enter Agreement Tenure</p>
                             <TextInput label="No. of years this property is rented/leased" onChange={(e)=>setFormValues({...formValues,tenure:e.target.value})} classNames={classes} required type="number"/>
                        </div>
                        <button type="submit" onClick={formsubmit} class="focus:outline-none text-white bg-purple-700 hover:bg-yellow-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Assign</button>
                        </form>
                        
                

                        </section>
                    ))
                }
            </section>
        )
    }
    



}

export default Assign;
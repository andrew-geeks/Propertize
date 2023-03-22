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
    var id = ReactSession.get("id");
    var uid="";
    var actype="";
    const { classes } = useStyles();
    const {propid}  = useParams();
    const formData = {p_id:propid,u_id:"",o_id:id,tenure:"",email:""}
    useEffect( ()=>{
        fetchItems(propid);
    },[propid]);
    const [items,setItems] = useState([]);
    const [error,setError] = useState("");
    const [formValues,setFormValues] = useState(formData);

    const fetchItems = async(id)=>{
        const response=await fetch("http://localhost:4000/business/getSProp?pid="+id)
        const data=await response.json()
        
        setItems(data);
    }
    var assigned="";
    const formsubmit = (e)=>{
        e.preventDefault();
        //get tenant id and actype using mail
        axios.get("http://localhost:4000/account/getId?mail="+formValues.email)
        .then(res=>{
            uid = res.data.id;
            actype = res.data.actype;
            //if tenant
            if(actype === "tenant"){
                

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
    
    if(assigned === ""){
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
                        </div>
                        <br/><br/>
                        <form style={{"padding-left":"5%"}}>
                        <div className="col">  
                            <p>Enter Tenant Email</p>
                             <TextInput label="Enter email"  classNames={classes} required type="email"/>
                        </div>
                        <div className="col">  
                            <p>Property Id:</p>
                             <TextInput defaultValue={propid} disabled = {true}  classNames={classes} required type="text"/>
                        </div>
                        <div className="col">  
                            <p>Assign Status</p>
                             <TextInput label="Assigned or Not" defaultValue={assigned} disabled = {true}  classNames={classes} required type="text"/>
                        </div>
                        <div className="col">  
                            <p>Enter Agreement Tenure</p>
                             <TextInput label="No. of years this property is rented/leased"  classNames={classes} required type="number"/>
                        </div>
                        <button type="submit" class="focus:outline-none text-white bg-purple-700 hover:bg-yellow-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Assign</button>
                        </form>
                        
                

                        </section>
                    ))
                }
            </section>
        )
    }
    



}

export default Assign;
import { Footer } from "../footer";
import { Bnav } from "../bnav";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { createStyles, Select, TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
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

//   function Delproperty(pid){
//     const navigate = useNavigate();
//     pid.preventDefault();
//     axios.get("http://localhost:4000/business/delProp?pid="+pid)
//     .then(res =>{
//       console.log(res.data);
//       //after successfull deletion
//       navigate("/manage")
//     })
//     .catch(error =>{
//       console.log("actionError",error);
//     })
//   }



function ManageProp(){
    const navigate = useNavigate();
    const {propid}  = useParams();
    const { classes } = useStyles();
    ReactSession.setStoreType("localStorage");
    var id = ReactSession.get("id");
    useEffect( ()=>{
        fetchItems(propid);
    },[propid]);
    const [items,setItems] = useState([]);
    const fetchItems = async(id)=>{
        const response=await fetch("http://localhost:4000/business/getSProp?pid="+id)
        const data=await response.json()
        setItems(data);
    }
    const formData = {pid:propid,p_name:items["p_name"],p_desc:items["p_desc"],p_size:items["p_size"],bhk:items["bhk"],location:items["location"],rent_amt:items["rent_amt"]}
    
    items.map(item=>{
        formData.p_name = item.p_name
        formData.p_desc = item.p_desc
        formData.p_size = item.p_size
        formData.bhk = item.bhk
        formData.location = item.location
        formData.rent_amt = item.rent_amt
        return ""
    })
    const [formValues,setFormValues] = useState(formData);

    const formSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:4000/business/updateProp/",formValues)
        .then(res =>{
          console.log(res.data);
          //after successfull editing of values
          navigate("/manage")
        })
        .catch(error =>{
          console.log("actionError",error);
        })
      }

      

    if(items.length === 0){
        return(
            <None/>
        )
    }
    else{
        return(
            <section>
                <Bnav user={[{name:"test",image:""}]} tabs={[{name:"Dashboard",value:"bdashboard"},{name:"Add +",value:"addproperty"},{name:"Manage",value:"manage"},{name:"Generate Docs.",value:"gendocs"}]}/>
                <br/>
                {items.map(item=>(
                    <section>
                        <div style={{"padding-left":"5%","text-align":"center"}}>
                            <h2>Manage {item["p_name"]}</h2>
                            <em>Edit your property according to your preferences!</em>
                        </div>
                        <form style={{"padding-left":"5%"}}>
                        <br/><br/>
                        <div className="col">  
                            <p>Enter location</p>
                             <TextInput label="Enter location" defaultValue={item["location"]} onChange={(e)=>setFormValues({...formValues,location:e.target.value})}  classNames={classes} required type="text"/>
                        </div>
                        <div className="col">
                            <p>Enter property name</p>
                            <TextInput label="Enter Property Name" defaultValue={item["p_name"]} onChange={(e)=>setFormValues({...formValues,p_name:e.target.value})} classNames={classes} required type="text"/>
                        </div>
                        <div className="col">
                            <TextInput label="Enter BHK" defaultValue={item["bhk"]} onChange={(e)=>setFormValues({...formValues,bhk:e.target.value})} classNames={classes} required type="number"/>
                        </div>
                        <div className="col">
                            <TextInput label="Enter Size" defaultValue={item["p_size"]} onChange={(e)=>setFormValues({...formValues,p_size:e.target.value})}  classNames={classes} required type="number"/>
                         </div>
                         <div className="col">
                            <TextInput label="Enter property description" defaultValue={item["p_desc"]} onChange={(e)=>setFormValues({...formValues,p_desc:e.target.value})}  classNames={classes} required type="text" maxLength="30"/>
                        </div>
                        <div className="col">
                            <Select
                            style={{ marginTop: 20, zIndex: 2 }}
                            data={['Residential', 'Commercial']}
                            placeholder={item.p_type}
                            label="Select property type"
                            classNames={classes}
                            disabled={true}        
                            />
                        </div>
                        <div className="col">
                            <TextInput label="Rent Amount" defaultValue={item["rent_amt"]} onChange={(e)=>setFormValues({...formValues,rent_amt:e.target.value})} classNames={classes} required type="number"/>
                         </div>
                         <br/><br/>
                         <div className="col">
                            <button type="submit" onClick={formSubmit} class="focus:outline-none text-white bg-purple-700 hover:bg-yellow-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Submit</button>
                            <Button variant="outline" color="red" size="md">Delete Property</Button>
                        </div>

                        </form>
                        <Footer/>
                    </section>
                    
                ))}
    
            </section>
        )
    }

    
}

export default ManageProp;
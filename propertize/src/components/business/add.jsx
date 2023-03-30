import { Bnav } from "../bnav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ReactSession } from 'react-client-session';
import { createStyles, Select, TextInput } from '@mantine/core';

import { Footer } from "../footer";

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


export function Add(){
    const { classes } = useStyles();
    const navigate = useNavigate();
    ReactSession.setStoreType("localStorage");
    var id = ReactSession.get("id");
    const formData = {ownerid:id,p_name:"",p_desc:"",area_type:"",p_type:"",p_size:"",bhk:"",location:"",rent_amt:"",p_status:"Not Assigned"}
    const [formValues,setFormValues] = useState(formData);
    
    const formSubmit = (e) =>{
      e.preventDefault();
      console.log(formValues)
      axios.post("http://localhost:4000/business/add/",formValues)
      .then(res =>{
        console.log(res.data);
        //after successfull adding
        navigate("/bdashboard")
      })
      .catch(error =>{
        console.log("actionError",error);
      })
    }


    return(
        <section>
            <Bnav user={[{name:"test",image:""}]} tabs={[{name:"Dashboard",value:"bdashboard"},{name:"Add +",value:"addproperty"},{name:"Manage",value:"manage"},{name:"Maintain",value:"mrequestshome"}]}/>
            <div style={{"text-align":"center"}}>
            <h2>Add your property🏘️!</h2>
            <em>Add and manage them with ease!</em>
            </div>
            
            <br/><br/>
          <div className="divform">
            <form method="post">
            <div className="col">
            <TextInput label="Enter location" placeholder="Property Location"  classNames={classes} onChange={(e)=>setFormValues({...formValues,location:e.target.value})} required type="text"/>
            </div>
            <div className="col">
            <TextInput label="Enter Property Name" placeholder="Just a name.."  classNames={classes} onChange={(e)=>setFormValues({...formValues,p_name:e.target.value})} required type="text"/>
            </div>
            <br></br>
            <div className="col">
              <TextInput label="BHK" placeholder="0,1,2,3 or more..."  classNames={classes} onChange={(e)=>setFormValues({...formValues,bhk:e.target.value})} required type="number"/>
            </div>
            <div className="col">
              <TextInput label="Enter Size" placeholder="In SQFT"  classNames={classes} onChange={(e)=>setFormValues({...formValues,p_size:e.target.value})} required type="number"/>
            </div>
            <div className="col">
              <Select
                style={{ marginTop: 20, zIndex: 2 }}
                data={['Carpet Area', 'Super Area']}
                placeholder="Pick one"
                label="Select area type"
                classNames={classes}
                onSelect={(e)=>setFormValues({...formValues,area_type:e.target.value})}
                
                required
              />
            </div>
            <div className="col">
            <TextInput label="Enter property description" placeholder="max 30 characters"  classNames={classes} onChange={(e)=>setFormValues({...formValues,p_desc:e.target.value})} required type="text" maxLength="30"/>
            </div>
            <div className="col">
            <Select
              style={{ marginTop: 20, zIndex: 2 }}
              data={['Residential', 'Commercial']}
              placeholder="Pick one"
              label="Select property type"
              classNames={classes}
              onSelect={(e)=>setFormValues({...formValues,p_type:e.target.value})}
              required
            />
            </div>
            <div className="col">
            <TextInput label="Rent Amount" placeholder="In rupees"  classNames={classes} onChange={(e)=>setFormValues({...formValues,rent_amt:e.target.value})} required type="number"/>
            </div>
            <div className="col">
              <button onClick={formSubmit} type="submit" class="focus:outline-none text-white bg-purple-700 hover:bg-yellow-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Add</button>
            </div>
          </form>
          </div>
          <Footer/>        
        </section>

    )
}
import { Footer } from "../footer";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createStyles, Select, TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import None from "../404";
import axios from 'axios';
import { Nav } from "../navbar1";


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




function MaintainProp(){
    const navigate = useNavigate();
    const {propid}  = useParams();
    const { classes } = useStyles();
    ReactSession.setStoreType("localStorage");
    var uid = ReactSession.get("id"); //user-id
    const [items,setItems] = useState([]);
    const [error,setError] = useState("");
    useEffect( ()=>{
      fetchItems(propid);
    },[propid]);    

    const fetchItems = async(id)=>{
      const response=await fetch("http://localhost:4000/property/getSProp?pid="+id)
      const data=await response.json()
      setItems(data);      
    }

    const formData = {p_id:propid,u_id:uid,o_id:"",m_date:"",priority:"",p_name:""}
    const [formValues,setFormValues] = useState(formData);
    
    items.map(item=>{
      formValues.p_name = item.p_name
      formValues.o_id = item.owner_id
      return ""
    })
    
    const formSubmit = (e) =>{
      e.preventDefault();
      console.log(formValues)
      
      //
      axios.post("http://localhost:4000/maintenance/maintainprop/",formValues)
      .then(res =>{
        console.log(res.data);
        //after successfull adding maintenance
        navigate("/maintenance")
      })
      .catch(error =>{
        setError("Failed to request maintenance!")
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
                <Nav user={[{name:"test",image:""}]} tabs={[{name:"Maintenance",value:"maintenance"},{name:"Pay Rent",value:"payrent"}]}/>
                <h3 style={{"text-align":"center"}}>Maintain {formValues.p_name}🏠🛠️</h3>
                <p className="mail-warning" style={{"text-align":"center"}}>{error}</p>
                <div style={{"padding-left":"5%"}}>
                  {items.map(item=>(
                    <form>
                  <div className="col">
                    <Select
                      style={{ marginTop: 20, zIndex: 2 }}
                      data={['Annual Maintenance', 'Monthly Maintenance','Other']}
                      placeholder="Pick one"
                      label="Select Maintenance Type"
                      classNames={classes}
                      onSelect={(e)=>setFormValues({...formValues,m_type:e.target.value})}
                      required
                    />
                  </div>
                  <div className="col">
                  <Select
                    style={{ marginTop: 20, zIndex: 2 }}
                    data={['Low', 'Medium','High']}
                    placeholder="Pick one"
                    label="Select Priority"
                    classNames={classes}
                    onSelect={(e)=>setFormValues({...formValues,priority:e.target.value})}
                    required
                  />
                  </div>
                  <div className="col">
                            <TextInput label="Enter maintenance description" placeholder="Describe regarding maintenance(if any)" onChange={(e)=>setFormValues({...formValues,description:e.target.value})}  classNames={classes} type="text" maxLength="30"/>
                  </div>
                  </form>
                  ))}
                  
                </div>
                <div className="col" style={{"padding-top":"2%"}}>
              <button type="submit" onClick={formSubmit} class="focus:outline-none text-white bg-orange-400 hover:bg-yellow-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Request maintenance🛠️</button>
            </div>
            <Footer/>
        </section>
    )
  }

}

export default MaintainProp;

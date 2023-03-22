import { Footer } from "../footer";
import { Bnav } from "../bnav";
import { ReactSession } from 'react-client-session';
import { createStyles, Select, TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import None from "../404";


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
    const { classes } = useStyles();
    const {propid}  = useParams();
    useEffect( ()=>{
        fetchItems(propid);
    },[propid]);
    const [items,setItems] = useState([]);
    const fetchItems = async(id)=>{
        const response=await fetch("http://localhost:4000/business/getSProp?pid="+id)
        const data=await response.json()
        
        setItems(data);
    }
    var assigned="";
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
                        </div>
                        <br/><br/>
                        <form style={{"padding-left":"5%"}}>

                        </form>
                        


                        </section>
                    ))
                }
                <h2>{propid}</h2>
                <h2>{assigned}</h2>
            </section>
        )
    }
    



}

export default Assign;
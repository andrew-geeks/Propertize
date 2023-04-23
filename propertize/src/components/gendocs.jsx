import { Bnav } from "./bnav";
import { Footer } from "./footer";
import axios from 'axios';
import { createStyles, Select, TextInput } from '@mantine/core';
import { useState } from "react";
import { showNotification } from '@mantine/notifications';
import { IconCheck,IconX } from '@tabler/icons';


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




function Gendocs(){
    const { classes } = useStyles();
    const formData = {name:"",address:"",tname:"",rentaddress:"",ramount:"",sdate:"",edate:""}
    const [formValues,setFormValues] = useState(formData);

    const formSubmit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:4000/business/gendocs/",formValues)
        .then(res=>{
            showNotification({
                title: 'Success',
                message: 'Agreement Generated!',
                autoClose: 5000,
                color: 'green',
                icon: <IconCheck />,
              })
            
        })
    }

    return(
        <section>
            <Bnav user={[{name:"test",image:""}]} tabs={
            [
              {name:"Dashboard",value:"bdashboard"},
              {name:"Add +",value:"addproperty"},
              {name:"Manage",value:"manage"},
              {name:"Generate Docs.",value:"gendocs"},
              {name:"Maintain",value:"mrequestshome"},
              {name:"Insights✨",value:"insights"}
            ]}/>
            <div style={{"text-align":"center"}}>
                <h1>Generate Rent Agreement</h1>
                <p>Enter all details</p>
            </div>
            <br/>
            <div style={{"padding-left":"6%"}}>
                <form method="post">
                    <div className="col">
                    <TextInput label="Enter Your name" placeholder="Full name" onChange={(e)=>setFormValues({...formValues,name:e.target.value})}  classNames={classes} required type="text"/>
                    </div>
                    <div className="col">
                    <TextInput label="Enter Your address" placeholder="Address"  classNames={classes} onChange={(e)=>setFormValues({...formValues,address:e.target.value})} required type="text"/>
                    </div>
                    <div className="col">
                    <TextInput label="Enter Tenant name" placeholder="Full name"  classNames={classes} onChange={(e)=>setFormValues({...formValues,tname:e.target.value})} required type="text"/>
                    </div>
                    <div className="col">
                        <TextInput label="Enter Renting Home address" placeholder="Address" onChange={(e)=>setFormValues({...formValues,rentaddress:e.target.value})}  classNames={classes} required type="text"/>
                    </div>
                    <div className="col">
                        <TextInput label="Enter Rent amount" placeholder="Amount" onChange={(e)=>setFormValues({...formValues,ramount:e.target.value})}  classNames={classes} required type="number"/>
                    </div>
                    <div className="col">
                    <TextInput label="Enter agreement start date" placeholder="dd/mm/yyyy" onChange={(e)=>setFormValues({...formValues,sdate:e.target.value})}  classNames={classes} required type="text"/>
                    </div>
                    <div className="col">
                    <TextInput label="Enter agreement end date" placeholder="dd/mm/yyyy" onChange={(e)=>setFormValues({...formValues,edate:e.target.value})} classNames={classes} required type="text"/>
                    </div>
                    <div className="col">
                        <button onClick={formSubmit} type="submit" class="focus:outline-none text-white bg-purple-700 hover:bg-yellow-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Generate</button>
                    </div>
                </form>
            </div>
            <Footer/>

        </section>
    )
}

export default Gendocs;
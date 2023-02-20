import { Bnav } from "../bnav"

import { createStyles, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
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

    return(
        <section>
            <Bnav user={[{name:"test",image:""}]} tabs={[{name:"Add +",value:"addproperty"},{name:"Manage",value:"manage"}]}/>
            <div style={{"text-align":"center"}}>
            <h2>Add your property!</h2>
            <em>Add and manage then with ease!</em>
            </div>
            
            <br/><br/>
            <div className="divForm">
          <TextInput label="Enter location" placeholder="Property Location"  classNames={classes} required type="text"/>
          <br/>
          <TextInput label="Enter Property Name" placeholder="Just a name.."  classNames={classes} required type="text"/>
          <br/>
          <TextInput label="BHK" placeholder="0,1,2,3 or more..."  classNames={classes} required type="number"/>
          <br/>
          <TextInput label="Enter Size" placeholder="In SQFT"  classNames={classes} required type="number"/>
          <br/>
          <Select
            style={{ marginTop: 20, zIndex: 2 }}
            data={['Carpet Area', 'Super Area']}
            placeholder="Pick one"
            label="Select area type"
            classNames={classes}
            required
          />
          <br/>
          <TextInput label="Enter property description" placeholder="max 30 characters"  classNames={classes} required type="text" maxLength="30"/>
          <br/>
          <Select
            style={{ marginTop: 20, zIndex: 2 }}
            data={['Residential', 'Commercial']}
            placeholder="Pick one"
            label="Select property type"
            classNames={classes}
            required
          />
          <br/>
          <TextInput label="Rent Amount" placeholder="In rupees"  classNames={classes} required type="number"/>
          <br/>
          <Select
            style={{ marginTop: 20, zIndex: 2 }}
            data={['Unfurnished', 'Semi-Furnished','Furnished']}
            placeholder="Pick one"
            label="Select Furnishing Status"
            classNames={classes}
            required
          />
          <br/>
          <Select
            style={{ marginTop: 20, zIndex: 2 }}
            data={['Bachelors', 'Family','Bachelors/Family']}
            placeholder="Pick one"
            label="Prefered Tenants"
            classNames={classes}
            required
          />
          </div>  
          <Footer/>        
        </section>

    )
}
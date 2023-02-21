import { Navbar } from "./navbar"

import { createStyles, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Footer } from "./footer";

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



export function Predict(){

    const { classes } = useStyles();

    return(
        <section>
            <Navbar/>
            <div style={{"text-align":"center"}}>
            <h2>Predict rent!</h2>
            <em>A machine learning engine that helps to predict rent for residential properties in select cities!</em>
            </div>
            
            <br/><br/>
            <div className="divForm">
            <form method="get">
            <Select
              style={{ marginTop: 20, zIndex: 2 }}
              data={['Kolkata', 'Chennai','Mumbai','Delhi','Bangalore']}
              placeholder="Pick one"
              label="Select your city"
              classNames={classes}
              required
            />
          <br/>
          <TextInput label="BHK" placeholder="1,2,3 or more..."  classNames={classes} required type="number"/>
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
          <TextInput label="Total Bathrooms" placeholder="1 or more"  classNames={classes} required type="number"/>
          <br/>
          <TextInput label="Apartment Floor" placeholder="0,1,2,3"  classNames={classes} required type="number"/>
          <br/>
          <TextInput label="Total Floors" placeholder="1,2,3"  classNames={classes} required type="number"/>
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
          <br/>
          <button type="submit" class="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Predict</button>
          
          </form>
    </div>       
      <Footer/>   
        </section>
    )
}
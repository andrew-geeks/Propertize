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
            <div className="">
            <form method="get">
            <div className="col">
              <Select
                style={{ marginTop: 20, zIndex: 2 }}
                data={['Kolkata', 'Chennai','Mumbai','Delhi','Bangalore']}
                placeholder="Pick one"
                label="Select your city"
                classNames={classes}
                required
              />
            </div>
            <div className="col">
            <TextInput label="BHK" placeholder="1,2,3 or more..."  classNames={classes} required type="number"/>             
            </div>
            <div className="col">
            <TextInput label="Enter Size" placeholder="In SQFT"  classNames={classes} required type="number"/>
            </div>
            <div className="col">
            <Select
            style={{ marginTop: 20, zIndex: 2 }}
            data={['Carpet Area', 'Super Area']}
            placeholder="Pick one"
            label="Select area type"
            classNames={classes}
            required
          />
            </div>
            <div className="col">
            <TextInput label="Total Bathrooms" placeholder="1 or more"  classNames={classes} required type="number"/>
            </div>
            <br/>
            <div className="col">
            <TextInput label="Apartment Floor" placeholder="0,1,2,3"  classNames={classes} required type="number"/>
            </div>
            <br/>
            <div className="col">
            <TextInput label="Total Floors" placeholder="1,2,3"  classNames={classes} required type="number"/>
            <br/>
            </div>
            <div className="col">
            <Select
            style={{ marginTop: 20, zIndex: 2 }}
            data={['Unfurnished', 'Semi-Furnished','Furnished']}
            placeholder="Pick one"
            label="Select Furnishing Status"
            classNames={classes}
            required
          />
            </div>
            <br/>
          <div className="col">
          <Select
            style={{ marginTop: 20, zIndex: 2 }}
            data={['Bachelors', 'Family','Bachelors/Family']}
            placeholder="Pick one"
            label="Prefered Tenants"
            classNames={classes}
            required
          />
          <br/>
          </div>
          <br/>
          <div className="col">
          <button type="submit" class="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Predict</button>

          </div>
          
          </form>
    </div>       
      <Footer/>   
        </section>
    )
}
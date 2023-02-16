import { Navbar } from "./navbar"

import { createStyles, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
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
            <div style={{"padding-left":"5%"}}>
                <h2>Predict Rent for a Property!</h2>
                <em>Predicts residential property rent based on given parameters, accuracy level upto 75%</em>
                <br/><br/>
                <p>Enter details below</p>
                <div>
                <Select
                    style={{ marginTop: 20, zIndex: 2 ,width:300}}
                    data={['Bangalore', 'Mumbai', 'Chennai', 'Kolkata','Delhi']}
                    placeholder=""
                    label="Select your metro city"
                    classNames={classes}
                />
                <br/>
                <TextInput style={{ marginTop: 20, zIndex: 2 ,width:300}} label="Size(sqft)" placeholder="" classNames={classes} />
                <br/>
                <Select
                    style={{ marginTop: 20, zIndex: 2 ,width:300}}
                    data={['Carpet Area', 'Super Area']}
                    placeholder=""
                    label="Select Area Type"
                    classNames={classes}
                />

            </div>
            </div>
        </section>
    )
}
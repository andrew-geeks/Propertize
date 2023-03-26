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


    return(
        <section>
                <Nav user={[{name:"test",image:""}]} tabs={[{name:"Maintenance",value:"maintenance"},{name:"Pay Rent",value:"payrent"}]}/>
            <h3>Maintain Prop</h3>
            <Footer/>
        </section>
    )
}

export default MaintainProp;

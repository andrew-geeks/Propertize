import { Footer } from "../footer";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { Card, Image, Text, Group, Badge, createStyles, Center, Button } from '@mantine/core';
import { IconRuler, IconMapPin, IconHome2 } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { Nav } from "../navbar1";

const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      width : '320px',
      height : '450px'
    },
    
    imageSection: {
      padding: theme.spacing.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  
    label: {
      marginBottom: theme.spacing.xs,
      lineHeight: 1,
      fontWeight: 700,
      fontSize: theme.fontSizes.xs,
      letterSpacing: -0.25,
      textTransform: 'uppercase',
    },
  
    section: {
      padding: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  
    icon: {
      marginRight: 5,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
    },
  }));




function Payhome(){
    const navigate = useNavigate();
    const { classes } = useStyles();
    let image = require("../../images/card_home.jpg");
    ReactSession.setStoreType("localStorage");

    return(
        <section>
            
        </section>
    )
}


export default Payhome;
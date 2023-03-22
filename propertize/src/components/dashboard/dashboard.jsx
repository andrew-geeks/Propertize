import {Nav} from "../navbar1";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Image, Text, Group, Badge, createStyles, Center, Button } from '@mantine/core';
import { IconRuler, IconMapPin, IconHome2 } from '@tabler/icons';

ReactSession.setStoreType("localStorage");

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


function Dashboard(){
    const navigate = useNavigate();
    let image = require("../../images/card_home.jpg");
    const { classes } = useStyles();
    const loggedIn = ReactSession.get("id");
    useEffect( ()=>{
        fetchItems(loggedIn);
    },[loggedIn]);

    const [props,setProps] = useState([]); //storing all assigned property data
    const fetchItems = async(loggedIn)=>{
        const response=await fetch("http://localhost:4000/property/getAprop?tid="+loggedIn)
        const data=await response.json()
        setProps(data);
    }
   
    if(loggedIn === undefined){
        return <Navigate replace to="/login" />;
    }
    else{
        return(
            <div>
                <Nav user={[{name:"test",image:""}]} tabs={["Maintain","Pay Rent","Download Docs"]}/>
                <div style={{"padding-left":"5%"}}>
                    <h3>Assigned Properties({props.length})</h3>
                    <hr/>
                    <div>
                        {props.map(prop=>(
                        <div className="col">
                            <Card withBorder radius="md" className={classes.card}>
                            <Card.Section className={classes.imageSection}>
                                <Image src={image} alt="Home"/>
                            </Card.Section>

                            <Group position="apart" mt="md">
                                <div>
                                <Text weight={500}>{prop.p_name}</Text>
                                <Text size="xs" color="dimmed">
                                    {prop.p_desc}
                                </Text>
                                </div>
                                <Badge variant="outline">{prop.p_type}</Badge>
                            </Group>
                            
                            <Card.Section className={classes.section} mt="md">
                                <Text size="sm" color="dimmed" className={classes.label}>
                                Basic details
                                </Text>
                                <Group spacing={8} mb={-8}>
                                <Center>
                                <IconHome2 size={18} className={classes.icon} stroke={1.5} />
                                <Text size="xs">{prop.bhk} BHK</Text>
                                </Center>
                                <Center>
                                <IconRuler size={18} className={classes.icon} stroke={1.5} />
                                <Text size="xs">{prop.p_size} SQFT</Text>
                                </Center>
                                <Center>
                                <IconMapPin size={18} className={classes.icon} stroke={1.5} />
                                <Text size="xs">{prop.location}</Text>
                                </Center>
                                </Group>
                            </Card.Section>
                            <Card.Section className={classes.section}>
                                <Group spacing={30}>
                                <div>
                                    <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                                    Rs. {prop.rent_amt}.00
                                    </Text>
                                    <Text size="sm" color="dimmed" weight={500} sx={{ lineHeight: 1 }} mt={3}>
                                    per month
                                    </Text>
                                </div>

                                <Button radius="xl" variant="outline" color="yellow" style={{ flex: 1 }}>
                                    View Details
                                </Button>
                                </Group>
                            </Card.Section>
                        </Card>
                    </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    
}

export default Dashboard;
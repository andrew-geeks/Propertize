import { Footer } from "../footer";
import { Bnav } from "../bnav";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Image, Text, Group, Badge, createStyles, Center, Button } from '@mantine/core';
import { IconGasStation, IconRuler, IconMapPin, IconHome2 } from '@tabler/icons';

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


ReactSession.setStoreType("localStorage");

function BDashboard(){
  const navigate = useNavigate();
  let image = require("../../images/card_home.jpg");
    const { classes } = useStyles();
    var value = ReactSession.get("id");
    useEffect( ()=>{
      fetchItems(value);
  },[value]);
  const [items,setItems] = useState([]);
  const fetchItems = async(id)=>{
      const response=await fetch("http://localhost:4000/property/getProp?id="+id)
      const data=await response.json()
      setItems(data);
      
  }

    return(
        <section>
            <div>
            <Bnav user={[{name:"test",image:""}]} tabs={
            [
              {name:"Dashboard",value:"bdashboard"},
              {name:"Add +",value:"addproperty"},
              {name:"Manage",value:"manage"},
              {name:"Generate Docs.",value:"gendocs"},
              {name:"Maintain",value:"mrequestshome"},
              {name:"Insights✨",value:"insights"}
            ]}/>

            <div style={{"padding-left":"5%"}}>
                <h4>Your Properties({items.length})</h4>
                <hr/>
                <div>
                    {
                      items.map(item=>(
                        <div className="col">
                        <Card withBorder radius="md" className={classes.card}>
                        <Card.Section className={classes.imageSection}>
                            <Image src={image} alt="Home"/>
                        </Card.Section>

                        <Group position="apart" mt="md">
                            <div>
                            <Text weight={500}>{item.p_name}</Text>
                            <Text size="xs" color="dimmed">
                                {item.p_desc}
                            </Text>
                            </div>
                            <Badge variant="outline">{item.p_type}</Badge>
                        </Group>
                        
                        <Card.Section className={classes.section} mt="md">
                            <Text size="sm" color="dimmed" className={classes.label}>
                            Basic details
                            </Text>
                            <Group spacing={8} mb={-8}>
                            <Center>
                            <IconHome2 size={18} className={classes.icon} stroke={1.5} />
                            <Text size="xs">{item.bhk} BHK</Text>
                            </Center>
                            <Center>
                            <IconRuler size={18} className={classes.icon} stroke={1.5} />
                            <Text size="xs">{item.p_size} SQFT</Text>
                            </Center>
                            <Center>
                            <IconMapPin size={18} className={classes.icon} stroke={1.5} />
                            <Text size="xs">{item.location}</Text>
                            </Center>
                            </Group>
                        </Card.Section>
                        <Card.Section className={classes.section}>
                            <Group spacing={30}>
                            <div>
                                <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                                Rs. {item.rent_amt}.00
                                </Text>
                                <Text size="sm" color="dimmed" weight={500} sx={{ lineHeight: 1 }} mt={3}>
                                per month
                                </Text>
                            </div>

                            <Button radius="xl" variant="outline" style={{ flex: 1 }} disabled={
                              item.p_status === "Assigned"?true:false} 
                              onClick={()=> navigate("/assign/"+item._id)}>
                                Assign
                            </Button>
                            </Group>
                        </Card.Section>
                    </Card>
                    </div>
                      ))
                    }
                    
                </div>
            </div>
            </div>
           
        </section>
        
    )

    
}

export default BDashboard;
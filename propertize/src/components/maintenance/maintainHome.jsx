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







function MaintainHome(){
    const navigate = useNavigate();
    const { classes } = useStyles();
    let image = require("../../images/card_home.jpg");
    ReactSession.setStoreType("localStorage");
    var value = ReactSession.get("id");
    useEffect( ()=>{
        fetchItems(value);
        
    },[value]);

    const [items,setItems] = useState([]);
    const fetchItems = async(id)=>{
        const response=await fetch("http://localhost:4000/property/getAprop?tid="+id)
        const data=await response.json()
        setItems(data);
    }


    console.log(items);
    return(
        <section>
            <Nav user={[{name:"test",image:""}]} tabs={[{name:"Dashboard",value:"dashboard"},{name:"Maintenance",value:"maintenance"},{name:"Pay Rent",value:"payrent"}]}/>
            <br/>
            <div style={{"text-align":"center"}}>
                <h2>Get your properties Maintained!</h2>
                <em>Request maintenance to the owner by choosing the appropriate property.</em>
                <br/>
                <a href="/mrequests">See your requests>></a>
            </div>
            <hr/>
            <div style={{"padding-left":"5%"}} className="col">
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

                            <Button radius="xl" style={{ flex: 1 }} color="orange" variant="outline" onClick={()=> navigate("/maintainprop/"+item._id)}>
                                Request
                            </Button>
                            </Group>
                        </Card.Section>
                    </Card>
                    </div>
                    ))
                }   
                
                </div>
                <br/>
                
              
                
                <Footer/>
        </section>
    )
}


export default MaintainHome;
import { Footer } from "../footer";
import { Bnav } from "../bnav";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, Image, Text, Group, Badge, createStyles, Center, Button } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      width : '320px',
      height : '395px'
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

  const mockdata = [
    { label: '4 passengers', icon: IconUsers },
    { label: '100 km/h in 4 seconds', icon: IconGauge },
    { label: 'Automatic gearbox', icon: IconManualGearbox },
    { label: 'Electric', icon: IconGasStation },
  ];  

ReactSession.setStoreType("localStorage");

function BDashboard(){
    const { classes } = useStyles();
    const features = mockdata.map((feature) => (
        <Center key={feature.label}>
          <feature.icon size={18} className={classes.icon} stroke={1.5} />
          <Text size="xs">{feature.label}</Text>
        </Center>
      ));

    return(
        <section>
            <div>
            <Bnav user={[{name:"test",image:""}]} tabs={[{name:"Add +",value:"addproperty"},{name:"Manage",value:"manage"},{name:"Generate Docs.",value:"gendocs"}]}/>
            <div style={{"padding-left":"5%"}}>
                <h4>Your Properties(0)</h4>
                <hr/>
                <div>
                    <Card withBorder radius="md" className={classes.card}>
                        <Card.Section className={classes.imageSection}>
                            <Image src="https://i.imgur.com/ZL52Q2D.png" alt="Tesla Model S" />
                        </Card.Section>

                        <Group position="apart" mt="md">
                            <div>
                            <Text weight={500}>Tesla Model S</Text>
                            <Text size="xs" color="dimmed">
                                Free recharge at any station
                            </Text>
                            </div>
                            <Badge variant="outline">25% off</Badge>
                        </Group>

                        <Card.Section className={classes.section} mt="md">
                            <Text size="sm" color="dimmed" className={classes.label}>
                            Basic details
                            </Text>

                            <Group spacing={8} mb={-8}>
                            {features}
                            </Group>
                        </Card.Section>

                        <Card.Section className={classes.section}>
                            <Group spacing={30}>
                            <div>
                                <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                                Rs. 00.00
                                </Text>
                                <Text size="sm" color="dimmed" weight={500} sx={{ lineHeight: 1 }} mt={3}>
                                per month
                                </Text>
                            </div>

                            <Button radius="xl" style={{ flex: 1 }}>
                                Rent now
                            </Button>
                            </Group>
                        </Card.Section>
                    </Card>
                </div>
            </div>
            </div>
            <Footer/>
        </section>
        
    )

    
}

export default BDashboard;
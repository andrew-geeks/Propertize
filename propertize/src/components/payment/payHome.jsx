import { Footer } from "../footer";
import { ReactSession } from 'react-client-session';
import { useEffect, useState } from "react";
import { Card, Image, Text, Group, Badge, createStyles, Center, Button } from '@mantine/core';
import { IconRuler, IconMapPin, IconHome2 } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { Nav } from "../navbar1";
import axios from 'axios';
import logo from "../../images/logo.png";
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

var date = new Date();

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


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }


    async function displayRazorpay(pid,oid,rent,rentmonth) {
        if(rentmonth === date.getMonth()+1){
            return showNotification({
                title: 'Done!',
                message: 'Rent paid already!',
                autoClose: 5000,
                color: 'blue',
                icon: <IconCheck />,
              })
        }
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axios.post("http://localhost:4000/payment/orders?rent="+rent);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_pcmMzVt3vZf4Pp", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Propertize Inc.",
            description: "Rental Payment Transaction",
            image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("http://localhost:4000/payment/success", data)
                .then(async res=>{
                    //inserting into payment coll
                    await axios.post("http://localhost:4000/payment/paydetails?p_id="+pid+"&o_id="+oid+"&u_id="+value+"&rent="+rent)
                    .then(async resp=>{
                        console.log(resp);
                        //updating property coll
                        await axios.post("http://localhost:4000/payment/uPayMonth?p_id="+pid+"&status=update")
                        .then(respo=>{
                            console.log(respo);
                            window.location.reload();
                        })
                        .catch(err=>{
                            console.log(err);
                        })

                    })
                    .catch(err=>{
                        console.log(err);
                    })
                })
                
                alert(result.data.msg);
            },
            prefill: {
                name: "Propertize Inc",
                email: "propertizeinc@gmail.com",
                contact: "+919923345741",
            },
            notes: {
                address: "Propertize, Bengaluru",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
}






    return(
        <section>
            <Nav user={[{name:"test",image:""}]} tabs={[{name:"Dashboard",value:"dashboard"},{name:"Maintenance",value:"maintenance"},{name:"Pay Rent",value:"payrent"}]}/>
            <br/>
            <div style={{"text-align":"center"}}>
                <h2>Pay your rent!</h2>
                <em>Rent amount will be directly transferred to tenant with o% commission!</em>
                <br/>
            </div>
            <hr/>
            <div style={{"padding-left":"5%"}}>
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

                            <Button radius="xl" style={{ flex: 1 }} color="red" variant="outline" onClick={()=>displayRazorpay(item._id,item.owner_id,item.rent_amt,item.p_rent_month)}>
                                Pay Rent
                            </Button>
                            </Group>
                        </Card.Section>
                    </Card>
                    </div>
                    ))
                }   
                
                </div>
                <br/>
        </section>
    )
}


export default Payhome;
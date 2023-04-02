import {
    createStyles,
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
  } from '@mantine/core';
  import { useNavigate } from "react-router-dom";
  import { Footer } from '../footer';
  import { IconArrowLeft } from '@tabler/icons';
  import { useEffect, useState } from "react";
  import axios from 'axios';
  import { Navigate, useParams } from "react-router-dom";
  import None from "../404";
  import { showNotification } from '@mantine/notifications';
  import { IconCheck,IconX } from '@tabler/icons';
  
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 26,
      fontWeight: 900,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  
    controls: {
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column-reverse',
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        width: '100%',
        textAlign: 'center',
      },
    },
  }));

  export function ResetPassword(){
    const { classes } = useStyles();
    const {rtoken}  = useParams();
    const navigate = useNavigate();
    //const [expired,setExpired] = useState("")

    useEffect( ()=>{
      fetchItems(rtoken);
    },[rtoken]);
    const [tdata,setTdata]=useState([]);
    const formData = {pswd:"",cpswd:""};
    const [formValues,setFormValues] = useState(formData);
    const fetchItems = async(id)=>{
      const response=await fetch("http://localhost:4000/account/checktoken?rtoken="+id)
      const data=await response.json()
      setTdata(data);

    }

    const formSubmit = (e) =>{
      e.preventDefault();
      if(formValues.pswd === "" || formValues.cpswd === ""){
        showNotification({
          title: 'Failed',
          message: 'Enter all fields!',
          autoClose: 5000,
          color: 'red',
          icon: <IconX />,
        })
      }
      else if(formValues.pswd!==formValues.cpswd){
        showNotification({
          title: 'Failed',
          message: 'Password is not matching!',
          autoClose: 5000,
          color: 'red',
          icon: <IconX />,
        })
      }
      else if(formValues.pswd.length<=6){
        showNotification({
          title: 'Failed',
          message: 'Password should have more than 6 characters!',
          autoClose: 5000,
          color: 'red',
          icon: <IconX />,
        })
      }
      else{
        //change password
        axios.post("http://localhost:4000/account/setnewpassword?rtoken="+rtoken,formValues)
        .then(async res=>{
          console.log(res);
          //remove token
          await axios.post("http://localhost:4000/account/remToken?rtoken="+rtoken)
          .then(resp=>{
            console.log(resp);
            //notify-redirect
            showNotification({
              title: 'Success',
              message: 'Password changed successfully!',
              autoClose: 5000,
              color: 'green',
              icon: <IconCheck />,
            })
            navigate("/login")
          })
          .catch(err=>{
            console.log(err);
          })
        })
        .catch(err=>{
          showNotification({
            title: 'Failed',
            message: 'Failed to change password!',
            autoClose: 5000,
            color: 'red',
            icon: <IconX />,
          })
        })
      }

    }

    if(tdata.length === 0){
      return <None/>
    }
    else{

    return (
        <section>
        <Container size={460} my={30}>
          <Title className={classes.title} align="center">
            Reset Your Password
            
          </Title>
          <Text color="dimmed" size="sm" align="center">
            This reset link expires soon
          </Text>
          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <form method=''>
              <TextInput label="Enter new password" placeholder="******" type='password'  required onChange={(e)=>setFormValues({...formValues,pswd:e.target.value})} />
              <TextInput label="Confirm your password" placeholder="******" type='password' required onChange={(e)=>setFormValues({...formValues,cpswd:e.target.value})}/>
              <Group position="apart" mt="lg" className={classes.controls}>
                <Button variant="outline" type='submit' className={classes.control} onClick={formSubmit}>Reset password</Button>
                </Group>
            </form>
          </Paper>
        </Container>
        <Footer/>
        </section>
      );
    }
  }
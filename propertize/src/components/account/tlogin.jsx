import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ReactSession } from 'react-client-session';

import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';
import { Footer } from '../footer';

let image = require("../../images/logo.png");
var actype = "";
var id="";


  
  export function AuthenticationTitle() {
    const navigate = useNavigate();
    const formData = {email:"",password:""};
    const [formValues,setFormValues] = useState(formData);
    const [wrong,setWrong] = useState("");

    //validate if logged in already
    
    function redirect(actype){
        if(actype === "tenant" ){
            navigate("/dashboard")
        }
        else{
            navigate("/bdashboard")
        }
    }

    const formSubmit = (e)=> {
        e.preventDefault();
        axios.post("http://localhost:4000/account/login",formValues)
        .then(async res =>{
            console.log(res.data)
            //retrieving id and saving in session
            await axios.get("http://localhost:4000/account/getId?mail="+formValues.email).then(res=>{

                console.log(res.data);
                id = res.data.id;
                //ReactSession.remove("id")  --remove session using key
                
            })
            ReactSession.setStoreType("localStorage");
            ReactSession.set("id",id);
            console.log("id:"+ReactSession.get("id"))

            //check owner or tenant?
            await axios.get("http://localhost:4000/account/getActype?id="+id).then(res=>{
                actype = res.data.actype;
                redirect(actype)
            })
            
            
            //navigating after successfull login
            
            
        })
        .catch( error => {
            console.log('actionError', error )
            setWrong("Wrong Email/Password⚠️!")
          });
    }

    return (
      <section>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor href="#" size="sm" onClick={(event) => event.preventDefault()}>
            Create account
          </Anchor>
        </Text>
        <p className="mail-warning">{wrong}</p>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@something.com" required />
          <PasswordInput label="Password" placeholder="
          
          " required mt="md" />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Anchor onClick={(event) => event.preventDefault()} href="#" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" variant='outline' radius="lg" color="lime">
            Sign in
          </Button>
        </Paper>
      </Container>
      <Footer/>
      </section>
    );
  }
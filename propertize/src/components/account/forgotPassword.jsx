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
  import { Footer } from '../footer';
  import { IconArrowLeft } from '@tabler/icons';
  import { useState } from "react";
  import axios from 'axios';
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
  
  export function ForgotPassword() {
    const { classes } = useStyles();
    const formData = {email:""};
    const [formValues,setFormValues] = useState(formData);
    const [wrong,setWrong] = useState("");
    const [reset,setReset] = useState(""); 

    const sendMail = (e)=>{
      e.preventDefault();
      axios.post("http://localhost:4000/account/forgotpassword",formValues)
      .then(res=>{
        setWrong("")
        setReset("Reset password link is sent to your mail!")
        showNotification({
          title: 'Success',
          message: 'Reset link sent to your mail📧!',
          autoClose: 5000,
          color: 'green',
          icon: <IconCheck />,
        })
      })
      .catch(err=>{
        setReset("")
        setWrong("Invalid Email")
        showNotification({
          title: 'Failed',
          message: 'Password is invalid!',
          autoClose: 5000,
          color: 'red',
          icon: <IconX />,
        })
      })
    }
  
    return (
      <section>
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          Forgot your password?
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your email to get a reset link
        </Text>
        <Text color="red" size="sm" align="center">
          {wrong}
        </Text>
        <Text color="green" size="sm" align="center">
          {reset}
        </Text>
  
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <form method=''>
            <TextInput label="Your email" placeholder="yourmail@something.com" value={formValues.email} onChange={(e)=> setFormValues({...formValues,email : e.target.value})} required />
            <Group position="apart" mt="lg" className={classes.controls}>
              <Anchor color="dimmed" size="sm" className={classes.control} href="/login">
                <Center inline>
                  <IconArrowLeft size={12} stroke={1.5} />
                  <Box ml={5}>Back to login page</Box>
                </Center>
              </Anchor>
              <Button variant="outline" type='submit' onClick={sendMail} className={classes.control}>Reset password</Button>
              </Group>
          </form>
        </Paper>
      </Container>
      <Footer/>
      </section>
    );
  }
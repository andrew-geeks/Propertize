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
    const [expired,setExpired] = useState("")

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
              <TextInput label="Enter new password" placeholder="******"  required />
              <TextInput label="Confirm your password" placeholder="******" required />
              <Group position="apart" mt="lg" className={classes.controls}>
                <Button variant="outline" type='submit' className={classes.control}>Reset password</Button>
                </Group>
            </form>
          </Paper>
        </Container>
        <Footer/>
        </section>
      );
  }
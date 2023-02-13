import {
    createStyles,
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
  } from '@mantine/core';
  import { IconGauge, IconUser, IconCookie } from '@tabler/icons';
  
  const mockdata = [
    {
      title: 'Extreme performance',
      description:
        'Supports thousands of customers all over the world with an uptime of  99.9%!',
      icon: IconGauge,
    },
    {
      title: 'Privacy focused',
      description:
        'Both owner and tenant data are stored securely in our servers. They are never shared to anyone.',
      icon: IconUser,
    },
    {
      title: 'No third parties',
      description:
        'They’re popular, but they’re rare. Nothing as such as third party.',
      icon: IconCookie,
    },
  ];
  
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 34,
      fontWeight: 900,
      [theme.fn.smallerThan('sm')]: {
        fontSize: 24,
      },
    },
  
    description: {
      maxWidth: 600,
      margin: 'auto',
  
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.fn.primaryColor(),
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  
    card: {
      border: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
    cardTitle: {
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.fn.primaryColor(),
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
      },
    },
  }));
  
  export function FeaturesCards() {
    const { classes, theme } = useStyles();
    const features = mockdata.map((feature) => (
      <Card key={feature.title} shadow="md" radius="md" className={classes.card} p="xl">
        <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
        <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text size="sm" color="dimmed" mt="sm">
          {feature.description}
        </Text>
      </Card>
    ));
    return (
      <Container size="lg" py="xl">
        <Group position="center">
          <Badge variant="filled" size="lg">
            Best Property Management Solution Ever
          </Badge>
        </Group>
  
        <Title order={2} className={classes.title} align="center" mt="sm">
          Manage all your assets in one place!
        </Title>
  
        <Text color="dimmed" className={classes.description} align="center" mt="md">
          State-of-the art web application that connects both the owner & tenant of a property seamlessly.
        </Text>
  
        <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {features}
        </SimpleGrid>
      </Container>
    );
  }
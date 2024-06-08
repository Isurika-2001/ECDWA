import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import { IconMusic, IconStar, IconUsers } from '@tabler/icons-react';

const plans = [
  {
    title: 'Free Plan',
    price: '$0',
    features: ['Access to limited tracks', 'Basic AI music recommendations', 'Advertisements included', 'No offline downloads'],
    icon: <IconMusic size={40} color="#4caf50" />
  },
  {
    title: 'Premium Plan',
    price: '$9.99/month',
    features: ['Unlimited tracks', 'Advanced AI music recommendations', 'Ad-free experience', 'Offline downloads', 'High-quality audio'],
    icon: <IconStar size={40} color="#ff9800" />
  },
  {
    title: 'Family Plan',
    price: '$14.99/month',
    features: [
      'Up to 6 accounts',
      'Unlimited tracks',
      'Advanced AI music recommendations',
      'Ad-free experience',
      'Offline downloads',
      'High-quality audio'
    ],
    icon: <IconUsers size={40} color="#2196f3" />
  }
];

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  textAlign: 'center',
  padding: theme.spacing(3),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.3s, box-shadow 0.3s',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
  }
}));

const StyledCardContent = styled(CardContent)(() => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3), // Added margin top here
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 4),
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const SubscriptionPlans = () => (
  <MainCard title="Subscription Plans">
    <Grid container spacing={4}>
      {plans.map((plan, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex' }}>
          <StyledCard>
            <StyledCardContent>
              <Box mb={2}>{plan.icon}</Box>
              <Box>
                <Typography variant="h5" component="div" gutterBottom>
                  {plan.title}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {plan.price}
                </Typography>
                <Box mt={2} textAlign="left">
                  {plan.features.map((feature, idx) => (
                    <Typography variant="body2" key={idx}>
                      • {feature}
                    </Typography>
                  ))}
                </Box>
              </Box>
              <StyledButton variant="contained">Subscribe Now</StyledButton>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  </MainCard>
);

export default SubscriptionPlans;

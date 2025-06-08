import * as React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: "Feature 1: Smart Analytics",
    description: "Our advanced analytics system provides real-time insights",
    points: [
      "Real-time data processing",
      "Customizable dashboards",
      "Automated reporting",
    ]
  },
  {
    title: "Feature 2: Intelligent Automation",
    description: "Automate your workflow with our smart tools",
    points: [
      "Workflow automation",
      "Scheduled tasks",
      "Smart notifications"
    ]
  },
  {
    title: "Feature 3: Secure Integration",
    description: "Seamlessly integrate with your existing systems",
    points: [
      "API integration",
      "Data encryption",
      "Role-based access control"
    ]
  }
];

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      bgcolor: 'black', 
      minHeight: '100vh',
      color: 'white'
    }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ 
            color: 'white',
            mb: 4,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Return to Dashboard
        </Button>

        <Typography variant="h3" component="h1" gutterBottom align="center">
          How It Works
        </Typography>
        <Typography variant="subtitle1" align="center" color="grey.400" paragraph>
          Quick overview of the features and how they work
        </Typography>
        
        {features.map((feature, index) => (
          <Paper 
            key={index} 
            elevation={2} 
            sx={{ 
              p: 3, 
              mb: 3,
              borderRadius: 2,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Typography color="white" variant="h5" component="h2" gutterBottom>
              {feature.title}
            </Typography>
            <Typography color="grey.400" paragraph>
              {feature.description}
            </Typography>
            <List>
              {feature.points.map((point, pointIndex) => (
                <ListItem key={pointIndex}>
                  <ListItemIcon>
                    <FiberManualRecordIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: 'white' }} primary={point} />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))}
      </Container>
    </Box>
  );
}
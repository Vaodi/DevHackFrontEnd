import * as React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: "Feature 1: Email-to-Structure Automation",
    description: "Forward emails with PDF attachments and plain-text instructions — our AI handles the rest.",
    points: [
      "Send simple instructions like: “Merge doc A and C, and place them in a Financial folder along with doc D.”",
      "Get a download link to a structured ZIP file within minutes",
      "No instructions? The AI intelligently merges and organizes what makes sense",
    ]
  },
  {
    title: "Feature 2: Smart Client Onboarding",
    description: "Send a welcome email — our system takes care of the rest.",
    points: [
      "Automatically detects new clients from welcome emails",
      "Creates client profiles in the CRM with no manual input",
      "Extracts document lists and their specific compliance requirements",
      "CC this 38e6ec0f2f500f1c2d8734325aafb487@inbound.postmarkapp.com when creating new client and make sure to ask for documents and requirements"
    ]
  },
  {
    title: "Feature 3: Automated Compliance Review",
    description: "Send documents and get instant, detailed feedback.",
    points: [
      "Automatically identifies the client from forwarded documents",
      "Reviews files for completeness and accuracy",
      "Updates document status in the database",
      "Sends a detailed compliance report via email, highlighting missing or non-compliant items",
      "Forward/send to 38e6ec0f2f500f1c2d8734325aafb487@inbound.postmarkapp.com the documents and specify in the body your client email."
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
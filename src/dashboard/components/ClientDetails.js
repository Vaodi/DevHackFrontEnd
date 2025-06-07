import * as React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ClientDetails() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, clientIndex } = location.state || {};
  const [selectedClient, setSelectedClient] = React.useState(null);

  React.useEffect(() => {
    if (userData && userData.clients && userData.clients[clientIndex]) {
      setSelectedClient(userData.clients[clientIndex]);
    }
  }, [userData, clientIndex]);

  if (!userData || !selectedClient) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ 
      p: 3, 
      minHeight: '100vh',
      backgroundColor: 'black',
      color: 'white'
    }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ 
          mb: 3,
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }
        }}
      >
        Back to Dashboard
      </Button>

      <Paper sx={{ 
        p: 3,
        backgroundColor: '#1a1a1a',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
      }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
          {selectedClient.name}'s Documents
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ color: '#b3b3b3' }}>
          Email: {selectedClient.email}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ color: '#b3b3b3' }}>
          User: {userData.name}
        </Typography>

        <List>
          {selectedClient.documents.map((doc, index) => (
            <ListItem
              key={index}
              sx={{
                border: '1px solid',
                borderColor: '#333',
                borderRadius: 1,
                mb: 1,
                backgroundColor: '#262626',
                '&:hover': {
                  backgroundColor: '#333'
                }
              }}
            >
              <ListItemText
                primary={
                  <Typography sx={{ color: 'white' }}>
                    {doc.name}
                  </Typography>
                }
                secondary={
                  <Stack spacing={1}>
                    <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                      Requirement: {doc.requirement}
                    </Typography>
                    {doc.reason && (
                      <Typography variant="body2" color="error">
                        Reason: {doc.reason}
                      </Typography>
                    )}
                    {doc.fileNames.length > 0 && (
                      <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                        Files: {doc.fileNames.join(', ')}
                      </Typography>
                    )}
                  </Stack>
                }
              />
              <Chip
                label={doc.valid ? 'Valid' : 'Invalid'}
                color={doc.valid ? 'success' : 'error'}
                sx={{ 
                  ml: 2,
                  backgroundColor: doc.valid ? '#2e7d32' : '#d32f2f',
                  color: 'white'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
} 
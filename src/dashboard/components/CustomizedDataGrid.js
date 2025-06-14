import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { columns as defaultColumns, rows } from '../internals/data/gridData';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function CustomizedDataGrid({ userData }) {
  const navigate = useNavigate();

  // Create columns inside the component
  const columns = React.useMemo(() => {
    // Create a new columns array without the conversions column
    const baseColumns = defaultColumns.filter(col => col.field !== 'conversions');
    
    // Add the View Details button column
    baseColumns.push({
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          startIcon={<VisibilityIcon />}
          onClick={() => navigate(`/client/${params.row.id}`, { 
            state: { 
              userData: userData,
              clientIndex: params.row.id.split('-')[1]
            } 
          })}
        >
          View
        </Button>
      ),
    });

    return baseColumns;
  }, [navigate, userData]);

  // Transform user data to match grid format if available
  const transformedRows = React.useMemo(() => {
    if (!userData) return rows;

    // Handle both array and single object cases
    const dataArray = Array.isArray(userData) ? userData : [userData];
    
    // Transform user data to match the grid format
    return dataArray.flatMap((user, userIndex) => 
      // Create a row for each client
      (user.clients || []).map((client, clientIndex) => ({
        id: `${user.id}-${clientIndex}`,
        pageTitle: client.name || 'No Client Name',
        status: 'Active',
        eventCount: client.documents?.filter(doc => !doc.valid)?.length || 0,
        users: client.documents?.filter(doc => doc.valid)?.length || 0,
        viewsPerUser: client.documents?.filter(doc => !doc.valid)?.length || 0,
        averageTime: client.email || 'No Email',
      }))
    );
  }, [userData]);

  return (
    <DataGrid
      checkboxSelection
      rows={transformedRows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from '../internals/data/gridData';

export default function CustomizedDataGrid({ userData }) {
  // Transform user data to match grid format if available
  const transformedRows = React.useMemo(() => {
    if (!userData) return rows;

    // Handle both array and single object cases
    const dataArray = Array.isArray(userData) ? userData : [userData];
    
    // Transform user data to match the grid format
    return dataArray.map((user, index) => ({
      id: index + 1,
      pageTitle: user.name || 'User Profile',
      status: user.status || 'Online',
      eventCount: user.eventCount || 0,
      users: user.users || 1,
      viewsPerUser: user.viewsPerUser || 0,
      averageTime: user.averageTime || '0m 0s',
      conversions: user.conversions || Array(30).fill(0),
    }));
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

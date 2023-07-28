import { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import { createPerson, deletePerson, updatePerson, usePersons } from "../api";
import styles from "../styles/Home.module.css";
import { Person } from "../types";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';

const columns: GridColDef[] = [
  {
    field: 'firstName',
    headerName: 'First name',
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    editable: true,
  },
  {
    field: 'gender',
    headerName: 'Sex',
    editable: true,
  },
  {
    field: 'birthdate',
    headerName: 'Birthdate',
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    editable: true,
  },
  {
    field: 'street1',
    headerName: 'Street1',
    editable: true,
  },
  {
    field: 'street2',
    headerName: 'Street2',
    editable: true,
  },
  {
    field: 'city',
    headerName: 'City',
    editable: true,
  },
  {
    field: 'state',
    headerName: 'State',
    editable: true,
  },
  {
    field: 'zip',
    headerName: 'Zip',
    editable: true,
  },
];

const Home: NextPage = () => {
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const uniqueKeys = ["id", "createdAt", "updatedAt"];
  const rowUpdated = (u: Person, o: Person) => {
    const uKeys = Object.keys(u);
    const oKeys = Object.keys(o);

    if (uKeys.length != oKeys.length) return true;

    for (let k of uKeys) {
      if (u[k] !== o[k] && !uniqueKeys.includes(k)) return true;
    }

    return false;
  }

  const processRowUpdateBen = (updatedRow, originalRow) => {
    if (rowUpdated(updatedRow, originalRow)) {
      updatePerson(updatedRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
    }
    return updatedRow;
  }

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const { data: persons, error } = usePersons();

  if (error != null) return <div>Error loading persons...</div>;

  if (persons == null) return <div>Loading...</div>;

  if (persons.length === 0) {
    return <div className={styles.emptyState}>Try adding a person ☝️️</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Directory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>Directory</h1>
      </header>

      <main className={styles.main}>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            editMode="row"
            rows={persons}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            processRowUpdate={processRowUpdateBen}
            onProcessRowUpdateError={handleProcessRowUpdateError}
          />
        </Box>
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </main>
    </div>
  );
};

export default Home;

import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { createPerson, deletePerson, updatePerson, usePersons } from "../../api";
import styles from "../../styles/Home.module.css";
import { Person } from "../../types";
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModes, GridRowModesModel, GridRowsProp, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";
import CONSTANTS from '../../utilities/constants';


interface CustomToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}
const emptyPerson: Person = {
  id: "",
  firstName: "",
  lastName: "",
  gender: "",
  phone: "",
  email: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  zip: "",
}

function CustomToolbar(props: CustomToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleAddPersonClick = () => {
    const id = crypto.randomUUID();
    setRows((oldRows) => [...oldRows, { ...emptyPerson, id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddPersonClick}>
        Add Person
      </Button>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const Home: NextPage = () => {
  const [initialState, setInitialState] = useState({
    columns: {
      columnVisibilityModel: {
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        gender: true,
        birthdate: true,
        street1: true,
        street2: true,
        city: true,
        state: true,
        zip: true,
        actions: true,
      },
    },
  })
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

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
      type: 'singleSelect',
      valueOptions: CONSTANTS.GENDERS,
    },
    {
      field: 'birthdate',
      headerName: 'Birthdate',
      editable: true,
      type: 'date',
      valueGetter: (p) => new Date(p.value)
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
      type: 'singleSelect',
      valueOptions: CONSTANTS.STATES,
    },
    {
      field: 'zip',
      headerName: 'Zip',
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    // setRows(rows.filter((row) => row.id !== id));
    deletePerson(id as string);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

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

  const processRowUpdate = (updatedRow, originalRow) => {
    if (updatedRow.isNew) {
      delete updatedRow.isNew;
      createPerson(updatedRow);
    }
    if (rowUpdated(updatedRow, originalRow)) {
      delete updatedRow.isNew;
      // let b = updatedRow.birthdate;
      // if (b) {
      //   b = `${b.getFullYear()}-${b.getMonth() + 1}-${b.getDay()}`;
      //   updatedRow.birthdate = b;
      // }
      updatePerson(updatedRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
    }
    return updatedRow;
  }

  // const handleProcessRowUpdateError = useCallback((error: Error) => {
  //   setSnackbar({ children: error.message, severity: 'error' });
  // }, []);

  const handleCloseSnackbar = () => setSnackbar(null);

  const { data: persons, error } = usePersons();
  useEffect(() => {
    if (!error && persons) setRows(persons);
  }, [persons]);

  const handleCellEditEvents = (params, event) => {
    event.defaultMuiPrevented = true;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Directory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            initialState={initialState}
            rows={rows}
            columns={columns}
            editMode="row"
            rowHeight={30}
            rowModesModel={rowModesModel}
            disableRowSelectionOnClick
            onCellDoubleClick={handleCellEditEvents}
            onRowDoubleClick={handleCellEditEvents}
            onCellKeyDown={handleCellEditEvents}

            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: CustomToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
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

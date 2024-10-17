import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { apiClientInstance } from "../../API/asaas";
import { api } from "../../services";


const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const [contacts, setContacts] = useState([]);


  const [openModal, setOpenModal] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    document: "",
    phone: ""
  });


  const fetchContacts = async () => {
    const response = await apiClientInstance.asaas(); 
    setContacts(response); 
  };

  useEffect(() => {

    fetchContacts(); 
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "cpfCnpj", headerName: "CPF/CNPJ" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Endereço",
      flex: 1,
    },
    {
      field: "cityName",
      headerName: "City",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      flex: 0.5,
    },
  ];

 
  const transformedContacts = contacts.map(contact => ({
    id: contact.id, 
    cpfCnpj: contact.cpfCnpj, 
    name: contact.name,
    phone: contact.mobilePhone || contact.phone, 
    email: contact.email || "Sem e-mail", 
    address: `${contact.address}, ${contact.addressNumber || ''}`, 
    cityName: contact.cityName,
    state: contact.state,
  }));


  const handleOpenModal = () => {
    setOpenModal(true);
  };

 
  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const handleChange = (e) => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value
    });
  };


  const handleSaveContact = async () => {
   
    try {
     
      await api.post('/asaas', newContact);
      
    } catch (error) {
      console.error('Erro ao salvar contato:', error.response?.data || error.message);
    }

    fetchContacts()
   
    setOpenModal(false);


  };

  return (
    <Box m="20px">
      <Header
        title="CLIENTES"
        subtitle="Gerencie ou adicione clientes"
      />
      <Box display="flex" justifyContent="flex-end" m="20px 0">
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Novo Cliente
        </Button>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={transformedContacts} // Usar os contatos transformados
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {/* Modal para adicionar novo cliente */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Adicionar Novo Cliente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            name="name"
            type="text"
            fullWidth
            variant="standard"
            value={newContact.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="E-mail"
            name="email"
            type="email"
            fullWidth
            variant="standard"
            value={newContact.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="CPF/CNPJ"
            name="document"
            type="text"
            fullWidth
            variant="standard"
            value={newContact.document}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Telefone"
            name="phone"
            type="text"
            fullWidth
            variant="standard"
            value={newContact.phone}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveContact} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contacts;

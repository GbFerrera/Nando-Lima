import React, { useState, useEffect } from "react";
import { Box, Button, Modal, TextField, Typography, Select, MenuItem, InputLabel, FormControl, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { apiClientInstance, apiSubscriptionsAssasInstance } from "../../API/asaas";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "phone", headerName: "Contato", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "value",
      headerName: "Valor",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          R$ {params.row.value.toFixed(2)}
        </Typography>
      ),
    },
    { field: "nextDueDate", headerName: "Data de Vencimento", flex: 1 },
  ];

  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [newSubscription, setNewSubscription] = useState({
    customer: "",
    billingType: "",
    nextDueDate: "",
    value: "",
    cycle: "",
    description: "",
    plan: "",
  });

  // Função para buscar clientes
  const fetchContacts = async () => {
    try {
      const response = await apiClientInstance.asaas();
      setContacts(response);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  // Função para buscar assinaturas
  const fetchSubscriptions = async () => {
    try {
      const response = await apiSubscriptionsAssasInstance.fectSubscriptions;
      console.log(response)
      setSubscriptions(response.data); // Armazena as assinaturas no estado
    } catch (error) {
      console.error("Erro ao buscar assinaturas:", error);
    }
  };

  // Chama as funções de busca ao montar o componente
  useEffect(() => {
    fetchContacts();
    fetchSubscriptions();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubscription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Nova Assinatura:", newSubscription);
    handleClose();
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Header title="ASSINATURAS" subtitle="Lista de assinaturas de planos" />

        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpen}
          sx={{ marginBottom: "20px" }}
        >
          Nova Assinatura
        </Button>
      </Box>

      {/* Modal para nova assinatura */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "black",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: 24,
            width: "400px",
          }}
        >
          <img src="https://api.pexels.com/v1/search?query=pizza" alt="" />
          <Typography variant="h6" id="modal-title" gutterBottom>
            Nova Assinatura
          </Typography>

          <FormControl fullWidth sx={{ marginBottom: "10px" }}>
            <InputLabel>Selecione o Cliente</InputLabel>
            <Select
              label="Selecione o Cliente"
              name="customer"
              value={newSubscription.customer}
              onChange={handleInputChange}
            >
              {contacts.map((contact) => (
                <MenuItem key={contact.id} value={contact.id}>
                  {contact.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: "10px" }}>
            <InputLabel>Tipo de Cobrança</InputLabel>
            <Select
              label="Tipo de Cobrança"
              name="billingType"
              value={newSubscription.billingType}
              onChange={handleInputChange}
            >
              <MenuItem value="WEEKLY">Semanal</MenuItem>
              <MenuItem value="BIWEEKLY">Quinzenal</MenuItem>
              <MenuItem value="MONTHLY">Mensal</MenuItem>
              <MenuItem value="QUARTERLY">Trimestral</MenuItem>
              <MenuItem value="SEMIANNUALLY">Semestral</MenuItem>
              <MenuItem value="YEARLY">Anual</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Data de Vencimento"
            name="nextDueDate"
            value={newSubscription.nextDueDate}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "10px" }}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} sx={{ marginRight: "10px" }}>Cancelar</Button>
            <Button onClick={handleSubmit} variant="contained">Criar assinatura</Button>
          </Box>
        </Box>
      </Modal>

      {/* DataGrid para exibir assinaturas */}
      <Box m="40px 0 0 0" height="75vh" sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
        }}>
        <DataGrid checkboxSelection rows={subscriptions} columns={columns} />
      </Box>
    </Box>
  );
};

export default Invoices;

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Card,
  CardContent,
  DialogContent,
  DialogTitle,
  Dialog
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Available services and base plans
const availableServices = [
  { id: 1, name: "Corte de Cabelo", price: 30 },
  { id: 2, name: "Barba", price: 20 },
  { id: 3, name: "Coloração", price: 50 },
  { id: 4, name: "Hidratação", price: 40 },
];

const basePlans = [
  { id: 1, name: "Plano Silver", price: 100, description: "Inclui 3 serviços básicos" },
  { id: 2, name: "Plano Gold", price: 200, description: "Inclui 5 serviços premium" },
];

// Payment options
const paymentMethods = [
  { id: 1, name: "Cartão de Crédito" },
  { id: 2, name: "Boleto" },
  { id: 3, name: "PIX" },
];

const AdminPlansPage = () => {
  const [plans, setPlans] = useState(basePlans);
  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [customPlan, setCustomPlan] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [serviceQuantity, setServiceQuantity] = useState(1);
  const [isCustom, setIsCustom] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [step, setStep] = useState(1); // Step state: 1 for plan creation, 2 for order details
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleCreatePlan = () => {
    setPlans((prevPlans) => [
      ...prevPlans,
      { id: plans.length + 1, ...newPlan },
    ]);
    setNewPlan({ name: "", price: "", description: "" });
  };

  const handleAddService = () => {
    const selected = availableServices.find((service) => service.name === selectedService);
    if (selected) {
      const existingService = customPlan.find((service) => service.id === selected.id);
      if (existingService) {
        setCustomPlan((prev) =>
          prev.map((item) =>
            item.id === selected.id
              ? { ...item, quantity: item.quantity + serviceQuantity }
              : item
          )
        );
      } else {
        setCustomPlan((prev) => [
          ...prev,
          { ...selected, quantity: serviceQuantity },
        ]);
      }
    }
    setSelectedService("");
    setServiceQuantity(1);
  };

  const handleSelectPlan = (event) => {
    const selected = event.target.value;
    setSelectedPlan(selected);
    setIsCustom(selected === "custom");
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmitOrder = () => {
    const orderSummary = {
      selectedPlan: selectedPlan === "custom" ? "Plano Customizado" : selectedPlan,
      customer: customerDetails,
      paymentMethod,
      services: customPlan,
    };

    // Lógica de envio do pedido aqui
  };

  const handleAdvance = () => {
    setStep(2); // Move to order details step
  };

  const handleBack = () => {
    setStep(1); // Go back to plan selection step
  };

  const handleCreateNewPlan = () => {
    // Lógica para criar um novo plano
    const newPlan = { id: plans.length + 1, name: '', price: '' };
    setSelectedPlan(newPlan);
    setOpen(true);
  };

  const handleOpenDialog = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedPlan(null);
  };

  const columns = [
    { field: "name", headerName: "Nome do Plano", flex: 1 },
    { field: "price", headerName: "Preço", flex: 1 },
    { field: "description", headerName: "Descrição", flex: 2 },
  ];

  const customPlanColumns = [
    { field: "name", headerName: "Serviço", flex: 1 },
    { field: "price", headerName: "Preço Unitário", flex: 1 },
    { field: "quantity", headerName: "Quantidade de sessões", flex: 1 },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      valueGetter: (params) => params.row.price * params.row.quantity,
    },
  ];

  return (
    <Box
      p={3}
      style={{
        backgroundColor: "transparent",
        overflow: "auto",
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Box p={3} style={{ backgroundColor: 'transparent', overflow: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Planos Bases
        </Typography>

        <Button variant="contained" color="primary" onClick={handleCreateNewPlan}>
          Criar Novo Plano
        </Button>

        <Grid container spacing={2} mt={2}>
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <Card variant="outlined" onClick={() => handleOpenDialog(plan)} style={{ cursor: 'pointer' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography variant="body1">
                    Preço: {plan.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Modal de Edição */}
        {selectedPlan && (
          <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>{selectedPlan.id ? 'Editar Plano' : 'Criar Novo Plano'}</DialogTitle>
            <DialogContent>
              <TextField
                label="Nome do Plano"
                value={selectedPlan.name}
                onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Preço"
                value={selectedPlan.price}
                onChange={(e) => setSelectedPlan({ ...selectedPlan, price: e.target.value })}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // Lógica para salvar as alterações do plano
                  handleCloseDialog();
                }}
                style={{ marginTop: '16px' }}
              >
                Salvar
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </Box>
      {step === 1 && (
        <>
          <Box mb={4} p={2} style={{ borderRadius: 8 }}>
            <Typography variant="h5" gutterBottom>
              Selecione um Plano Base ou Crie um Customizado
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>Planos</InputLabel>
              <Select value={selectedPlan} onChange={handleSelectPlan}>
                {plans.map((plan) => (
                  <MenuItem key={plan.id} value={plan.name}>
                    {plan.name} - R$ {plan.price}
                  </MenuItem>
                ))}
                <MenuItem value="custom">Plano Customizado</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Seção de criação de plano customizado */}
          {isCustom && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box mb={4} p={2} style={{ borderRadius: 8 }}>
                  <Typography variant="h5" gutterBottom>
                    Plano Customizado
                  </Typography>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Serviço</InputLabel>
                    <Select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      label="Serviço"
                    >
                      {availableServices.map((service) => (
                        <MenuItem key={service.id} value={service.name}>
                          {service.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Quantidade de sessões"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={serviceQuantity}
                    onChange={(e) => setServiceQuantity(Number(e.target.value))}
                    margin="normal"
                  />
                  <Button variant="contained" color="primary" onClick={handleAddService}>
                    Adicionar Serviço
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Plano Customizado</Typography>
                <DataGrid
                  rows={customPlan}
                  columns={customPlanColumns}
                  autoHeight
                  disableSelectionOnClick
                  pageSize={5}
                  getRowId={(row) => row.id}
                />
              </Grid>
            </Grid>
          )}
          <Button variant="contained" color="primary" onClick={handleAdvance}>
            Prosseguir para Detalhes do Pedido
          </Button>
        </>
      )}

      {step === 2 && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Detalhes do Cliente
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nome do Cliente"
                fullWidth
                name="name"
                value={customerDetails.name}
                onChange={handleCustomerChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                fullWidth
                name="email"
                value={customerDetails.email}
                onChange={handleCustomerChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Telefone"
                fullWidth
                name="phone"
                value={customerDetails.phone}
                onChange={handleCustomerChange}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Forma de Pagamento</InputLabel>
                <Select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  label="Forma de Pagamento"
                >
                  {paymentMethods.map((method) => (
                    <MenuItem key={method.id} value={method.name}>
                      {method.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Typography variant="h5" gutterBottom>
            Resumo do Pedido
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                Plano Selecionado: {selectedPlan === "custom" ? "Plano Customizado" : selectedPlan}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Serviços:
              </Typography>
              {customPlan.map((service) => (
                <Typography key={service.id} variant="body2">
                  {service.name} - {service.quantity} sessão(ões) - R$ {service.price * service.quantity}
                </Typography>
              ))}
            </Grid>
          </Grid>

          <Button variant="contained" color="primary" onClick={handleSubmitOrder} style={{ marginTop: "16px" }}>
            Finalizar Pedido
          </Button>
          <Button variant="text" color="secondary" onClick={handleBack} style={{ marginTop: "16px", marginLeft: "16px" }}>
            Voltar
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AdminPlansPage;

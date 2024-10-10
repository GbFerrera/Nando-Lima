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
  CardContent
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
  const [selectedPlan, setSelectedPlan] = useState("");
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

  };

  const handleAdvance = () => {
    setStep(2); // Move to order details step
  };

  const handleBack = () => {
    setStep(1); // Go back to plan selection step
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
      }}
    >
       <Box p={3} style={{ backgroundColor: 'transparent', overflow: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Planos Bases
      </Typography>

      <Grid container spacing={2}>
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card variant="outlined">
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

              {/* Tabela de serviços adicionados ao plano customizado */}
              <Grid item xs={12} md={6}>
                {customPlan.length > 0 && (
                  <Box p={2} style={{ borderRadius: 8 }}>
                    <Typography variant="h5" gutterBottom>
                      Serviços Selecionados
                    </Typography>
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid rows={customPlan} columns={customPlanColumns} pageSize={5} />
                    </div>
                  </Box>
                )}
              </Grid>
            </Grid>
          )}

          {/* Button to advance to the next step */}
          <Box>
            <Button variant="contained" color="primary" onClick={handleAdvance} disabled={!customPlan.length && isCustom}>
              Avançar
            </Button>
          </Box>
        </>
      )}

      {/* Step 2: Customer details and payment section */}
      {step === 2 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box mb={4} p={2} style={{ borderRadius: 8 }}>
              <Typography variant="h5" gutterBottom>
                Detalhes do Cliente e Pagamento
              </Typography>
              <TextField
                label="Nome do Cliente"
                variant="outlined"
                name="name"
                fullWidth
                value={customerDetails.name}
                onChange={handleCustomerChange}
                margin="normal"
              />
              <TextField
                label="Email do Cliente"
                variant="outlined"
                name="email"
                fullWidth
                value={customerDetails.email}
                onChange={handleCustomerChange}
                margin="normal"
              />
              <TextField
                label="Telefone do Cliente"
                variant="outlined"
                name="phone"
                fullWidth
                value={customerDetails.phone}
                onChange={handleCustomerChange}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Método de Pagamento</InputLabel>
                <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  {paymentMethods.map((method) => (
                    <MenuItem key={method.id} value={method.name}>
                      {method.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleSubmitOrder}>
                  Finalizar Pedido
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleBack}>
                  Voltar
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Exibir Resumo do Pedido à direita */}
          <Grid item xs={12} md={6}>
            <Box mb={4} p={2} style={{ borderRadius: 8 }}>
              <Typography variant="h5" gutterBottom>
                Resumo do Pedido
              </Typography>
              <Typography variant="body1">
                Plano Selecionado: {selectedPlan === "custom" ? "Plano Customizado" : selectedPlan}
              </Typography>
              <Typography variant="body1">
                Método de Pagamento: {paymentMethod}
              </Typography>
              <Typography variant="body1">Serviços:</Typography>
              {customPlan.map((service) => (
                <Typography key={service.id} variant="body2">
                  {service.name} - R$ {service.price} x {service.quantity} = R$ {service.price * service.quantity}
                </Typography>
              ))}
              <Typography variant="h6" mt={2}>
                Total: R$ {customPlan.reduce((total, service) => total + service.price * service.quantity, 0)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default AdminPlansPage;

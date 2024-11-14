import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, FormControl, InputLabel, Select, MenuItem, useTheme, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'; // Ícones do Lucide

const FinancialDashboard = () => {
  const theme = useTheme();
  
  // Cores aprimoradas com base no tema
  const colors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    background: theme.palette.background.paper,
    text: theme.palette.text.primary,
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
  };

  // Estado para transações
  const [entries, setEntries] = useState([
    { id: 1, description: 'Venda de produto', value: 300, type: 'entrada' },
    { id: 2, description: 'Pagamento de fornecedor', value: 150, type: 'saida' },
    { id: 3, description: 'Sangria de caixa', value: 100, type: 'sangria' },
  ]);
  
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    value: '',
    type: 'entrada',
  });

  const [open, setOpen] = useState(false);

  // Funções de controle do modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Manipulação de campos no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Adicionando nova transação
  const handleSubmit = () => {
    const newEntry = {
      ...newTransaction,
      id: entries.length + 1,
      value: parseFloat(newTransaction.value), // Convertendo para número
    };
    setEntries([...entries, newEntry]);
    setNewTransaction({
      description: '',
      value: '',
      type: 'entrada',
    });
    handleClose();
  };

  // Calculando o total em caixa
  const totalInCash = entries.reduce((acc, transaction) => {
    if (transaction.type === 'entrada') return acc + transaction.value;
    if (transaction.type === 'saida' || transaction.type === 'sangria') return acc - transaction.value;
    return acc;
  }, 0);

  // Funções de cálculos separados para entradas, saídas e sangrias
  const totalEntries = entries.filter(entry => entry.type === 'entrada').reduce((acc, entry) => acc + entry.value, 0);
  const totalExits = entries.filter(entry => entry.type === 'saida').reduce((acc, entry) => acc + entry.value, 0);
  const totalSangria = entries.filter(entry => entry.type === 'sangria').reduce((acc, entry) => acc + entry.value, 0);

  // Definindo as colunas da tabela
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'description', headerName: 'Descrição', flex: 1 },
    { field: 'value', headerName: 'Valor', flex: 1, renderCell: (params) => `R$ ${params.value.toFixed(2)}` },
    { field: 'type', headerName: 'Tipo', width: 130 },
  ];

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom color={colors.text}>
        Dashboard Financeiro
      </Typography>

      {/* Cards informativos */}
      <Box display="flex" justifyContent="space-between" mb="20px">
        <Card sx={{ width: '30%', backgroundColor: colors.success, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" color="white">Total de Entradas</Typography>
            <Typography variant="h5" color="white">R$ {totalEntries.toFixed(2)}</Typography>
            <ArrowUpCircle color="white" />
          </CardContent>
        </Card>
        <Card sx={{ width: '30%', backgroundColor: colors.error, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" color="white">Total de Saídas</Typography>
            <Typography variant="h5" color="white">R$ {totalExits.toFixed(2)}</Typography>
            <ArrowDownCircle color="white" />
          </CardContent>
        </Card>
        <Card sx={{ width: '30%', backgroundColor: colors.error, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" color="white">Total de Sangrias</Typography>
            <Typography variant="h5" color="white">R$ {totalSangria.toFixed(2)}</Typography>
            <ArrowDownCircle color="white" />
          </CardContent>
        </Card>
      </Box>

      {/* Total em caixa */}
      <Box display="flex" justifyContent="space-between" mb="20px">
        <Typography variant="h6" gutterBottom color={colors.text}>
          Total em Caixa: R$ {totalInCash.toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<DollarSign />}>
          Nova Transação
        </Button>
      </Box>

      {/* Modal para nova transação */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: colors.background,
            padding: '20px',
            borderRadius: '8px',
            boxShadow: 24,
            width: '400px',
          }}
        >
          <Typography variant="h6" gutterBottom color={colors.text}>
            Nova Transação
          </Typography>

          <TextField
            label="Descrição"
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: '10px' }}
          />

          <TextField
            label="Valor"
            name="value"
            value={newTransaction.value}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: '10px' }}
            type="number"
          />

          <FormControl fullWidth sx={{ marginBottom: '10px' }}>
            <InputLabel>Tipo de Transação</InputLabel>
            <Select
              label="Tipo de Transação"
              name="type"
              value={newTransaction.type}
              onChange={handleInputChange}
            >
              <MenuItem value="entrada">Entrada <ArrowUpCircle color={colors.success} /></MenuItem>
              <MenuItem value="saida">Saída <ArrowDownCircle color={colors.error} /></MenuItem>
              <MenuItem value="sangria">Sangria <ArrowDownCircle color={colors.error} /></MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} sx={{ marginRight: '10px' }}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              Adicionar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Tabela de transações */}
      <Box m="40px 0 0 0" height="400px" sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.secondary,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.secondary },
        }}>
        <DataGrid rows={entries} columns={columns} pageSize={5} />
      </Box>
    </Box>
  );
};

export default FinancialDashboard;

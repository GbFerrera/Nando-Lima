import React from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { Line } from 'react-chartjs-2';

// Dados de exemplo para gráficos
const salesData = [
    { funcionario: 'Funcionário A', vendas: 50 },
    { funcionario: 'Funcionário B', vendas: 75 },
    { funcionario: 'Funcionário C', vendas: 100 },
];

// Dados de exemplo para formas de pagamento
const paymentMethodsData = [
    { id: 'Cartão', value: 70 },
    { id: 'Dinheiro', value: 20 },
    { id: 'Transferência', value: 10 },
];

// Dados de vendas ao longo do tempo
const salesTrendData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
        {
            label: 'Vendas Mensais',
            data: [120, 190, 80, 70, 200, 250, 300, 310, 220, 180, 150, 240],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
        },
    ],
};

// Componente principal
const FinancialDashboard = () => {
    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard Financeiro
            </Typography>
           
        </div>
    );
};

export default FinancialDashboard;

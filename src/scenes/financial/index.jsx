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
            <Grid container spacing={4}>
                {/* Gráfico de Vendas por Funcionário */}
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: 20, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Vendas por Funcionário
                        </Typography>
                        <div style={{ height: 400 }}>
                            <ResponsiveBar
                                data={salesData}
                                keys={['vendas']}
                                indexBy="funcionario"
                                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                                padding={0.3}
                                colors={{ scheme: 'nivo' }}
                                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Funcionários',
                                    legendPosition: 'middle',
                                    legendOffset: 32,
                                }}
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Vendas',
                                    legendPosition: 'middle',
                                    legendOffset: -40,
                                }}
                                labelSkipWidth={12}
                                labelSkipHeight={12}
                                enableGridY={false}
                            />
                        </div>
                    </Paper>
                </Grid>

                {/* Gráfico de Formas de Pagamento */}
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: 20, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Formas de Pagamento
                        </Typography>
                        <div style={{ height: 400 }}>
                            <ResponsivePie
                                data={paymentMethodsData}
                                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                innerRadius={0.5}
                                padAngle={0.7}
                                cornerRadius={3}
                                colors={{ scheme: 'pastel1' }}
                                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                                arcLabelsTextColor="#ffffff"
                                arcLinkLabelsTextColor="#333333"
                                arcLabelsRadiusOffset={0.4}
                                enableArcLinkLabels={false}
                            />
                        </div>
                    </Paper>
                </Grid>

                {/* Gráfico de Tendência de Vendas */}
                <Grid item xs={12}>
                    <Paper style={{ padding: 20 }}>
                        <Typography variant="h6" gutterBottom>
                            Tendência de Vendas Mensais
                        </Typography>
                        <div style={{ height: 400 }}>
                            <Line data={salesTrendData} options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: 'Vendas ao Longo do Ano',
                                    },
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                            }} />
                        </div>
                    </Paper>
                </Grid>

                {/* Caixa e Sangria */}
                <Grid item xs={12}>
                    <Paper style={{ padding: 20 }}>
                        <Typography variant="h6" gutterBottom>
                            Caixa e Sangria
                        </Typography>
                        <Typography variant="body1">
                            <strong>Total em Caixa:</strong> R$ 5,000
                        </Typography>
                        <Typography variant="body1">
                            <strong>Sangria do Dia:</strong> R$ 200
                        </Typography>
                    </Paper>
                </Grid>

                {/* Tabela de Vendas Detalhadas */}
                <Grid item xs={12}>
                    <Paper style={{ padding: 20 }}>
                        <Typography variant="h6" gutterBottom>
                            Vendas Detalhadas
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Funcionário</strong></TableCell>
                                        <TableCell><strong>Valor Vendido</strong></TableCell>
                                        <TableCell><strong>Data</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {salesData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.funcionario}</TableCell>
                                            <TableCell>R$ {row.vendas}</TableCell>
                                            <TableCell>{new Date().toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default FinancialDashboard;

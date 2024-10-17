import React, { useState, useEffect } from 'react';
import { Paper, Typography, Switch, Button, TextField } from '@mui/material';
import { api } from "../../services";

const Settings = () => {
  const [banks, setBanks] = useState([]);
  const [isAssasEnabled, setIsAssasEnabled] = useState(false);
  const [token, setToken] = useState('');
  const [originalToken, setOriginalToken] = useState(''); // Estado para armazenar o token original

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await api.get('/bank');
        setBanks(response.data);
        
        if (response.data.length > 0) {
          setToken(response.data[0].token); 
          setOriginalToken(response.data[0].token);
          setIsAssasEnabled(response.data[0].name === 'asaas');
        }
      } catch (err) {
        console.error(`Erro ao buscar os dados do banco: ${err.response.data}`);
      }
    };

    fetchBankDetails();
  }, []);

  const handleSave = async () => {
    const configData = {
      isAssasEnabled,
      token: isAssasEnabled ? token : null,
      name: isAssasEnabled ? 'asaas' : '',
    };

    try {
      const response = await api.post('/bank', configData);
      console.log('Configurações salvas com sucesso:', response.data);
      // Atualiza o originalToken após salvar
      setOriginalToken(token); // Atualiza o token original com o novo valor
    } catch (error) {
      console.error('Erro ao salvar configurações:', error.response?.data || error.message);
    }
  };

  const isTokenChanged = token !== originalToken; // Verifica se o token foi alterado

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Configurações
      </Typography>

      <Paper style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h6" gutterBottom>
          Integração com Assas
        </Typography>
        <Typography variant="body1">
          Ative a integração com Assas e forneça os dados necessários.
        </Typography>
        <Switch
          checked={isAssasEnabled}
          onChange={() => setIsAssasEnabled(!isAssasEnabled)}
          color="primary"
          name="assasIntegration"
        />
        <span>{isAssasEnabled ? 'Ativado' : 'Desativado'}</span>
      </Paper>

      {isAssasEnabled && (
        <Paper style={{ padding: 20, marginBottom: 20 }}>
          <Typography variant="h6" gutterBottom>
            Dados de Integração
          </Typography>
          <TextField
            label="Token"
            variant="outlined"
            fullWidth
            value={token}
            onChange={(e) => setToken(e.target.value)} // Atualiza o estado do token
            style={{ marginBottom: 20 }}
          />
        </Paper>
      )}

      {/* Botão de salvar alterações só aparece se o token foi alterado */}
      {isTokenChanged && (
        <Button variant="contained" color="primary" onClick={handleSave}>
          Salvar Alterações
        </Button>
      )}
    </div>
  );
};

export default Settings;

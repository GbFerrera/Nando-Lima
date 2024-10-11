import React, { useState } from 'react';
import { Paper, Typography, Switch, Button, TextField } from '@mui/material';

const Settings = () => {
  const [isAssasEnabled, setIsAssasEnabled] = useState(false); // Estado para ativar/desativar a integração com Assas
  const [token, setToken] = useState(''); // Estado para armazenar o token da integração
  const [clientID, setClientID] = useState(''); // Estado para armazenar o ID do cliente

  // Função para lidar com o salvamento das configurações
  const handleSave = () => {
    // Aqui você pode adicionar a lógica para salvar as configurações, como enviar para uma API ou armazenar localmente
    console.log('Configurações salvas:', { isAssasEnabled, token, clientID });
  };

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
          onChange={() => setIsAssasEnabled(!isAssasEnabled)} // Alterna o estado da integração
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

      <Button variant="contained" color="primary" onClick={handleSave}>
        Salvar Configurações
      </Button>
    </div>
  );
};

export default Settings;

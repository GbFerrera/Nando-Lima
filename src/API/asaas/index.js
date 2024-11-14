import { api } from "../../services";

class ApiClient {
  async asaas() {

    try {
      const response = await api.get('/asaas');
      // Retorna todo o conteúdo da resposta se a lista não estiver vazia
      if (response.data && response.data.data.length > 0) {
        return response.data.data; // Retorna todos os clientes
      } else {
        console.log('Nenhum cliente encontrado.');
        return []; // Retorna um array vazio se não houver clientes
      }
    } catch (error) {
      console.error('Erro ao buscar clientes no servidor:', error.response?.data || error.message);
      return [];
    }
  
  
  }
  

  async DataBase(company_id) {
    
  }
}


class ApiSubscriptionsAssas {

  async fetchSubscriptions() {
    try {
      const response = await api.get('/asaas/subscriptions');
      if (response.data && response.data.data.length > 0) {
        return response.data.data; // Retorna apenas a lista de assinaturas
      } else {
        console.log('Nenhuma assinatura encontrada');
        return []; // Array vazio se não houver assinaturas
      }
    } catch (error) {
      console.error('Erro ao buscar assinaturas no servidor:', error.response?.data || error.message);
      return [];
    }
  }

}

const apiSubscriptionsAssasInstance = new ApiSubscriptionsAssas()
const apiClientInstance = new ApiClient();


export { apiClientInstance,apiSubscriptionsAssasInstance };

import React, { useState, useEffect, useCallback } from 'react';

import api from '../../services/api';
import StatusDeviceList from './StatusDeviceList';

/**
 * Container da lista de status com os cards dos dispoistivos
 *
 * @returns {React} Componente com a lista de status do sistema renderizada
 */
function StatusDeviceListContainer() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadStatusData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    console.log('Loading list');
    try {
      const { data: statusData } = await api.get(`/statuses/list`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setData(statusData);
      setError(null);
    } catch (error) {
      setError(error.response ? error.response.data.error : error.message);
    }
    setLoading(false);
  }, [user]);

  // Ao carregar o componente, o usuário é lido do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
  }, []);

  // Após o usuário ter sido lido do localStorage, a lista de status é carregada
  useEffect(() => {
    loadStatusData();
  }, [user, loadStatusData]);

  return <StatusDeviceList data={data} loading={loading} error={error} />;
}

export default StatusDeviceListContainer;

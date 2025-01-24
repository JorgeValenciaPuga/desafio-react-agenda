import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from './store/store';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import esES from 'antd/locale/es_ES';

function App() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  return (
    <Provider store={store}>
      <ConfigProvider locale={esES}>
        <div style={{ padding: '24px' }}>
          <h1>Agenda Previred - Mi agenda de contactos laboral</h1>
          <p>Aquí podrá encontrar o buscar a todos sus contactos agregados, agregar nuevos contactos y eliminar contactos no deseados.</p>
          
          <UserList onAddUser={() => setIsDrawerVisible(true)} />
          <UserForm 
            visible={isDrawerVisible}
            onClose={() => setIsDrawerVisible(false)}
          />
        </div>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
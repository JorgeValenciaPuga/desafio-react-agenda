import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Button, Avatar, Popconfirm, Alert } from 'antd';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { fetchUsers, deleteUser, setCurrentPage, setSearchQuery, clearError } from '../store/usersSlice';

const { Search } = Input;

const UserList = ({ onAddUser }) => {
  const dispatch = useDispatch();
  const { users, status, error, currentPage, searchQuery } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit: 10, searchQuery }));
  }, [dispatch, currentPage, searchQuery]);

  const handleSearch = (value) => {
    dispatch(setSearchQuery(value));
    dispatch(setCurrentPage(1));
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar 
            src={record.photo} 
            icon={<UserOutlined />}
            size="large"
          />
          {text}
        </div>
      ),
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="¿Está seguro de eliminar este contacto?"
          onConfirm={() => handleDelete(record.id)}
          okText="Sí"
          cancelText="No"
        >
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
          style={{ marginBottom: 16 }}
          onClose={() => dispatch(clearError())}
        />
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Search
          placeholder="Buscar contactos..."
          onSearch={handleSearch}
          style={{ width: 300 }}
          allowClear
        />
        <Button type="primary" onClick={onAddUser}>
          Agregar Contacto
        </Button>
      </div>
      
      <Table
        dataSource={users}
        columns={columns}
        loading={status === 'loading'}
        rowKey="id"
        pagination={{
          current: currentPage,
          onChange: (page) => dispatch(setCurrentPage(page)),
          pageSize: 10,
        }}
      />
    </div>
  );
};

export default UserList;
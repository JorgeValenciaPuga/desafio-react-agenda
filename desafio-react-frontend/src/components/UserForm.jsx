import React from 'react';
import { Form, Input, Button, Drawer } from 'antd';
import { useDispatch } from 'react-redux';
import { createUser } from '../store/usersSlice';

const UserForm = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    await dispatch(createUser(values));
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title="Agregar nuevo Contacto"
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      extra={
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Guardar
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="profileUrl"
          label="URL imagen de perfil"
          rules={[{ required: true, message: 'Por favor ingrese la URL de la imagen' }]}
        >
          <Input placeholder="Inserte la URL de la imagen de perfil" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Nombre"
          rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
        >
          <Input placeholder="Escriba el nombre de contacto" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descripción"
          rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
        >
          <Input.TextArea 
            placeholder="Agregue la descripción del contacto"
            rows={4}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserForm;
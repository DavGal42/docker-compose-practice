import React, {useEffect, useState} from 'react';
// import './index.css';
import {Button, Modal, Space, Table, Tag} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserByIdThunk, getUserThunk } from '../redux/userSlice.js';

const UserList  = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState();
  const users = useSelector((state)=>{
    return state.users.users;
  });
  const isDeleted = useSelector((state)=>{
    return state.users.isDeleted;
  });
  const showModal = (id) => {
    setIsModalOpen(true);
    setUserId(id)
  };

  const handleOk = () => {
    dispatch(deleteUserByIdThunk(userId));
    setUserId();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setUserId();
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: 'FirstName',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to = {`user/${record.id}`}>Edit {record.name}</Link>
          <a onClick={()=>showModal(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];
  useEffect(()=>{
      dispatch(getUserThunk())
  },[isDeleted])

  return (
    <>
    <Button onClick={()=>{navigate('/user')}}>Add User</Button>
     <Table dataSource={users.data} columns={columns}>   
    </Table>
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure to delete user?</p>
        
      </Modal>
  </>
)
};

export default UserList;
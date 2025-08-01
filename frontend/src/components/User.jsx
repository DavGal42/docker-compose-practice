import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {createUserThunk, getUserByIdThunk, updateUserByThunk} from '../redux/userSlice.js';
import { useEffect } from 'react';
import userList from "./UserList.jsx";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};


const User = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [form] = Form.useForm();
    const userByID = useSelector((state)=>{
      return state.users.userByID;
    });

    const isCreated = useSelector((state)=>{
     return state.users.isCreated;
})
const isUpdated = useSelector((state)=>{
  return state.users.isUpdated;
})
 useEffect(()=>{
      dispatch(getUserByIdThunk(id))
 },[])

    useEffect(() => {
      form.setFieldsValue({
          firstName: userByID?.data?.firstName,
          lastName: userByID?.data?.lastName,
          email: userByID?.data?.email,
          phone: userByID?.data?.phone
        
      });

  }, [form,userByID]);

    useEffect(()=>{
          if(isCreated || isUpdated)
            navigate("/")
    },[isCreated,isUpdated])

    const onFinish = (values) => {
      
      const datas = {...values,"id": id && id}
      id ? dispatch(updateUserByThunk(datas)) : dispatch(createUserThunk(values));;
    };
    return (<>
        <Button onClick={()=>{navigate('/')}}>User List</Button>
  <Form
    {...layout}
    name="user"
    onFinish={onFinish}
    form={form}
    style={{ maxWidth: 600 }}
    validateMessages={validateMessages}
  >
    <Form.Item name='firstName' label="FirstName" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name='lastName' label="LastName" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name='email' label="Email" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name='phone' label="Phone" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
 
  
  
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </>
)

}

export default User;
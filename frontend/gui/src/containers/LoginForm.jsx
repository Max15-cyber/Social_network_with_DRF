import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spin';
import * as actions from '../store/actions/auth'

const Login = (props) => {
    let navigate = useNavigate()
    const [state, setState] = useState({
        userName: "",
        password: "",
    })

    const changeUserNameValue = event => setState({
        ...state,
        userName: event.target.value,
    })

    const changePasswordValue = event => setState({
        ...state,
        password: event.target.value,
    })

    const handleFormSubmit = () => {
        // console.log(state.userName, state.password)
        props.onAuth(state.userName, state.password)
        navigate('/')
    }

    let errorMessage = null
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>
    }

    return (
        <div>
            {errorMessage}
            {
                props.loading ?
                    <Spinner /> :
                    <Form onFinish={handleFormSubmit}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input value={state.userName} onChange={changeUserNameValue} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password value={state.password} onChange={changePasswordValue} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button> or <NavLink to='/signup'>
                                Sign Up
                            </NavLink>
                        </Form.Item>
                    </Form>
            }
        </div>
    )

};

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);


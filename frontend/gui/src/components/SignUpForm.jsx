import { Button, Form, Input } from 'antd';
import * as actions from '../store/actions/auth'
import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignUpForm = (props) => {

    let navigate = useNavigate()
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
    })

    const changeUserNameValue = event => setState({
        ...state,
        username: event.target.value,
    })

    const changeEmailValue = event => setState({
        ...state,
        email: event.target.value,
    })

    const changePasswordValue = event => setState({
        ...state,
        password: event.target.value,
    })

    const handleFormSubmit = () => {
        // console.log(state.userName, state.password)
        props.onCreateUser(state.username, state.email, state.password)
        navigate('/')
    }

    return(
    <Form
        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        style={{
            maxWidth: 600,
        }}
        initialValues={{
            remember: true,
        }}
        autoComplete="off"
        onFinish={handleFormSubmit}
    >
        <Form.Item
            label="Username"
            name="username">
            <Input value={state.username} onChange={changeUserNameValue} />
        </Form.Item>

        <Form.Item
            label="Email"
            name="email">
            <Input value={state.email} onChange={changeEmailValue} />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password">
            <Input.Password value={state.password} onChange={changePasswordValue} />
        </Form.Item>

        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
    )
};

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateUser: (username, email, password) => dispatch(actions.authSignUp(username, email, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);


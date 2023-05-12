import { Button, Form, Input } from 'antd';

const SignUpForm = () => (
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
    >
        <Form.Item
            label="Username"
            name="username">
            <Input />
        </Form.Item>

        <Form.Item
            label="Email"
            name="email">
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password">
            <Input.Password />
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
);
export default SignUpForm;
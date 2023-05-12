import { Button, Form } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const DeleteForm = (props) => {
    /* const [state, setState] = useState({articles: props.data}) */
    const handleFormSubmit = (articleId) => {
        return axios.delete(`http://127.0.0.1:8000/api/v1/postdestroy/${articleId}/`, {
            headers: {
                Authorization: 'Token ' + '287da07f8f1103d1ced56072f4b40c8d1c5f43de'
            }
        })
            .then(response => props.setState({ articles: props.articles.filter(post => post.id !== articleId) }))
        /* .then(response => console.log(props)) */
    }
    return (
        <Form onSubmitCapture={event => handleFormSubmit(props.articleId)}>
            <Form.Item>
                <Button type="primary" htmlType="submit">Delete</Button>
            </Form.Item>
        </Form>
    )
};

export default DeleteForm;
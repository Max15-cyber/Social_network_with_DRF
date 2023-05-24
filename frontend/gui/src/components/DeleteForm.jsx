import { Button, Form } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { getToken } from '../store/utility';

const DeleteForm = (props) => {
    
    const token = getToken()
    const handleFormSubmit = (articleId) => {
        if (!token) {
            return
        }
        return axios.delete(`http://127.0.0.1:8000/api/v1/postdestroy/${articleId}/`, {
            headers: {
                Authorization: 'Token ' + token
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
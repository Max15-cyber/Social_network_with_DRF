import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import CustomForm from "../components/Form";

const ArticleDetailView = () => {
    const [state, setState] = useState({
        article: {},
    })
    const articleId = useParams().id
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/postlist/${articleId}/`, {
            headers: {
                Authorization: 'Token ' + '287da07f8f1103d1ced56072f4b40c8d1c5f43de'
            }
        })
            .then(response => setState({
                article: response.data,
            }))
    }, [])

    return (
        <div>
            <Card title={state.article.title}>
                <p>{state.article.content}</p>
                <br />
                <br />
                <i>Category: {state.article.cat}</i>
            </Card>
            <h2>Update post</h2>
            <CustomForm requestType='PUT' articleId={articleId} />
        </div>
    )
}

export default ArticleDetailView;
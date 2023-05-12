import PostList from "../components/Article"
import axios from "axios"
import {useEffect, useState} from "react"
import CustomForm from "../components/Form"


const ArticleListView = () => {
    const [state, setState] = useState({
        articles: [],
    })
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/v1/postlist/", {
            headers: {
                Authorization: 'Token ' + '287da07f8f1103d1ced56072f4b40c8d1c5f43de'
            }
        })
        .then(response => setState({
            articles: response.data,
        }))
    }, [])  
    return(
        <div>
            <h2>Create an Article...</h2>
            <CustomForm requestType='POST' articleId={0} setState={setState} articles={state.articles} />
            <br />
            <br />
            <PostList data={state.articles} setState={setState}/>
        </div>
    )
} 

export default ArticleListView;
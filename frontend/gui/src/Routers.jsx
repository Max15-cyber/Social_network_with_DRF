import { Routes, Route } from 'react-router-dom' 
import ArticleListView from './containers/ArticleListView'
import ArticleDetailView from './containers/ArticleDetailView'
import Login from './containers/LoginForm'
import SignUpForm from './components/SignUpForm'

const BaseRouter = () => {
    return(
        <div>
            <Routes>
                <Route path='/' element={<ArticleListView />} />
                <Route path='/:id' element={<ArticleDetailView />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUpForm />} />
            </Routes>
        </div>
    )
}


export default BaseRouter;
import './App.css';
import 'antd/dist/reset.css';
import CustomLayout from './containers/Layout';
import { BrowserRouter } from 'react-router-dom';
import BaseRouter from './Routers';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth'
import { useEffect } from 'react';


function App(props) {
  useEffect(() => {
    props.onTryAuthSighUp()
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <CustomLayout {...props} >
          <BaseRouter />
        </CustomLayout>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => ({isAuthenticated: state.token})
const mapDispatchToProps = dispatch => {
  return {
    onTryAuthSighUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth'

const { Header, Content, Footer } = Layout;

const CustomLayout = props => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item><NavLink to='/'>Home</NavLink></Breadcrumb.Item>

            {
              props.isAuthenticated ?
                <Breadcrumb.Item onClick={props.logout} style={{
                  cursor: 'pointer'
                }}>Logout</Breadcrumb.Item> :
                <Breadcrumb.Item><NavLink to='/login'>Login</NavLink></Breadcrumb.Item>
            }
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          {props.children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(actions.authLogout())
    }
}



export default connect(null, mapDispatchToProps)(CustomLayout);
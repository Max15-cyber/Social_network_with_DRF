import { Space, Spin } from 'antd';

const Spinner = () => (
  <Space>
    <Space>
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </Space>
  </Space>
);

export default Spinner;
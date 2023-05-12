import { Avatar, List, Space } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import DeleteForm from './DeleteForm';

const PostList = (props) => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 10,
    }}
    dataSource={props.data}
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<NavLink to={`/${item.id}`}>{item.title}</NavLink>}
          description={item.content}
  
        />
      {item.time_update.substr(0, 10)}
      <DeleteForm articleId={item.id} setState={props.setState} articles={props.data}/>
      </List.Item>
    )}
  />
  
);

export default PostList;
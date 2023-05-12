import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';

const { TextArea } = Input

const CustomForm = (props) => {
  const [state, setState] = useState({
    cats: [
      {
        name: "Backend",
        id: 1,
      },
    ],
    catSelectedId: 1,
    titleValue: "",
    contentValue: "",
  })
  /*   const [titleValue, setTitleValue] = useState('') */
  const changeTitleValue = event => setState({
    ...state,
    titleValue: event.target.value,
  })
  const changeContentValue = event => setState({
    ...state,
    contentValue: event.target.value,
  })

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/v1/cats/", {
      headers: {
        Authorization: 'Token ' + '287da07f8f1103d1ced56072f4b40c8d1c5f43de'
      }
    })
      .then(response => setState({
        cats: response.data,
        catSelectedId: response.data[0].id,
      }))
  }, [])

  const handleChange = (value) => {
    setState({ ...state, catSelectedId: value })
  }

  const handleFormSubmit = (event, requestType, articleId) => {
    const title = event.target.elements.title.value
    const content = event.target.elements.content.value

    switch (requestType) {
      case 'POST':
        return axios.post("http://127.0.0.1:8000/api/v1/postlist/", {
          title,
          content,
          cat: state.catSelectedId,
          user: 1,
        },
          {
            headers: {
              Authorization: 'Token ' + '287da07f8f1103d1ced56072f4b40c8d1c5f43de'
            }
          }
        )
          .then(response => props.setState({
            articles: [response.data, ...props.articles],
          }))
          .then(response => setState({ ...state, titleValue: "", contentValue: "" }))
      case 'PUT':
        return axios.put(`http://127.0.0.1:8000/api/v1/postlist/${articleId}/`, {
          title,
          content,
          cat: state.catSelectedId,
          user: 1,
        },
          {
            headers: {
              Authorization: 'Token ' + '287da07f8f1103d1ced56072f4b40c8d1c5f43de'
            }
          }
        )
          .then(response => console.log(response.data))
          .then(response => setState({
            ...state,
            titleValue: "",
            contentValue: "",
          }))

    }
  }

  return (
    <Form
      name="basic"
      style={{
        maxWidth: 600,
      }}
      onSubmitCapture={event => handleFormSubmit(event, props.requestType, props.articleId)}>
      <Form.Item label="Title">
        <Input placeholder="input the title here" name='title' required value={state.titleValue} onChange={changeTitleValue} />
      </Form.Item>
      <Form.Item label="Content">
        <TextArea rows={4} placeholder="Enter content" name='content' required value={state.contentValue} onChange={changeContentValue} />
      </Form.Item>
      <Form.Item>
        <Select
          name='cat'
          defaultValue={state.cats[0].name}
          onChange={handleChange}
          options={state.cats.map(cat => ({
            value: cat.id,
            label: cat.name,
          }))}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType='submit'>Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;


import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
interface IProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAdd }: IProps) => {
  return (
    <Form className='todoInput' onSubmit={handleAdd}>
      <Row>
        <Col xs={11}>
          <Form.Control
            placeholder='Enter a task'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </Col>
        <Col>
          <Button type='submit' className='mb-2'>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InputField;

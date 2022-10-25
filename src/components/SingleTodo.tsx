import { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, Form } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Todo } from '../model';

interface IProps {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ index, todo, todos, setTodos }: IProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(todos.map((el) => (el.id === id ? { ...todo, isDone: !todo.isDone } : el)));
  };
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((el) => el.id !== id));
  };

  const toggleEditMode = () => {
    if (!isEdit && !todo.isDone) {
      setIsEdit(!isEdit);
    }
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
    setIsEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Card
          className={`todoCard ${snapshot.isDragging ? 'drag' : ''}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card.Body className='todoCardBody'>
            {isEdit ? (
              <Form className='todoInput' onSubmit={(e) => handleEdit(e, todo.id)}>
                <Form.Control
                  ref={inputRef}
                  placeholder='Enter a task'
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                />
              </Form>
            ) : todo.isDone ? (
              <s>{todo.todo}</s>
            ) : (
              <div>{todo.todo}</div>
            )}

            <div className='todoCardBodyIcons'>
              <div className='todoCardBodyIcon' onClick={() => toggleEditMode()}>
                <AiFillEdit />
              </div>
              <div className='todoCardBodyIcon' onClick={() => deleteTodo(todo.id)}>
                <AiFillDelete />
              </div>
              <div className='todoCardBodyIcon' onClick={() => handleDone(todo.id)}>
                <MdDone />
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  );
};

export default SingleTodo;

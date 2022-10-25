import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Todo } from '../model';
import SingleTodo from './SingleTodo';

interface IProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos, completedTodos, setCompletedTodos }: IProps) => {
  return (
    <div className='container'>
      <Droppable droppableId='TodosList'>
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className='activeTasks'>Active Tasks</div>
            {todos.map((todo, idx) => (
              <SingleTodo key={todo.id} index={idx} todo={todo} todos={todos} setTodos={setTodos} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className='container'>
        <Droppable droppableId='TodosRemove'>
          {(provided, snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className='activeTasks'>Completed Tasks</div>
              {completedTodos.map((todo, idx) => (
                <SingleTodo
                  key={todo.id}
                  index={idx}
                  todo={todo}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TodoList;

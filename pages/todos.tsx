import React, { useCallback, useRef } from 'react';
import { Todo, todoApi } from 'pages/app/state/rtkApi';
import { GetServerSideProps } from 'next';
import Content from './Production/Layout/Content';

export const Todos = () => {
  const { data: todos } = todoApi.useGetAllQuery();
  const [updateTodo] = todoApi.useUpdateTodoMutation();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();
  const [addTodo] = todoApi.useAddTodoMutation();

  const onToggle = useCallback(
    (todo: Todo) => updateTodo({ ...todo, done: !todo.done }),
    [updateTodo]
  );

  const onDelete = useCallback((todo: Todo) => deleteTodo(todo), [deleteTodo]);

  const textRef = useRef<HTMLInputElement>(null);

  const onAdd = useCallback(
    () => addTodo(textRef.current!.value ?? ''),
    [addTodo]
  );

  return (
    <Content title="todos" description="todos page">
      <div className="todoApp">
        <div className="todos">
          {todos?.map((todo) => (
            <React.Fragment key={todo.id}>
              <div>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => onToggle(todo)}
                />
                <span>{todo.text}</span>
              </div>
              <button onClick={() => onDelete(todo)}>Delete</button>
            </React.Fragment>
          ))}
        </div>
        <div className="todoAdd">
          <input type="text" ref={textRef} />
          <button onClick={onAdd}>Add</button>
        </div>
      </div>
    </Content>
  );
};

export default Todos;

// export const getServerSideProps = async ({ req, res }) => {
// export const getServerSideProps = async (ctx) => {
// export const getServerSideProps = async () => {
//   console.log(req, res);
//   console.log(ctx.req);
//   console.log(ctx.res);
//   await fetch(`${process.env.NEXTAUTH_URL}/api/todos`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data));

//   return { props: {} };
// };

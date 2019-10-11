import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
import 'source-map-support/register';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let logTodo = '';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  await axios.get(url).then(response => {
    const todo = response.data as Todo;

    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;

    logTodo = `The Todo with id: ${id}. Has a title of: ${title}. Is it finished? ${completed}`;
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: logTodo,
      input: event,
    }, null, 2),
  };
}

import { NextApiRequest, NextApiResponse } from 'next';
import {
  runTransaction,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  Firestore,
  FirestoreDataConverter,
  getFirestore,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { firestoreConnect as db } from 'pages/server/lib/database/firebaseFirestore';
import { timestamp } from 'pages/server/lib/database/firebaseStorage';

interface Todo {
  id: number;
  text: string;
  active: boolean;
  done: boolean;
}

// let todos: Todo[] = [
//     'NestJS',
//     'GraphQL',
//     'Apollo',
//     'TypeScript',
//     'React',
//     'Redux',
//     'React Query',
//     'Angular',
//     'Vue',
//     'D3',
//     'Svelte',
//     'SolidJS',
//     'NextJS',
//     'AWS',
//   ].map((text, index) => ({
//     id: index + 1,
//     text: `Learn ${text}`,
//     active: true,
//     done: false,
//   }));

export type textValue = string;

export interface Text {
  stringValue: textValue;
}

export interface TodosDoc {
  name?: string;
  fields?: { text: Text };
  createdTime?: string;
  updateTime?: string;
}

export const retrieveTodosDB = async () => {
  const firestoreTodos = (await fetch(
    `https://firestore.googleapis.com/v1/projects/photo-gallery-upload/databases/(default)/documents/todos`
  )
    .then((response) => response.json())
    .then((data) => Object.values(data)[0])) as Object[];

  let todosDBCollection = [];

  firestoreTodos.forEach((todosDocument: TodosDoc) => {
    todosDBCollection.push(Object.values({ ...todosDocument.fields.text })[0]);
  });

  let todosDB: Todo[] = todosDBCollection.map((text, index) => ({
    id: index + 1,
    text: `Edit ${text}`,
    active: true,
    done: false,
  }));

  return todosDB;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //   const firestoreTodos = await fetch(
  //     `https://firestore.googleapis.com/v1/projects/photo-gallery-upload/databases/(default)/documents/todos`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => Object.values(data)[0]);

  // let firestoreTodos: [] | unknown

  //   const firestoreTodos = (await fetch(
  //     `https://firestore.googleapis.com/v1/projects/photo-gallery-upload/databases/(default)/documents/todos`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => Object.values(data)[0])) as Object[];

  //   //   console.log(firestoreTodos);

  //   let todosDBCollection = [];

  //   firestoreTodos.forEach((todosDocument: TodosDoc) => {
  //     todosDBCollection.push(Object.values({ ...todosDocument.fields.text })[0]);
  //   });

  //   //   console.log(todosDBCollection);

  //   let todosDB: Todo[] = todosDBCollection.map((text, index) => ({
  //     id: index + 1,
  //     text: `Edit ${text}`,
  //     active: true,
  //     done: false,
  //   }));

  //   console.log(todosDB);

  let [...todosDB] = await retrieveTodosDB();

  const todoData = req.body;

  const { id, text, active, done } = todoData;

  if (req.method === 'POST') {
    // const todos = {
    //   //   id,
    //   text,
    //   //   active,
    //   //   done,
    // };
    // await addDoc(collection(db, 'todos'), todos);

    // // return res.status(201).json({
    // //   message: `Added ${text}!`,
    // // });

    const todo = {
      id: todosDB.length + 1,
      text,
      active: true,
      done: false,
    };
    todosDB.push(todo);
    await addDoc(collection(db, 'todos'), todo);
    return res.status(201).json(todo);
  }

  if (req.method === 'GET') {
    // const requestedTodos = query(collection(db, 'todos'), orderBy('id'));

    // const allTodos = await getDocs(requestedTodos);

    // let todosCollection = [];

    // allTodos.forEach((todosDocument) => {
    //   todosCollection.push({
    //     ...todosDocument.data(),
    //   });
    // });

    // const retrievedTodos = Object.values(todosCollection);

    // // console.log(retrievedTodos);

    // return res.status(201).json(retrievedTodos);

    // async index(): Promise<Todo[]> {

    // const [...todosDB] = await retrieveTodosDB();
    return res.status(201).json(todosDB.filter(({ active }) => active));
    //   }
  }

  if (req.method === 'PUT') {
  }

  if (req.method === 'DELETE') {
  }
};

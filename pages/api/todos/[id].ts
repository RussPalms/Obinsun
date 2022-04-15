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
import fetch from 'node-fetch';
import { retrieveTodosDB } from '.';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let [...todosDB] = await retrieveTodosDB();

  const todoData = req.body;

  //   console.log(todoData);

  const { id, text, active, done } = todoData;

  if (req.method === 'POST') {
  }

  if (req.method === 'GET') {
    // const requestedTodo = query(
    //   collection(db, 'todos')
    //   // orderBy('id', 'desc')
    // );

    // const allTodo = await getDocs(requestedTodo);

    // let todoCollection = [];

    // allTodo.forEach((todoDocument) => {
    //   todoCollection.push({
    //     ...todoDocument.data(),
    //   });
    // });

    // const retrievedTodo = Object.values(todoCollection);

    // return res.status(201).json(retrievedTodo);

    // async show(@Param('id') id: string): Promise<Todo> {
    // const [...todosDB] = await retrieveTodosDB();

    return res
      .status(201)
      .json(todosDB.find((todo) => todo.id === parseInt(id)));
    //   }
  }

  if (req.method === 'PUT') {
    const todoUpdate = {
      id,
      text,
      active,
      done,
    };

    const todoRef = doc(db, 'todos', id);

    // await updateDoc(todosRef, {
    //   text,
    // });

    await updateDoc(todoRef, {
      todoUpdate,
    });

    todosDB = todosDB.map((todo) =>
      todo.id === parseInt(id)
        ? {
            ...todo,
            // , ...data
          }
        : todo
    );

    return res.status(201).json(todoUpdate);
  }

  if (req.method === 'DELETE') {
    await deleteDoc(doc(db, text, id));
  }
};

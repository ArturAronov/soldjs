import type { Component } from "solid-js";
import { BookList } from "./BookList";
import { AddBook } from "./AddBook";

interface BookshelfI {
  name: string;
}

function Bookshelf(props: BookshelfI) {
  return (
    <>
      <h1>{props.name} Bookshelf</h1>
      <BookList />
      <AddBook />
    </>
  );
}

/* 
In React, it's common to use destructuring assignment when accessing props inside a component. For example, our Bookshelf component may be written like this in React:

function Bookshelf({ name }) {
  return (
    <div>
      <h1>{name}'s Bookshelf</h1>
      <Books />
      <AddBook />
    </div>
  );
}

But destructuring props is usually a bad idea in Solid. Under the hood, Solid uses proxies to hook into props objects to know when a prop is accessed. When we destructure our props object in the function signature, we immediately access the object's properties and lose reactivity.
*/

const App: Component = () => {
  return <Bookshelf name="solid" />;
};

export default App;

import { createSignal, type Component } from "solid-js";
import { BookList } from "./BookList";
import { AddBook } from "./AddBook";

interface BookshelfI {
  name: string;
}

export type BookT = {
  title: string;
  author: string;
};

const initialBooks: Array<BookT> = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
];

function Bookshelf(props: BookshelfI) {
  const [books, setBooks] = createSignal(initialBooks);

  return (
    <>
      <h1>{props.name} Bookshelf</h1>
      <BookList books={books()} />
      <AddBook setBooks={setBooks} />
    </>
  );
}

const App: Component = () => {
  return <Bookshelf name="solid" />;
};

export default App;

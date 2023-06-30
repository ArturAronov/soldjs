import { createSignal, type Component, Show } from "solid-js";
import { BookList } from "./BookList";
import { AddBook } from "./AddBook";

interface BookshelfI {
  name: string;
}

export type Book = {
  title: string;
  author: string;
};

const initialBooks: Array<Book> = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
];

function Bookshelf(props: BookshelfI) {
  const [books, setBooks] = createSignal(initialBooks);
  const [showForm, setShowForm] = createSignal(false);

  const toggleForm = () => setShowForm(!showForm());

  return (
    <>
      <h1>{props.name} Bookshelf</h1>
      <BookList books={books()} />
      <Show
        when={showForm()}
        fallback={<button onClick={toggleForm}>Add a book</button>}
      >
        <AddBook setBooks={setBooks} />
        <button onClick={toggleForm}>Finishing adding books</button>
      </Show>
    </>
  );
}

const App: Component = () => {
  return <Bookshelf name="solid" />;
};

export default App;

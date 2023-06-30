import { JSX } from "solid-js/jsx-runtime";
import { BookT } from "./App";
import { Setter, createSignal } from "solid-js";

export interface AddBookProps {
  setBooks: Setter<BookT[]>;
}

const emptyBook: BookT = { title: "", author: "" };

export function AddBook(props: AddBookProps) {
  const [newBook, setNewBook] = createSignal(emptyBook);

  const addBook: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    event.preventDefault();
    props.setBooks((books) => [...books, newBook()]);
  };

  return (
    <form>
      <div>
        <label for="title">Book Name</label>
        <input
          id="title"
          value={newBook().title}
          onInput={(e) =>
            setNewBook({ ...newBook(), title: e.currentTarget.value })
          }
        />
      </div>
      <div>
        <label for="author">Author</label>
        <input
          id="author"
          value={newBook().author}
          onInput={(e) =>
            setNewBook({ ...newBook(), author: e.currentTarget.value })
          }
        />
      </div>
      <button type="submit" onClick={addBook}>
        Add Book
      </button>
    </form>
  );
}

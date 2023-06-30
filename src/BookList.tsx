import { For } from "solid-js";
import { BookT } from "./App";

interface BookListProps {
  books: BookT[];
}

export function BookList(props: BookListProps) {
  const totalBooks = () => props.books.length;

  return (
    <>
      <h2>My Books ({totalBooks()})</h2>
      <ul>
        <For each={props.books}>
          {(book) => (
            <li>
              {book.title}
              <span style={{ "font-style": "italic" }}> ({book.author})</span>
            </li>
          )}
        </For>
      </ul>
    </>
  );
}

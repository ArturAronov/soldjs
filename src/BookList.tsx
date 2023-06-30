import { For, createSignal } from "solid-js";

type BookT = {
  title: string;
  author: string;
};

const initialBooks: Array<BookT> = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
];

/* 
Derived state
Solid makes it easy to track derived state. You can think of derived state as a computation based only on other information you're already tracking in state. In our Bookshelf application, an example of derived state would be the number of books on our list: it's the length of our books array at any point in time.
In Solid, all we have to do to compute derived state is to create a derived signal: a function that relies on another signal:

const totalBooks = () => books().length;

Now, whenever we call totalBooks(), Solid will register the underlying signal (books) as a dependency, so the computed value will always stay up-to-date.
*/

export function BookList() {
  const [books, setBooks] = createSignal(initialBooks);
  return (
    <ul>
      <For each={books()}>
        {(book) => (
          <li>
            {book.title}
            <span style={{ "font-style": "italic" }}> ({book.author})</span>
          </li>
        )}
      </For>
    </ul>
  );
}

/* 
Since you're coming from React
In React, we'd use array.map:

{books.map(book => <li key={book.title}>{book.title} ({book.author}</li>)}

If we used array.map here in Solid, every element inside the book would have to rerender whenever the books signal changes. The For component checks the array when it changes, and only updates the necessary element. It's the same kind of checking that React's VDOM rendering system does for us when we use .map.
Note that, unlike in React, we don't need to provide a key to the For component: it compares each element by reference.
*/

https://docs.solidjs.com/guides/tutorials/getting-started-with-solid/adding-interactivity-with-state

Notes:

1. Derived state
   Solid makes it easy to track derived state. You can think of derived state as a computation based only on other information you're already tracking in state. In our Bookshelf application, an example of derived state would be the number of books on our list: it's the length of our books array at any point in time.
   In Solid, all we have to do to compute derived state is to create a derived signal: a function that relies on another signal:

```js
const totalBooks = () => books().length;
```

Now, whenever we call totalBooks(), Solid will register the underlying signal (books) as a dependency, so the computed value will always stay up-to-date.

2. Since you're coming from React
   In React, we'd use array.map:

```js
{
  books.map((book) => (
    <li key={book.title}>
      {book.title} ({book.author}
    </li>
  ));
}
```

If we used array.map here in Solid, every element inside the book would have to rerender whenever the books signal changes. The For component checks the array when it changes, and only updates the necessary element. It's the same kind of checking that React's VDOM rendering system does for us when we use .map.
Note that, unlike in React, we don't need to provide a key to the For component: it compares each element by reference.

3. In React, it's common to use destructuring assignment when accessing props inside a component. For example, our Bookshelf component may be written like this in React:

```js
function Bookshelf({ name }) {
  return (
    <div>
      <h1>{name}'s Bookshelf</h1>
      <Books />
      <AddBook />
    </div>
  );
}
```

But destructuring props is usually a bad idea in Solid. Under the hood, Solid uses proxies to hook into props objects to know when a prop is accessed. When we destructure our props object in the function signature, we immediately access the object's properties and lose reactivity.

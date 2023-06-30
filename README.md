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
     )));
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

4. Conditionally showing content
   In Solid, we can use the `<Show />` component to conditionally show content. The `<Show />` component takes a when prop and an optional fallback prop.

   - When the when prop is true, the JSX inside `<Show />` is displayed
   - When the when prop is false, the JSX inside fallback is displayed (if provided)

   The following example shows how we would use the `<Show />` component to conditionally display a sign-in or dashboard page:

   ```js
   import { Show } from "solid-js";
   interface IHomeProps {
     isLoggedIn: boolean;
     firstName: string;
   }
   function Home(props: IHomeProps) {
     return (
       <Show
         when={props.isLoggedin}
         fallback={
           <>
             <div>Welcome to the application. Please sign in to continue.</div>
             <SignInForm />
           </>
         }
       >
         <div>Welcome back, {props.firstName}!</div>
         <Dashboard />
       </Show>
     );
   }
   ```

   ##### THIS WON'T WORK (React way):

   ```js
   function Home(props) {
     if (props.isLoggedIn) {
       return (
         <>
           <div>Welcome back, {props.firstName}!</div>
           <Dashboard />
         </>
       );
     }
     return (
       <>
         <div>Welcome to the application. Please sign in to continue.</div>
         <SignInForm />
       </>
     );
   }
   ```

5. Fetching Data

   ```js
   const [data] = createResource(signal, dataFetchingFunction);
   ```

   The signal triggers the dataFetchingFunction: whenever it becomes a value other than `null`, `undefined`, or `false`, the `dataFetchingFunction` will be called, with that value as the first argument.

   When our `dataFetchingFunction` completes, it will update the value of `data()`, which we can access like a normal signal. Additionally, `data.loading` and `data.error` properties will be available to us so we can react to the state of the data fetching.

   Later, if the value of `signal` changes again, `dataFetchingFunction` will rerun again (as long as that value isn't `null`, `undefined`, or `false`).

export function AddBook() {
  return (
    <form>
      <div>
        <label for="title">Book Name</label>
        <input id="title" />
      </div>
      <div>
        <label for="author">Author</label>
        <input id="author" />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
}

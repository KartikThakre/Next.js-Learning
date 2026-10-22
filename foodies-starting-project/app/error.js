'use client';

//? Error Handling: This component is a simple error page that displays an error message when there is a failure in fetching meal data. It provides feedback to the user and suggests trying again later.
export default function Error() {
  return (
    <main className="error">
      <h1>An Error occured!</h1>
      <p>Failed to fetch meal Data. Please try again later.</p>
    </main>
  );
}

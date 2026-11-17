function ErrorMessage({ message, onRetry }) {
  // Special message when the .env file / API key is missing
  if (message === 'MISSING_KEY') {
    return (
      <div className="error">
        <p>⚠ No Pixabay API key found.</p>
        <p className="small">
          1. Get a free key at{' '}
          <a href="https://pixabay.com/api/docs/" target="_blank" rel="noreferrer">pixabay.com/api/docs</a>
          <br />
          2. Make a <b>.env</b> file next to <b>package.json</b> with:{' '}
          <code>VITE_PIXABAY_KEY=your_key</code>
          <br />
          3. Stop the server (Ctrl + C) and run <code>npm run dev</code> again.
        </p>
      </div>
    )
  }

  return (
    <div className="error">
      <p>⚠ {message}</p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  )
}

export default ErrorMessage

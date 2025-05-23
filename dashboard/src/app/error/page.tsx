export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-8">Please try again or contact support if the problem persists.</p>
        <a href="/" className="text-blue-500 hover:text-blue-600">
          Return to Home
        </a>
      </div>
    </div>
  )
}

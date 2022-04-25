import { useState } from "react"

const SubmitBlog = ({ submitBlog }) => {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [author, setAuthor] = useState("")

  const handleTitle = (event) => setTitle(event.target.value)
  const handleUrl = (event) => setUrl(event.target.value)
  const handleAuthor = (event) => setAuthor(event.target.value)

  const handleSubmitBlog = (event) => {
    event.preventDefault()

    const blogObj = {
      title: title,
      url: url,
      author: author,
    }

    submitBlog(blogObj)

    setTitle("")
    setUrl("")
    setAuthor("")
  }

  return (
    <div className="submitBlog">
      <h3>Submit a new blog</h3>

      <form onSubmit={handleSubmitBlog}>
        <div>
        Title:{" "}
          <input
            type="text"
            id="title"
            value={title}
            name="Title"
            placeholder="Title"
            onChange={handleTitle}
          />
        </div>

        <div>
        URL:{" "}
          <input
            type="text"
            id="url"
            value={url}
            name="URL"
            placeholder="Url"
            onChange={handleUrl}
          />
        </div>

        <div>
        Author:{" "}
          <input
            type="text"
            id="author"
            value={author}
            name="Author"
            placeholder="Author"
            onChange={handleAuthor}
          />
        </div>

        <div>
          <button type="submit" id="submitBlog">Submit blog</button>
        </div>
      </form>
    </div>
  )
}

export default SubmitBlog
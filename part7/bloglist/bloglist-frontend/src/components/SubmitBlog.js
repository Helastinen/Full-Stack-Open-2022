import { useState } from "react"
import { Form, Button } from "react-bootstrap"

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

      <Form onSubmit={handleSubmitBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            id="title"
            value={title}
            name="Title"
            placeholder="Title"
            onChange={handleTitle}
          />

          <Form.Label>URL:</Form.Label>
          <Form.Control
            type="text"
            id="url"
            value={url}
            name="URL"
            placeholder="Url"
            onChange={handleUrl}
          />

          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            id="author"
            value={author}
            name="Author"
            placeholder="Author"
            onChange={handleAuthor}
          />

          <Button variant="primary" className="m-2" type="submit" id="submitBlog">
            Submit blog
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default SubmitBlog
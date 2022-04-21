import { useState } from "react"

const blogStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 2,
  border: "solid",
  borderColor: "gray",
  marginBottom: 5,
}

const Blog = ({ blog, addLike }) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false)
  
  const hideWhenDetailsVisible = { display: showBlogDetails ? "none" : "" }
  const showWhenDetailsVisible = { display: showBlogDetails ? "" : "none" }  

  const handleAddLike = (event) => {
    event.preventDefault()

    const blogObj = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: Number(blog.likes + 1), // parse to number in case blog has no likes (would resolve as Nan)
      user: blog.user.id
    }
    const blogId = blog.id

    console.log("add like to blogObj:",blogObj)

    addLike(blogObj, blogId)
  }

  return (
    <div style={blogStyle}>

      <div style={hideWhenDetailsVisible}>
        <li key={blog.id}>
          {blog.title} by {blog.author}{" "}
          <button type="submit" onClick={() => setShowBlogDetails(true)}>View</button>
        </li>
      </div>

      <div style={showWhenDetailsVisible}>
        <li key={blog.id}>
          {blog.title} by {blog.author}{" "}
          <button type="submit" onClick={() => setShowBlogDetails(false)}>Hide</button><br/>
          Url: {blog.url}<br/>
          Likes: {blog.likes}{" "}<button type="submit" onClick={handleAddLike}>Like</button><br/>
          Blog added by: {blog.user.name}<br/>
        </li>
      </div>

    </div>  
  )
}

export default Blog
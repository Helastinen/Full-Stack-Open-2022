import { useState } from "react"

const blogStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 2,
  border: "solid",
  borderColor: "gray",
  marginBottom: 5,
}

const Blog = ({blog}) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false)
  
  const hideWhenDetailsVisible = { display: showBlogDetails ? "none" : "" }
  const showWhenDetailsVisible = { display: showBlogDetails ? "" : "none" }  

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
          Likes: {blog.likes}{" "}<button type="submit">Like</button><br/>
          Blog added by: {blog.user.name}<br/>
        </li>
      </div>

    </div>  
  )
}

export default Blog
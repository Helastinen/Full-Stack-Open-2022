import React from "react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"

import Blog from "./Blog"

describe("Single blog in bloglist", () => {
  let container

  const blog = {
    title: "Test blog",
    url: "https://www.testblog.com",
    author: "Test blogger",
    likes: 1,
    user: {
      username: "root",
      name: "Superuser",
      id: "62556d4c1024615ab2e672b6",
    }
  }

  const user = {
    username: "root",
    name: "Superuser",
    token: "dummytoken1234567890"
  }

  beforeEach(() => {
    const mockHandler = jest.fn()

    container = render(<Blog
      blog={blog}
      addLike={mockHandler}
      deleteBlog={mockHandler}
      user={user}
    />).container
  })

  test("render only blog's title and author when blog is hidden in bloglist", () => {
    const element = screen.getByText(`${blog.title} by ${blog.author}`)
    expect(element).toBeDefined()

    const detailsHidden = container.querySelector(".detailsHidden")
    expect(detailsHidden).not.toHaveStyle("display: none")

    const detailsShown = container.querySelector(".detailsShown")
    expect(detailsShown).toHaveStyle("display: none")
  })

  test("blog's url and number of likes are shown when \"View\" button has been clicked", async () => {
    const user = userEvent.setup()
    const button = screen.getByText("View")
    await user.click(button)

    const detailsShown = container.querySelector(".detailsShown")
    expect(detailsShown).not.toHaveStyle("display: none")

    const urlElement = screen.getByText(`${blog.url}`, { exact: false })
    expect(urlElement).toBeDefined()

    const likesElement = screen.getByText(`${blog.likes}`, { exact: false })
    expect(likesElement).toBeDefined()
  })
})
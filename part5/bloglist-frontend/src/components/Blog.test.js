import React from "react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"

import Blog from "./Blog"

import loginService from "../services/login"
import blogService from "../services/blogs"

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
})
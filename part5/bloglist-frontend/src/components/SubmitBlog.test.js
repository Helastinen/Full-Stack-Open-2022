import React from "react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"

import SubmitBlog from "./SubmitBlog"

describe("Submit a new blog", () => {
  test("<SubmitBlog/> calls handleSubmitBlog with correct details", async () => {
    const submitBlog = jest.fn()
    const user = userEvent.setup()

    render(<SubmitBlog submitBlog={submitBlog} />)

    const titleInput = screen.getByPlaceholderText("Title")
    const urlInput = screen.getByPlaceholderText("Url")
    const authorInput = screen.getByPlaceholderText("Author")
    await user.type(titleInput, "Test blog")
    await user.type(urlInput, "https:/www.testblog.com")
    await user.type(authorInput, "Test blogger")

    const button = screen.getByText("Submit blog")
    await user.click(button)

    expect(submitBlog.mock.calls).toHaveLength(1)
    expect(submitBlog.mock.calls[0][0].title).toBe("Test blog")
    expect(submitBlog.mock.calls[0][0].url).toBe("https:/www.testblog.com")
    expect(submitBlog.mock.calls[0][0].author).toBe("Test blogger")
  })
})
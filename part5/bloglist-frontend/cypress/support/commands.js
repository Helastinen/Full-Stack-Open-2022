/* eslint-disable linebreak-style */
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username, password
  }).then(({ body }) => {
    localStorage.setItem("localBloglistUser", JSON.stringify(body))
    cy.visit("http://localhost:3000")
  })
})

Cypress.Commands.add("createBlog", ({ title, url, author, likes = 0 }) => {
  cy.request({
    method: "POST",
    url: "http://localhost:3003/api/blogs",
    body: {
      title, url, author, likes
    },
    headers: {
      "Authorization": `bearer ${JSON.parse(localStorage.getItem("localBloglistUser")).token}`
    }
  })

  cy.visit("http://localhost:3000")
})
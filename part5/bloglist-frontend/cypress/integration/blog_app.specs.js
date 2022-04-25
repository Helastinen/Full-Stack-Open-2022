describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")

    const user = {
      name: "Superuser",
      username: "root",
      password: "salainen"
    }
    cy.request("POST", "http://localhost:3003/api/users", user)

    cy.visit("http://localhost:3000/")
  })

  it("Login form is shown (5.17.)", function() {
    cy.contains("Blogs")
    cy.get("#username")
    cy.get("#password")
    cy.get("button").contains("Login")
  })

  describe("login", function() {
    it("succeeds with correct credentials (5.18)", function() {
      cy.get("#username").type("root")
      cy.get("#password").type("salainen")
      cy.get("button").contains("Login").click()

      cy.contains("Superuser logged in")
    })

    it("fails with incorrect credentials (5.18)", function() {
      cy.get("#username").type("root")
      cy.get("#password").type("wrongPassword")
      cy.get("button").contains("Login").click()

      cy.get(".error")
        .should("contain", "Login failed")
        .should("have.css", "color", "rgb(255, 0, 0)")
    })
  })
})
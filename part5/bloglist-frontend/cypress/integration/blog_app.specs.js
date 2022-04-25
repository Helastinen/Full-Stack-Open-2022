describe("Blog app", function() {
  beforeEach(function() {
    // initialize users and blogs db's
    cy.request("POST", "http://localhost:3003/api/testing/reset")

    //* create user
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

  describe("Login...", function() {
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

      cy.get(".notification")
        .should("contain", "Login failed")
        .should("have.css", "color", "rgb(255, 0, 0)")
    })
  })

  describe("When logged in...", function() {
    beforeEach(function() {
      cy.login({ username: "root", password: "salainen" })
    })

    it("user can create a new blog (5.19.)", function() {
      cy.contains("New blog").click()

      cy.contains("Submit a new blog")
      cy.get("#title").type("Test blog")
      cy.get("#url").type("http://www.testblog.com")
      cy.get("#author").type("Test author")
      cy.get("#submitBlog").click()

      cy.get(".notification").contains("\"Test blog\" by Test author added succesfully")
      cy.get(".detailsHidden").contains("Test blog by Test author")
    })

    describe("When a blog exists...", function() {
      beforeEach(function() {
        cy.createBlog({
          title: "Initial blog",
          url: "https://www.initialblog.com",
          author: "Initial blog author"
        })
      })

      it("user can like the blog (5.20)", function() {
        cy.get("#view").click()
        cy.get("#likeButton").click()

        cy.get(".notification").contains("Added like to \"Initial blog\" succesfully")
        cy.contains("Likes: 1")
      })

      it("user who created the blog can delete it (5.21)", function() {
        cy.get("#view").click()
        cy.get("#removeButton").click()

        cy.get(".notification").contains("Deleted blog \"Initial blog\" succesfully")
        cy.get("#view").should("not.exist")
      })

      it("other user can not delete the blog (5.21)", function() {
        const user = {
          name: "Test user 2",
          username: "root2",
          password: "salainen2"
        }
        cy.request("POST", "http://localhost:3003/api/users", user)

        cy.login({ username: "root2", password: "salainen2" })
        cy.get("#view").click()

        cy.get("#removeButton").should("not.be.visible")
      })
    })
  })
})
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
        cy.get("#viewButton").click()
        cy.get("#likeButton").click()

        cy.get(".notification").contains("Added like to \"Initial blog\" succesfully")
        cy.contains("Likes: 1")
      })

      it("user who created the blog can delete it (5.21)", function() {
        cy.get("#viewButton").click()
        cy.get("#removeButton").click()

        cy.get(".notification").contains("Deleted blog \"Initial blog\" succesfully")
        cy.get("#viewButton").should("not.exist")
      })

      it("other user can not delete the blog (5.21)", function() {
        const user = {
          name: "Test user 2",
          username: "root2",
          password: "salainen2"
        }
        cy.request("POST", "http://localhost:3003/api/users", user)

        cy.login({ username: "root2", password: "salainen2" })
        cy.get("#viewButton").click()

        cy.get("#removeButton").should("not.be.visible")
      })
    })

    describe("When multiple blogs exists...", function() {
      beforeEach(function() {
        cy.createBlog({ title: "Blog 1", url: "https://www.blog1.com", likes: 3, author: "Blog author" })
        cy.createBlog({ title: "Blog 2", url: "https://www.blog2.com", author: "Blog author" })
        cy.createBlog({ title: "Blog 3", url: "https://www.blog3.com", likes: 4, author: "Blog author" })
      })

      it("blogs are ordered according to likes with the blog with the most likes being first", function() {
        //* initial order
        cy.get(".blog").eq(0).should("contain", "Blog 3")
        cy.get(".blog").eq(1).should("contain", "Blog 1")
        cy.get(".blog").eq(2).should("contain", "Blog 2")

        //* Add likes and confirm that order changes
        cy.get(".blog").eq(1).find("#viewButton").click()
        cy.get(".blog").eq(1).find("#likeButton").click()
        cy.get(".blog").eq(1).contains("Likes: 4")

        //* blog has now moved to top of list
        cy.get(".blog").eq(0).should("contain", "Blog 1")
        cy.get(".blog").eq(1).should("contain", "Blog 3")
        cy.get(".blog").eq(2).should("contain", "Blog 2")
      })
    })
  })
})
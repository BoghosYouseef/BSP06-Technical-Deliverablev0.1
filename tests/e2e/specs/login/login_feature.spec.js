Given("I am on the login page and I provide correct credentials", () => {

    cy.visit("http://localhost:8080/")
    cy.get("h1").should("be.visible")
    cy.get("h1").should('have.text', "BSP06 Login Page")
    isValid = true
})

Given("I am on the login page I provide incorrect credentials", () => {
    cy.visit("http://localhost:8080/")
    cy.get("h1").should("be.visible")
    cy.get("h1").should('have.text', "BSP06 Login Page")
    isValid = false
})

When('I write "admin123" in user name box', () => {
    cy.get('input[type="text"]').should("be.visible").type("admin123")

})
When('I write "geroge123" in user name box', () => {
    cy.get('input[type="text"]').should("be.visible").type("geroge123")
})


And('I write "Admin@123" in password box', () => {
    cy.get('input[type="password"]').should("be.visible").type("Admin@123")
})
And('I write "Geroge@123" in password box', () => {
    cy.get('input[type="password"]').should("be.visible").type("Geroge@123")

})

And('I click the "submit" button', () => {
    if(isValid){
        
        cy.intercept("api/users",(req) =>{


                req.reply({statusCode: 200,
                            "body":{
                                    isAuthenticated: true,
                                    msg: "Login Successful!"
                                    }
                        }   
                )
        }).as("validCredentials")

    }else if(!isValid){
        cy.intercept("api/users",(req) =>{
            req.reply({statusCode: 200,
                failOnStatusCode: false,
                "body":{
                        isAuthenticated: false,
                        msg: "Login Failed!"
                        }
            }   
        )
        }).as("invalidCredentials")
    }

    cy.get('button[id="submissionBTN"]').should("be.visible").click()
    
    if(isValid){
        cy.wait("@validCredentials")
    }else{

        cy.wait("@invalidCredentials")
    }
})

Then('I will see a green box that says "Login Successful!"', () => {
    cy.wait(1500)
    cy.get("modal").should("be.visible")
    cy.get('h3').should('have.text', 'Login Successful!')
})
Then('I will see a red box that says "Login Failed!"', () => {
    cy.wait(1500)
    cy.get("modal").should("be.visible")
    cy.get('h3').should('have.text', 'Login Failed!')
})

And('I will be redirected to the admin page.', () => {
    cy.url().should('eq', 'http://localhost:8080/users/admin/homePage')
})
And('I will remain on the login page', () => {
    cy.url().should('eq', 'http://localhost:8080/')
})
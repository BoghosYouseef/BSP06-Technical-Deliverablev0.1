Given("I have logged in successfully", () => {
    cy.visit("http://localhost:8080/users/admin/homePage")
    var onPageLoadGetRequest = false
    if(!onPageLoadGetRequest){
        cy.intercept("**/api/users/admin/homepage&Query=ALL_LISTS",(req) => {
            req.reply({
                "statuscode": 200,
                "isEmpty": true})
    })
        }
})


When("I click the plus sign button", () => {
    cy.get('button[id="addNewListBTN"]').should("be.visible").click()
    cy.get("modal").should("be.visible")
    cy.get("h3[id='newlistNamePlace']").should("have.text", "New List Name:")
    cy.get('button[id="addListItemBTN"]')
})

And('I enter "Monday schedule" as the name of the list', () => {
    cy.get("input[id='listName']").should("be.visible").type("Monday schedule")
    cy.get("input[id='listName']").should("have.value", "Monday schedule")
})
And("I enter the following items in the list",(dataTable) => {

    cy.log('raw : ' + dataTable.raw());
    cy.log('rows : ' + dataTable.rows());
    cy.log('HASHES : ' );

    dataTable.hashes().forEach(elem =>{

        cy.log("THIS IS elem.Item",elem.Item)


        cy.get("input[id='new item']").should("be.visible").type(elem.Item)
        cy.get("button[id='addListItemBTN']").click()
    });

})

And('I click "Done" button', () => {
    cy.intercept("**/api/users/admin/homepage",(req) => {
        req.reply({
            "statuscode": 200,
            fixture: 'AdminList.json'

        })
}).as("NewListRequest")

    cy.get("button[id='DoneBTN']").click()

    cy.wait("@NewListRequest")
    .then((interception)=>{
        expect(interception.request.body["List Name"]).to.eq("Monday schedule")
        expect(interception.request.body["List Items"][0]).to.eq("go for a walk")
        expect(interception.request.body["List Items"][1]).to.eq("buy milk after work")
        expect(interception.request.body["List Items"][2]).to.eq("eat breakfast")

        expect(interception.request.method).to.eq('POST');

    })

})

Then("I should see a new list with the information I provided", () => {
    cy.get("#lists").children("div").children("h3").should("have.text","Monday schedule")
    cy.get("#lists").children("div").children("ul").should("be.visible")

    cy.get("#lists").children("div").children("ul").children("li").first().should("have.text", "go for a walk")
    cy.get("#lists").children("div").children("ul").children("li").last().should("have.text", "eat breakfast")
})

Given("I have logged in successfully a second time", () => {
    var onPageLoadGetRequest = true
    cy.visit("http://localhost:8080/users/admin/homePage")

    if(onPageLoadGetRequest){
    cy.intercept("**/api/users/admin/homepage&Query=ALL_LISTS",(req) => {
        req.reply({
            "statuscode": 200,
            fixture: 'AdminList.json'
        })
    }).as("ListRequestAfterLogin")

    cy.wait("@ListRequestAfterLogin")
    }
})

And("I See the list I created before", () => {

    cy.get("#lists").children("div").children("h3").should("have.text","Monday schedule")
    cy.get("#lists").children("div").children("ul").should("be.visible")

    cy.get("#lists").children("div").children("ul").children("li").first().should("have.text", "go for a walk")
    cy.get("#lists").children("div").children("ul").children("li").last().should("have.text", "eat breakfast")
}) 


When("I click on a check box I should see a small loading symbol on a popup window", () => {
    cy.get("input[type='checkbox']").should("be.visible").first().click()

    cy.intercept("**/api/users/admin/homepage&listCheckBoxChecked",(req) => {
        req.reply({
            "statuscode": 200,
            fixture: 'AdminListCheckedList.json'
        })
    }).as("AdminListCheckedList")

    cy.get('modal[id="popupLoading"]').children().first().should('have.text', 'Loading...')
    cy.wait("@AdminListCheckedList")
}) 

Then("it should say successfully updated", () => {
    cy.get("div[id='success Message']").should("be.visible")
    cy.get("div[id='success Message']").should("have.text", "successfully updated")
    cy.get("input[type='checkbox']").should("be.checked")
}) 

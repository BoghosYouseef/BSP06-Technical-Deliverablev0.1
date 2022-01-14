Feature: User Login

    I want to be able to login to the website when I use correct credentials. 
    I also want to receive an error message when wrong credentials are provided.

    Scenario: successful login
        Given I am on the login page and I provide correct credentials
        When I write "admin123" in user name box
        And I write "Admin@123" in password box
        And I click the "submit" button
        Then I will see a green box that says "Login Successful!"
        And I will be redirected to the admin page.


    Scenario: failed login
        Given I am on the login page I provide incorrect credentials
        When I write "geroge123" in user name box
        And I write "Geroge@123" in password box
        And I click the "submit" button
        Then I will see a red box that says "Login Failed!"
        And I will remain on the login page
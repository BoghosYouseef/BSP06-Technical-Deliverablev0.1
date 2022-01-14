Feature: Home Page Add List

    I want to be able to add a to-do list when I log in successfully.

    Scenario: successfully added new list
        Given I have logged in successfully
        When I click the plus sign button
        And I enter "Monday schedule" as the name of the list
        And I enter the following items in the list
        |Item                       | Done |
        |go for a walk              |  No  |
        |buy milk after work        |  No  |
        |eat breakfast              |  No  |
        And I click "Done" button
        Then I should see a new list with the information I provided

    Scenario: successfully change status of done items after list is created

        Given I have logged in successfully a second time
        And I See the list I created before
        When I click on a check box I should see a small loading symbol on a popup window
        Then it should say successfully updated
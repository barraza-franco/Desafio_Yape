Feature: The peru rail website

  Scenario: As a user, I want to reserve a train ride from Machu Pichu to Ciudad de Cusco for 1 adult
    Given I am on the home page
    When I set the type of trip oneway
    And I search the destination with the following data
        | from         | to                 |  dateFrom   | dateTo      | adults | children |
        | MachuPicchu  | Ciudad de Cusco    | 15/Apr/2023 |             | 1      | 0        |
    And I do switch to the new page
    And I should be on the step "2"
    And I choose the first option of trains
    And I should be on the step "3"
    And I set the passanger data with the following data
        | firstname | surname | gender | nationality       | typeofdocument          | documentnumber | birthdate   | telephone  | email                  |
        | Franco    | Barraza | Male   | ARGENTINA \| ARG  | Identification document | 42194138       | 23/Sep/1999 | 1123865190 | barrazafranco@fake.com |
    And I should be on the step "4"
    And I select type of payment visa
    Then The first price, the subtotal price and the finish price its the same
    
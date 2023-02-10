Feature: The peru rail website

  @run
  Scenario: As a user, I can reserve a train ride
    Given I am on the home page
    When I set the type of trip roundtrip
    And I search the destination with the following data
        | from         | to                 |  dateFrom  |
        | MachuPicchu  | Ciudad de Cusco    | 10/10/2023 |
    # And I should be on the step two
    # And I do click on continue button
    
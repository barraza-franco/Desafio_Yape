Feature: The restful-booker api

  Background:
    Given I set base url 'https://restful-booker.herokuapp.com/'

  @Ping
  Scenario: Ping - HealthCheck
    Given I set path 'ping'
    When I do GET
    Then I validate status 201

  @Auth
  Scenario: Auth - Get token
    Given I set path 'auth'
    When I do Post
    """
    {
      "username": "admin",
      "password": "password123"
    }
    """
    Then I validate status 200
    And I save token
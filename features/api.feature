Feature: The restful-booker api

  Background:
    Given I set base url 'https://restful-booker.herokuapp.com'

  @Ping
  Scenario: Ping - HealthCheck
    Given I set path 'ping'
    When I do GET
    Then I validate status 201

  @Auth
  Scenario: Auth - CreateToken
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

  @Booking
  Scenario: Booking - GetBookingIds
    Given I set path 'booking'
    When I do GET
    Then I validate status 200

  @Booking
  Scenario: Booking - GetBooking
    Given I set path 'booking'
    When I do GET
    Then I validate status 200
    And I save the first booking id

    Given I set base url 'https://restful-booker.herokuapp.com'
    Given I set path 'booking'
    And I set id stored
    When I do GET
    Then I validate status 200
    And I validate the body has keys
    """
    {
      "firstname": "",
      "lastname": "",
      "totalprice": "",
      "depositpaid": "",
      "bookingdates": ""
    }
    """

  @Booking
  Scenario: Booking - CreateBooking
    Given I set path 'booking'
    When I do Post
    """
    {
      "firstname" : "Franco",
      "lastname" : "Barraza",
      "totalprice" : 125,
      "depositpaid" : true,
      "bookingdates" : {
        "checkin" : "2023-05-05",
        "checkout" : "2023-06-06"
    },
      "additionalneeds" : "Breakfast"
    }
    """
    Then I validate status 200
    And I validate the Post response body
    And I save the id booking created

  @Booking
  Scenario: Booking - UpdateBooking with Auth
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

    Given I set base url 'https://restful-booker.herokuapp.com'
    And I set path 'booking'
    When I do GET
    Then I validate status 200
    And I save the first booking id
  
    Given I set base url 'https://restful-booker.herokuapp.com'
    And I set path 'booking'
    And I set id stored
    When I do Put
    """
    {
      "firstname" : "Franco",
      "lastname" : "Barraza",
      "totalprice" : 125,
      "depositpaid" : true,
      "bookingdates" : {
        "checkin" : "2023-05-05",
        "checkout" : "2023-06-06"
    },
      "additionalneeds" : "Breakfast"
    }
    """
    Then I validate status 200
    And I validate the Put response body
  
  #COMPLETAR
  @Booking
  Scenario: Booking - PartialUpdateBooking

  @Booking
  Scenario: Booking - DeleteBooking
    Given I set path 'booking'
    When I do Post
    """
    {
      "firstname" : "Franco",
      "lastname" : "Barraza",
      "totalprice" : 125,
      "depositpaid" : true,
      "bookingdates" : {
        "checkin" : "2023-05-05",
        "checkout" : "2023-06-06"
    },
      "additionalneeds" : "Breakfast"
    }
    """
    Then I validate status 200
    And I validate the Post response body
    And I save the id booking created

    Given I set base url 'https://restful-booker.herokuapp.com'
    And I set path 'auth'
    When I do Post
    """
    {
      "username": "admin",
      "password": "password123"
    }
    """
    Then I validate status 200
    And I save token

    Given I set base url 'https://restful-booker.herokuapp.com'
    And I set path 'booking'
    And I set id stored
    When I do DELETE
    Then I validate status 201
    And The booking was delete
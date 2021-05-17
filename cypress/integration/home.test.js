const { createYield } = require("typescript");

describe('Home Page', () => {

    beforeEach(() => {

        // save the json into local variable named "coursesJSON"
        cy.fixture('courses.json').as("coursesJSON");

        cy.server(); // mock backend server

        // @ -> payload
        // save the response of mock API(@coursesJSON) into local variable courses 
        cy.route('/api/courses', "@coursesJSON").as("courses");

        cy.visit('/');
    })

    it('should display a list of courses', () => {
        
        // the page contains this string
        cy.contains("All Courses Error");
    
        // wait util have response from mock API
        cy.wait('@courses');
        
        cy.get("mat-card").should("have.length", 9);
    });

    it('should display the advanced courses', () => {
        
        cy.get('.mat-tab-label').should("have.length", 2);

        cy.get('.mat-tab-label').last().click();
        
        cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt', 1);

        cy.get('.mat-tab-body-active .mat-card-title').first().should('contain', 'Angular Security Course - Web Security Fundamentals');
    });

});























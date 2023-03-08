describe('App loads', () => {
  it('Visits home page', () => {
    cy.visit('http://localhost:3000/')

    
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('home-page-contents', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('.Title_title__2nXye').should('have.text', 'SQLite Viewer');
    cy.get('.SchemaView_header__qNOAj > label').should('have.text', 'List of tables');
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('loads-database', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('section').click();
    cy.get('section > label').click();
    cy.get('#file-input').click();
    cy.get('.SchemaView_tables-list__3UyQI > :nth-child(1)').should('have.text', 'staff_list');
    cy.get(':nth-child(1) > .SchemaView_table-link__gVb_f').click();
    cy.get('.SchemaView_fields-list__wRr_0 > :nth-child(1)').should('have.text', 'IDSMALLINT');
    /* ==== End Cypress Studio ==== */
  });
})
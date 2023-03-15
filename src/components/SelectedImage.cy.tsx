import React from 'react';
import { mount } from 'cypress/react18';
import SelectedImage from './SelectedImage';

describe('SelectedImage Component', () => {
  const selectedImage = {
    id: '1',
    url: 'https://example.com/image.jpg',
    title: 'Example Image',
    filename: 'example-image.jpg',
    sizeInBytes: 123456789,
    uploadedBy: 'John Doe',
    createdAt: '2022-03-14T15:00:00Z',
    updatedAt: '2022-03-14T15:30:00Z',
    dimensions: {
      height: 1000,
      width: 2000,
    },
    resolution: {
      height: 72,
      width: 72,
    },
    description: 'Example description',
  };

  const favorites = [selectedImage];


  it('should render', () => {
    const handleFavoriteClick = cy.stub().as('handleFavoriteClick');
    const handleDeleteClick = cy.stub().as('handleDeleteClick');
    mount(
      <SelectedImage
        selectedImage={selectedImage}
        favorites={favorites}
        handleFavoriteClick={handleFavoriteClick}
        handleDeleteClick={handleDeleteClick}
      />
    );

    cy.get('.selected-images-container').should('be.visible');
    cy.get('.selected-image').should('be.visible').and('have.attr', 'src', selectedImage.url);
    cy.contains('.filename', selectedImage.filename.slice(0, 15)).should('be.visible');
    cy.get('.heart-icon').should('be.visible');
    cy.contains('h5', `${(selectedImage.sizeInBytes / 1000000).toFixed(2)} MB`).should('be.visible');
    cy.contains('h2', 'information').should('be.visible');
    cy.contains('h5', `uploaded by ${selectedImage.uploadedBy}`).should('be.visible');
    cy.contains('h5', `created${selectedImage.createdAt}`).should('be.visible');
    cy.contains('h5', `Last modified${selectedImage.updatedAt}`).should('be.visible');
    cy.contains('h5', `Dimensions ${selectedImage.dimensions.height} x ${selectedImage.dimensions.width}`).should('be.visible');
    cy.contains('h5', `Resolution ${selectedImage.resolution.height} x ${selectedImage.resolution.width}`).should('be.visible');
    cy.contains('h2', 'Description:').should('be.visible');
    cy.get('.btn-delete').should('be.visible');
  });

  it('should call handleFavoriteClick when the heart icon is clicked', () => {
    
    const handleFavoriteClick = cy.stub().as('handleFavoriteClick');
    const handleDeleteClick = cy.stub().as('handleDeleteClick');
    mount(
      <SelectedImage
        selectedImage={selectedImage}
        favorites={favorites}
        handleFavoriteClick={handleFavoriteClick}
        handleDeleteClick={handleDeleteClick}
      />
    );

    cy.get('.heart-icon').click();
    cy.wrap(handleFavoriteClick).should('have.been.calledOnce').and('have.been.calledWith', selectedImage);
  });

  it('should call handleDeleteClick when the delete button is clicked', () => {
    
    const handleFavoriteClick = cy.stub().as('handleFavoriteClick');
    const handleDeleteClick = cy.stub().as('handleDeleteClick');
    mount(
      <SelectedImage
        selectedImage={selectedImage}
        favorites={favorites}
        handleFavoriteClick={handleFavoriteClick}
        handleDeleteClick={handleDeleteClick}
      />
    );
    

    cy.get('.btn-delete').click();
    cy.wrap(handleDeleteClick).should('have.been.calledOnce').and('have.been.calledWith', selectedImage);
  });
});

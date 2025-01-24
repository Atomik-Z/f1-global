import React, { useState } from 'react';
import LexiqueData from '../../data/Lexique.json';
import styled from 'styled-components';

const StyledCategory = styled.div`
  margin-left: 5% 0;
  margin-bottom: 2%;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const StyledSubCategory = styled.div`
  margin-left: 7%;
  margin-bottom: 2%;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const StyledTerm = styled.div`
  margin-left: 3%;
  margin-top: 2%;
  margin-bottom: 2%;
  font-size: 80%;
  margin-right: 3%;
`;

const Arrow = styled.span`
  margin-right: 1%;
`;

function Lexique() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const categories = [...new Set(LexiqueData.Lexique.map(item => item.catégorie))];

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    } else {
      setSelectedCategory(category);
      setSelectedSubCategory(null);
    }
  };

  const handleSubCategoryClick = (subCategory) => {
    if (selectedSubCategory === subCategory) {
      setSelectedSubCategory(null);
    } else {
      setSelectedSubCategory(subCategory);
    }
  };

  const subCategories = selectedCategory
    ? [...new Set(LexiqueData.Lexique.filter(item => item.catégorie === selectedCategory).map(item => item['sous-catégorie']))]
    : [];

  const terms = selectedSubCategory
    ? LexiqueData.Lexique.filter(item => item['sous-catégorie'] === selectedSubCategory)
    : [];

  return (
    <div>
      <h2>Lexique</h2>
      {categories.map((category, index) => (
        <div key={index}>
          <StyledCategory onClick={() => handleCategoryClick(category)}>
            <Arrow>{selectedCategory === category ? 'v' : '>'}</Arrow>
            {category}
          </StyledCategory>
          {selectedCategory === category && subCategories.map((subCategory, subIndex) => (
            <div key={subIndex}>
              <StyledSubCategory onClick={() => handleSubCategoryClick(subCategory)}>
                <Arrow>{selectedSubCategory === subCategory ? 'v' : '>'}</Arrow>
                {subCategory}
              </StyledSubCategory>
              {selectedSubCategory === subCategory && terms.map((term, termIndex) => (
                <StyledTerm key={termIndex}>
                  <strong>{term.terme}:</strong> {term.définition}
                </StyledTerm>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Lexique;
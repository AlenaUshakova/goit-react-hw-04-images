import React, { useState } from 'react';
import { toast } from 'react-toastify';
import propTypes from 'prop-types';

import {
  SearchbarBox,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.error('You did not enter anything to search');
      return;
    }

    onSubmit(query);
    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <SearchbarBox>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleQueryChange}
        />
      </SearchForm>
    </SearchbarBox>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

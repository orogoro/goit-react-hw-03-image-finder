import React, { Component } from 'react';
import { toast } from 'react-toastify';
import styles from './SearchForm.module.css';

export default class SearchForm extends Component {
  state = {
    value: '',
  };

  handleInputChange = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() === '') {
      return toast.error('Вы ничего не ввели');
    }

    this.props.onSubmit(this.state);

    // this.reset();
  };

  //   reset = () => {
  //     this.setState({ value: '' });
  //   };

  render() {
    return (
      <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          onChange={this.handleInputChange}
          name="value"
          value={this.state.value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    );
  }
}

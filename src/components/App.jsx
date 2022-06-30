import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { GalleryApi } from './Gallery/GalleryApi';
import Searchbar from './Gallery/Searchbar/Searchbar';
import ImageGallery from './Gallery/ImageGallery/ImageGallery';
import Loader from './Gallery/Loader/Loader';
import Button from './Gallery/Button/Button';
import Modal from './Gallery/Modal/Modal';

import 'react-toastify/dist/ReactToastify.css';
import 'index.css';

export default class App extends Component {
  state = {
    inputValue: '',
    gallery: [],
    loading: false,
    page: 1,
    showModal: false,
    modalImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevState.inputValue;
    const nextValue = this.state.inputValue;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevValue !== nextValue || prevPage !== nextPage) {
      this.setState({ loading: true });

      GalleryApi(nextValue, nextPage)
        .then(response => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...response.data.hits],
          }));
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  showImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = ({ value }) => {
    const prevState = this.state.inputValue;
    if (prevState === value) {
      return;
    }

    this.setState({
      inputValue: value,
      gallery: [],
      page: 1,
    });
  };

  LargeImg = large => {
    this.setState({
      modalImg: large,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { gallery, loading, showModal, modalImg } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {gallery.length > 0 && (
          <ImageGallery
            options={gallery}
            onClick={this.toggleModal}
            modalImg={this.LargeImg}
          />
        )}
        {loading && <Loader />}
        {gallery.length > 0 && !loading && (
          <Button nextPage={this.showImages} />
        )}
        {showModal && (
          <Modal onClick={this.toggleModal}>
            <img style={{ width: 1000 }} src={modalImg} alt="modal" />
          </Modal>
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

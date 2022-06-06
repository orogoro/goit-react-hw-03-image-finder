import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Gallery/Searchbar/Searchbar';
import ImageGallery from './Gallery/ImageGallery/ImageGallery';

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'index.css';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY_API = '27157925-5efc8a27cb1dac55eac7638cc';

export default class App extends Component {
  state = {
    inputValue: '',
    gallery: [],
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevState.inputValue;
    const nextValue = this.state.inputValue;

    if (prevValue !== nextValue) {
      this.setState({ loading: true, gallery: [] });

      axios
        .get(
          `/?q=${nextValue}&page=1&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => {
          this.setState(prevState => ({
            gallery: [...response.data.hits, ...prevState.gallery],
          }));
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = ({ value }) => {
    this.setState({
      inputValue: value,
      gallery: [],
    });
  };

  render() {
    const { gallery, loading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            Loading
          </div>
        )}
        {gallery.length > 0 && <ImageGallery options={gallery} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

// showImages() {
//   axios
//     .get(
//       `https://pixabay.com/api/?q=${this.state.inputValue}&page=1&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
//     )
//     .then(response => {
//       this.setState(prevState => ({
//         gallery: [response.data.hits, ...prevState.gallery],
//       }));
//     });
// }

// showImages = options => {
//   const hits = options.data.hits;
//   this.setState(prevState => ({
//     gallery: [hits, ...prevState.gallery],
//   }));
// };

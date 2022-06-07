import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  largeUrlImage = e => {
    this.props.modalImg(e.target.dataset.large);
  };

  render() {
    return (
      <ul className={styles.ImageGallery} onClick={this.largeUrlImage}>
        {this.props.options.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            onClick={this.props.onClick}
          />
        ))}
      </ul>
    );
  }
}

// export default function ImageGallery({ options, onClick }) {
//   function lll(e) {
//     // console.log(e.target.dataset.large);

//     this.props.modalImg(e.target.dataset.large);
//   }

//   return (
//     <ul className={styles.ImageGallery} onClick={lll}>
//       {options.map(({ id, webformatURL, largeImageURL, tags }) => (
//         <ImageGalleryItem
//           key={id}
//           webformatURL={webformatURL}
//           largeImageURL={largeImageURL}
//           tags={tags}
//           // onClick={modalImg}
//         />
//       ))}
//     </ul>
//   );
// }

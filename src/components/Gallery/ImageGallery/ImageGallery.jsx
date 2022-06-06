import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from './ImageGallery.module.css';

export default function ImageGallery({ options }) {
  //   console.log(options);
  return (
    <ul className={styles.ImageGallery}>
      {options.map(option => (
        <ImageGalleryItem
          key={option.id}
          webformatURL={option.webformatURL}
          largeImageURL={option.largeImageURL}
        />
      ))}
    </ul>
  );
}

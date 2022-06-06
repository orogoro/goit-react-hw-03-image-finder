import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ webformatURL, largeImageURL }) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        className={styles.ImageGalleryItemImage}
        src={webformatURL}
        alt="img"
      />
    </li>
  );
}

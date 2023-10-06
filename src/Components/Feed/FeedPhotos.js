import React from 'react';
import styles from './FeedPhotos.module.css';
import FeedPhotosItem from './FeedPhotosItem';
import { useSelector } from 'react-redux';

const FeedPhotos = () => {
  const { list } = useSelector((state) => state.feed);

  return (
    <ul className={`${styles.feed} animeLeft`}>
      {list.map((photo) => (
        <FeedPhotosItem key={photo.id} photo={photo} />
      ))}
    </ul>
  );
};

export default FeedPhotos;

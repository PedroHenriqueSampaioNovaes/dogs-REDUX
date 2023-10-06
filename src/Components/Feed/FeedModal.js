import React from 'react';
import styles from './FeedModal.module.css';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/ui';

const FeedModal = () => {
  const { modal } = useSelector((state) => state.ui);
  const { data, loading, error } = useSelector((state) => state.photo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);

  function handleOutsideClick({ target, currentTarget }) {
    if (currentTarget === target) dispatch(closeModal());
  }

  if (!modal) return null;
  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent />}
    </div>
  );
};

export default FeedModal;

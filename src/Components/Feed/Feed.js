import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loadNewPhotos, resetFeedState } from '../../store/feed';
import Loading from '../Helper/Loading';
import Error from '../Helper/Error';

const Feed = ({ user }) => {
  const { infinite, loading, list, error } = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resetFeedState());

    dispatch(loadNewPhotos({ user, total: 6 }));
  }, [dispatch, user]);

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite && !wait) {
        const scroll = window.scrollY;
        const heightPage = document.body.offsetHeight - window.innerHeight;
        if (scroll >= heightPage) {
          dispatch(loadNewPhotos({ user, total: 6 }));
          wait = true;
          setTimeout(() => (wait = false), 500);
        }
      }
    }

    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [infinite, dispatch, user]);

  return (
    <div>
      <FeedModal />
      {list.length > 0 && <FeedPhotos infinite={infinite} />}
      {loading && <Loading />}
      {error && <Error error={error} />}
      {!infinite && !user && (
        <p
          style={{
            textAlign: 'center',
            padding: '2rem 0px 4rem 0px',
            color: '#888',
          }}
        >
          Não existem mais postagens
        </p>
      )}
    </div>
  );
};

Feed.defaultProps = {
  user: 0,
};

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;

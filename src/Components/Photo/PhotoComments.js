import React from 'react';
import styles from './PhotoComments.module.css';
import PhotoCommentsForm from './PhotoCommentsForm';
import { useSelector } from 'react-redux';

const PhotoComments = (props) => {
  const [comments, setComments] = React.useState(props.comments);
  const listComments = React.useRef();
  const { data } = useSelector((state) => state.user);

  React.useEffect(() => {
    listComments.current.scrollTop = listComments.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul
        ref={listComments}
        className={`${styles.comments} ${props.single ? styles.single : ''}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <strong>{comment.comment_author}:</strong> {comment.comment_content}
          </li>
        ))}
      </ul>
      {data && (
        <PhotoCommentsForm
          setComments={setComments}
          id={props.id}
          single={props.single}
        />
      )}
    </>
  );
};

export default PhotoComments;

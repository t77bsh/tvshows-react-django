import React, { useState, useEffect, useRef } from 'react'
import { Header } from '../components/Header';
import API from "../API";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './styles/showinfo.css'

function ShowInfo(props) {
  const { image, title, summary, genres, rating } = props;
  const user = sessionStorage.getItem('user');
  const [comment, setComment] = useState('');
  const [discussion, setDiscussion] = useState([]);
  const [editClicked, setEditClicked] = useState(null);
  const [updatedComment, setUpdatedComment] = useState('');
  const [userEmail, setUserEmail] = useState();
  const [deleteId, setDeleteId] = useState();
  const bottomRef = useRef();
  const confirmDelete = useRef();
  const auth = getAuth();

  useEffect(() => {
    refreshComments();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email)
      } else {
      }
    });
  }, [auth]);


  const refreshComments = () => {
    API.get('/')
      .then((res) => {
        setDiscussion(res.data);
      })
      .catch(console.error);
  };

  const commentsSection = discussion.filter(item => item.show === title);

  const signedInStatus = () => {
    if (user !== null) {
      return true
    }
    return false
  }
  //  CRUD section : //

  // create comment
  const handleSubmit = (e) => {
    e.preventDefault();
    const show = title;
    const username = userEmail;
    let data = { show, username, comment };
    API.post('/', data).then(() => refreshComments());
    bottomRef.current.scrollIntoView({ behavior: "smooth" }
    );
  };

  //edit comment 
  const editComment = (id) => {
    let updatedData = { comment: updatedComment };
    API.patch(`/${id}/`, updatedData).then(() => refreshComments());
    setEditClicked(null);
  }

  // delete comment
  const showModal = (id) => {
    confirmDelete.current.style.display = "flex";
    setDeleteId(id);
  }
  const deleteComment = (id) => {
    API.delete(`/${id}/`).then(() => confirmDelete.current.style.display = 'none').then(() => refreshComments());
  }
  /////////////////////

  return (
    <>
      <div
        className="bg-div"
        style={{
          backgroundImage: `url(${image})`
        }}
      ><Header />
      </div>

      <div className='content-div'>
        <div className='flexbox'>
          <div className='flex-1'>
            <div>
              <img src={image} alt="show-img" />
            </div>
            <div className='genres-div'>
              {genres.map((genre, index) => <button key={genre+index} className='genre'>{genre}</button>)}
            </div>
          </div>
          <div className='flex-2'>
            <div className='title-div'><span>{title}</span></div>
            <span>Rating: ⭐️ {rating}/10 </span>
            <div className='summary-txt' dangerouslySetInnerHTML={{ __html: summary }}></div>
          </div>
        </div>

        <div>
          {signedInStatus() ? <div className='comments-section'>
            <h3>Comments</h3>
            <form className='comments-form' onSubmit={handleSubmit}>
              <textarea name="comment" id="" cols="30" rows="3" placeholder='Add a comment...' value={comment} onChange={e => setComment(e.target.value)}></textarea> <br />
              <button className='CTA-button' type='submit'>Comment</button>
            </form>
            <div className='comments-display'>
              {commentsSection.map((item) => {
                return (
                  <div className='user-comment' >
                    <div className='user-comment__userEditDelete'>
                      <div className='user'>{item.username.substr(0, item.username.indexOf('@'))}</div>
                      <div>
                        {
                          item.username === userEmail ?
                            <>
                              {editClicked !== item.id ? <span className='user-comment__buttons'><FontAwesomeIcon icon={faPencil} onClick={() => setEditClicked(item.id)} /></span> : null}
                              <span className='user-comment__buttons'><FontAwesomeIcon className='trash-can' icon={faTrashCan} onClick={() => showModal(item.id)} /></span>
                            </>
                            : null
                        }
                      </div>
                    </div>

                    {editClicked !== item.id ? <div className='comment'>{item.comment}</div> :
                      <>
                        <textarea className='edit-comment' name="" id="" cols="30" rows="3" onChange={e => setUpdatedComment(e.target.value)}>{item.comment}</textarea>
                        <div className='cancel-save-div'>
                          <button className='cancel-save cancel' onClick={() => setEditClicked(null)}>Cancel</button>
                          <button className='cancel-save save' onClick={() => editComment(item.id)}>Save</button>
                        </div>
                      </>
                    }
                  </div>
                )
              })}
              <div style={{height:'20vh', width:'100%'}} ref={bottomRef}></div>
            </div>
          </div> : <div style={{ textAlign: 'center', color: 'white' }}>Log-in to comment!</div>}
        </div>
      </div>


      {/* modal */}
      <div ref={confirmDelete} className="confirm-delete">
        <div className="modal-content">
          <h1>Delete comment</h1>
          <p>Are you sure you want to delete this comment forever?</p>
          <button className="no" onClick={() => confirmDelete.current.style.display = 'none'}>NO, CANCEL</button>
          <button className="yes" onClick={() => deleteComment(deleteId)}>YES, DELETE</button>
        </div>
      </div>
    </>
  )
}

export default ShowInfo
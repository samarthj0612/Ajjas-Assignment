import React, { useRef, useState } from "react";
import "./assets/style.css";

const App = () => {
  const [newcomment, setNewcomment] = useState("");

  const commentfield = useRef(null);

  const [comments, setComments] = useState([]);

  const [currentComment, setCurrentComment] = useState("");

  const cancelHandler = () => {
    setNewcomment("");
  };

  const commentHandler = (e) => {
    e.preventDefault();

    if (currentComment != "") {
      let newCommentData = {
        author: "Samarth jain",
        data: newcomment,
        upvotes: 0,
        downvotes: 0,
      };


      comments[currentComment].replies.push(newCommentData);
    } else {
      let newCommentData = {
        author: "Samarth jain",
        data: newcomment,
        upvotes: 0,
        downvotes: 0,
        replies: [],
      };
      setComments([...comments, newCommentData]);
    }
    commentfield.current.focus();
    setCurrentComment("");
    setNewcomment("");
  };

  const replyHandler = (e) => {
    console.log(comments[e]);
    setCurrentComment(e);
    commentfield.current.focus();
  };

  const upvoteHandler = (e) => {
    
    
    setComments((data) => {
      data[e].upvotes = data[e].upvotes+1;
      return [...data];
    })
    
    console.log(comments[e]);

  };

  const downvoteHandler = (e) => {
    // comments[e].downvotes++;
    
    setComments((data) => {
      
      data[e].downvotes = data[e].downvotes+1;
      return [...data]
    })
    console.log(comments[e]);
  };

  let commentData = "";

  commentData = comments.map((data, i) => {
    return (
      <div key={i} className="comment m-2 p-2 rounded">
        <div className="d-flex gap-2">
          <div
            style={{
              height: "20px",
              width: "20px",
              border: "1px solid black",
              borderRadius: "50%",
            }}
          ></div>
          <span>{data.author}</span>
        </div>
        <p id="commentData">{data.data}</p>
        <div className="d-flex justify-content-end align-items-center">
          <i
            class="ri-arrow-up-circle-line text-success"
            onClick={() => upvoteHandler(i)}
          ></i>
          {data.upvotes}
          <i
            class="ri-arrow-down-circle-line text-danger ms-2"
            onClick={() => downvoteHandler(i)}
            ></i>
            {data.downvotes}
            <i class="ri-reply-line ms-2" onClick={() => replyHandler(i)}></i>
        </div>
      </div>
    );
  });

  console.log(comments);

  return (
    <div id="sj-main" className="p-3 d-flex">
      <div id="displaycomments" className="w-75">
        {commentData}
      </div>
      <br />
      <div id="commentsection" className="w-25">
        <textarea
          name="newcomment"
          id="newcomment"
          rows="25"
          placeholder="Type your comment here..."
          className="w-100"
          onChange={(e) => setNewcomment(e.target.value)}
          value={newcomment}
          ref={commentfield}
        ></textarea>
        <div className="d-flex justify-content-end gap-3">
          <button onClick={cancelHandler} className="btn px-3 btn-outline-dark">
            Cancel
          </button>
          <button onClick={commentHandler} className="btn px-3 btn-success">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

// PostDetail.js

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      setIsLoading(true);
      try {
        const url = `https://hn.algolia.com/api/v1/items/${postId}`;
        const res = await fetch(url);
        const data = await res.json();
        setPostDetails(data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  return (
    <div>
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <h1>{postDetails.title}</h1>
          <p>Points: {postDetails.points}</p>
          <h2>Comments:</h2>
          <ul>
            {postDetails.children &&
              postDetails.children.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PostDetail;

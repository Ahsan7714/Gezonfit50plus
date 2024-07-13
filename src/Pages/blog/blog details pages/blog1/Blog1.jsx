import React, { useEffect } from "react";
import "./Blog1.css";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById } from "../../../../store/reducers/postReducers";
import { useParams } from "react-router-dom";

function Blog1() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { blogdetails } = useSelector((state) => state.post);

  useEffect(() => {
    if (id) {
      dispatch(getBlogById(id));
      console.log(blogdetails);
    }
  }, [dispatch, id]);

  return (
    <div className="blog-detail-container font-outfit capitalize">
      {blogdetails ? (
        <div className="blog-detail py-10">
          <h1 className="text-[30px] p-4 font-semibold">{blogdetails.title}</h1>
          <div 
            className=" px-10" 
            dangerouslySetInnerHTML={{ __html: blogdetails.content }} 
          />
        </div>
      ) : (
        <div>No blog found</div>
      )}
    </div>
  );
}

export default Blog1;

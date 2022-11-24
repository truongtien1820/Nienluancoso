import React from "react";
import { Link } from "react-router-dom";

export const Post = ({ props }: any) => {
  return (
    <div className="w-full px-1 sm:px-3 sm:pt-3">
      <div className="group bg-gray-100 shadow-md rounded px-2 py-2">
        <Link to={"posts/" + props._id}>
          <div>{props.img ? <img className="h-40 w-full object-cover" src={props.img} alt="img" /> : ""}</div>
          <div className="p-3">
            <h1 className="group-hover:text-blue-500 text-left text-base font-bold">{props.title}</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

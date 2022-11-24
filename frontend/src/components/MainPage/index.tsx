import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import environment from "../../config";
import { UserContext } from "../../contexts/user-reducer";
import { Post } from "./post";

export const MainPage = () => {
  const { posts, myPosts } = useContext(UserContext);
  useEffect(() => {
    axios({
      url: `${environment.api}posts`,
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .then(({ data: { data } }) => {
        posts({
          myPosts: [...data],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-3">
        {myPosts
          .filter((el: any) => {
            return el.isChecked;
          })
          .map((el: any) => {
            return <Post key={"posts/" + el._id} props={el} />;
          })}
      </div>
    </div>
  );
};

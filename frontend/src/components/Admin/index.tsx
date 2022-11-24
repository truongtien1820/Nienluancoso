import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import environment from "../../config";
import { UserContext } from "../../contexts/user-reducer";
import { CheckPost } from "./checkPost";

export const Admin = () => {
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
      <Link to="/admin/users">Quan ly nguoi dung</Link>
      <div className="grid grid-cols-3">
        {myPosts
          .filter((el: any) => {
            return !el.isChecked;
          })
          .map((el: any) => {
            return <CheckPost key={"posts/" + el._id} props={el} />;
          })}
      </div>
    </div>
  );
};

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import environment from "../../config";
import { CheckPost } from "./checkPost";

export const Users = () => {
  const [users, setUsers] = useState([] as any);

  useEffect(() => {
    axios({
      url: `${environment.api}users`,
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .then(({ data: { data } }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-3">
        {users
          .filter((el: any) => {
            return !el.isAdmin;
          })
          .map((el: any) => {
            return (
              <div className="w-full px-1 sm:px-3 sm:pt-3">
                <div className="group bg-gray-100 shadow-md rounded px-2 py-2">
                  <Link to={"/admin/users/" + el._id}>
                    <div className="p-3">
                      <h1 className="group-hover:text-blue-500 text-left text-base font-bold">
                        Username: {el.username}
                      </h1>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import environment from "../../config";
import { UserContext } from "../../contexts/user-reducer";
import logo from "../../img/logo.png";
import { Search } from "./search";
export const Header = () => {
  const { isLogin, logout, login, idUser, isAdmin } = useContext(UserContext);

  useEffect(() => {
    if (idUser) {
      axios({
        url: `${environment.api}users/${idUser}`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          return res;
        })
        .then(({ data: { data } }) => {
          login({
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
            sex: data.sex,
            idUser: data._id,
            isAdmin: data.isAdmin,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [idUser]);

  return (
    <div className="fixed top-0 right-0 w-full z-10">
      <div className="flex justify-between items-center w-full bg-yellow-200 px-2 py-1 shadow-lg">
        <div>
          <div className="flex justify-between items-center px-3">
            <div>
              <img src={logo} alt="logo" className="w-10 h-5" />
            </div>
            <div>
              <Link className="px-2" to="/">
                Trang chủ
              </Link>
            </div>
            <div>
              <Link className="px-2" to={isLogin ? `create-posts` : `login`}>
                Tao bai viet
              </Link>
            </div>
            {isAdmin && (
              <div>
                <Link className="px-2" to="admin">
                  Admin page
                </Link>
              </div>
            )}
            {/* <div>
              <Link className="px-2" to="giao-ly">
                Giáo lý
              </Link>
            </div> */}
          </div>
        </div>
        {isLogin ? (
          <div className="flex justify-between items-center px-3">
            <div className="px-2">
              <Search />
            </div>
            <div>
              <Link
                className="px-2"
                to="logout"
                onClick={async () => {
                  await axios({
                    url: `${environment.api}logout`,
                    method: "POST",
                    withCredentials: true,
                  })
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  logout();
                }}
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center px-3">
            <div className="px-2">
              <Search />
            </div>
            <div>
              <Link className="px-2" to="/login">
                Login
              </Link>
            </div>
            <div>
              <Link className="px-2" to="/sign-up">
                Sign up
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

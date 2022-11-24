import React, { Suspense, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { DetailCheckPost } from "./components/Admin/detail-post";
import { DetailUser } from "./components/Admin/detail-user";
import { Users } from "./components/Admin/list-users";
import { CreatePosts } from "./components/CreatePosts";
import { DetailPost } from "./components/DetailPost";
import { UserContext } from "./contexts/user-reducer";
import { HeaderLayout } from "./layouts/header";
import { Loader } from "./layouts/loader";
import { AdminRoute } from "./route/admin.route";
import { ErrorRoute } from "./route/error.route";
import { GiaoLyRoute } from "./route/giao-ly.route";
import { LoginPageRoute } from "./route/login.route";
import { MainPageRoute } from "./route/main-page.route";
import { ProfilePageRoute } from "./route/profile.route";
import { SignupPageRoute } from "./route/signup.route";

function App() {
  const { isLogin, isAdmin } = useContext(UserContext);
  console.log(isAdmin);
  if (!isLogin) {
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<HeaderLayout />}>
            <Route path="/" element={<MainPageRoute />} />
            <Route path="posts/:postId" element={<DetailPost />} />
            <Route path="/giao-ly" element={<GiaoLyRoute />} />
            <Route path="/login" element={<LoginPageRoute />} />
            <Route path="/sign-up" element={<SignupPageRoute />} />
            <Route path="/*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>
      </Suspense>
    );
  } else {
    if (isAdmin) {
      // role admin
      return (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<HeaderLayout />}>
              <Route path="/" element={<MainPageRoute />} />
              <Route path="/giao-ly" element={<GiaoLyRoute />} />
              <Route path="/admin" element={<AdminRoute />} />
              <Route path="/create-posts" element={<CreatePosts />} />
              <Route path="posts/:postId" element={<DetailPost />} />
              <Route path="/admin/posts/:postId" element={<DetailCheckPost />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/users/:userId" element={<DetailUser />} />
              <Route path="/*" element={<Navigate to="/" replace={true} />} />
            </Route>
          </Routes>
        </Suspense>
      );
    } else if (!isAdmin) {
      // role user
      return (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<HeaderLayout />}>
              <Route path="/" element={<MainPageRoute />} />
              <Route path="/giao-ly" element={<GiaoLyRoute />} />
              <Route path="/create-posts" element={<CreatePosts />} />
              <Route path="/profile" element={<ProfilePageRoute />} />
              <Route path="posts/:postId" element={<DetailPost />} />
              <Route path="/*" element={<Navigate to="/" replace={true} />} />
            </Route>
          </Routes>
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<HeaderLayout />}>
              <Route path="/" element={<Navigate to="/404" replace={true} />} />
              <Route path="/404" element={<ErrorRoute />} />
              <Route path="/*" element={<Navigate to="/" replace={true} />} />
            </Route>
          </Routes>
        </Suspense>
      );
    }
  }
}

export default App;

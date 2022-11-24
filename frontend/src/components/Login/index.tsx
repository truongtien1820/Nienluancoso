import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";
import environment from "../../config";
import { UserContext } from "../../contexts/user-reducer";

export const Login = () => {
  const { login } = useContext(UserContext);
  const { addToast } = useToasts();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        await axios({
          url: environment.api + "login",
          method: "POST",
          data: {
            ...values,
          },
          withCredentials: true,
        }).then(({ data: { data } }) => {
          console.log(data);
          login({
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
            sex: data.sex,
            idUser: data._id,
            isAdmin: data.isAdmin,
          });
        });
        addToast("Login success!", {
          appearance: "success",
          autoDismiss: true,
        });
        formik.setSubmitting(false);
      } catch (error) {
        addToast("Let try again!", {
          appearance: "error",
          autoDismiss: true,
        });
        console.log(error);
        formik.setSubmitting(false);
      }
    },
  });
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              name="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Pasword:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <div className="pb-8 w-64">
            <button
              className="py-6 my-2 text-lg font-bold cursor-pointer transition-all duration-300 
            delay-75 rounded-full appearance-none flex items-center justify-center flex-shrink-0
            text-center no-underline text-white bg-blue-400 h-12 w-full disabled:opacity-50
            hover:bg-blue-700 active:bg-blue-300 shadow-xl"
              disabled={formik.isSubmitting}
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

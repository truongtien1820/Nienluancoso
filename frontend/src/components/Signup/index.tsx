import axios from "axios";
import { useFormik } from "formik";
// import { useDeprecatedAnimatedState } from 'framer-motion';
import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";
import environment from "../../config";
import { UserContext } from "../../contexts/user-reducer";

export const Signup = () => {
  const { register } = useContext(UserContext);
  const { addToast } = useToasts();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      phoneNumber: "",
      sex: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        await axios({
          url: environment.api + "signup",
          method: "POST",
          data: {
            ...values,
          },
        }).then(function ({ data: { data } }) {
          register({
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
            sex: data.sex,
            idUser: data._id,
            isAdmin: data.isAdmin,
          });
        });

        addToast("Register success!", {
          appearance: "success",
          autoDismiss: true,
        });
        formik.setSubmitting(false);
      } catch (error) {
        addToast("Let try again!", {
          appearance: "error",
          autoDismiss: true,
        });
        //console.log(error);
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
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              name="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone number:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              name="phoneNumber"
              type="text"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sex:
            </label>
            <div className="relative">
              <select
                value={formik.values.sex}
                name="sex"
                onChange={formik.handleChange}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
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
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

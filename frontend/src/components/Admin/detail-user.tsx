import axios from "axios";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import environment from "../../config";
import { UserContext } from "../../contexts/user-reducer";

export const DetailUser = () => {
  const { addToast } = useToasts();

  const { userId } = useParams();
  const { idUser, posts, myPosts } = useContext(UserContext);

  console.log(userId);
  const [data, setData] = useState(null as any);

  useEffect(() => {
    axios({
      url: `${environment.api}users/${userId}`,
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        return res;
      })
      .then(({ data: { data } }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      try {
        // Update infor user, but now it's not work
        formik.setSubmitting(true);
        await axios({
          url: environment.api + `posts/${data._id}`,
          method: "PUT",
          data: {
            ...data,
          },
          withCredentials: true,
        }).then(({ data: { data } }) => {
          console.log(data);
        });

        addToast("Check success!", {
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

  const onDelete = async () => {
    try {
      formik.setSubmitting(true);
      await axios({
        url: environment.api + `users/${data._id}`,
        method: "DELETE",
        data: {
          isChecked: true,
        },
        withCredentials: true,
      }).then(({ data: { data } }) => {
        console.log(data);
      });

      addToast("Check success!", {
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
  };

  return (
    <div className="w-full px-1 sm:px-3 sm:pt-3">
      <div className="shadow-md rounded px-2 py-2">
        {data && (
          <div key={"users/" + data._id}>
            <div className="p-3">
              <h1 className="text-left text-base font-bold">
                Username: {data.username}
              </h1>
            </div>
            <div className="p-3">
              <h1 className="text-left text-base font-bold">
                Email: {data.email}
              </h1>
            </div>
            <div className="p-3">
              <h1 className="text-left text-base">Phone: {data.phoneNumber}</h1>
            </div>
            <div className="p-3">
              <h1 className="text-left text-base">Sex: {data.sex}</h1>
            </div>
            <div className="pb-8 w-64">
              <button
                className="py-6 my-2 text-lg font-bold cursor-pointer transition-all duration-300 
            delay-75 rounded-full appearance-none flex items-center justify-center flex-shrink-0
            text-center no-underline text-white bg-red-400 h-12 w-full disabled:opacity-50
            hover:bg-blue-700 active:bg-blue-300 shadow-xl"
                disabled={formik.isSubmitting}
                type="button"
                onClick={() => {
                  onDelete();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

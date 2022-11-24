import axios from "axios";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import environment from "../../config";
import { UserContext } from "../../contexts/user-reducer";

export const DetailCheckPost = () => {
  const { addToast } = useToasts();

  const { postId } = useParams();
  const { idUser, posts, myPosts } = useContext(UserContext);

  console.log(postId);
  const [data, setData] = useState(null as any);
  const [own, setOwn] = useState(null as any);

  useEffect(() => {
    axios({
      url: `${environment.api}posts/${postId}`,
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

  useEffect(() => {
    if (data?.idUser) {
      axios({
        url: `${environment.api}users/${data?.idUser}`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          return res;
        })
        .then(({ data: { data } }) => {
          setOwn(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data?.idUser]);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        await axios({
          url: environment.api + `posts/${data._id}`,
          method: "PUT",
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
    },
  });

  const onDelete = async () => {
    try {
      formik.setSubmitting(true);
      await axios({
        url: environment.api + `posts/${data._id}`,
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
          <div key={"posts/" + data._id}>
            <div>
              {data.img ? (
                <img
                  className="h-40 w-full object-cover"
                  src={data.img}
                  alt="img"
                />
              ) : (
                ""
              )}
            </div>
            <div className="p-3">
              <h1 className="text-left text-base font-bold">{data.title}</h1>
            </div>
            <div className="p-3">
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: data.content,
                }}
              ></div>
            </div>
            <div className="p-3">
              <h1 className="text-left text-base font-bold">{data.theme}</h1>
            </div>
            <div className="p-3">
              <h1 className="text-left text-base">Author: {own?.username}</h1>
            </div>
            <div className="pb-8 w-64">
              <form onSubmit={formik.handleSubmit}>
                <button
                  className="py-6 my-2 text-lg font-bold cursor-pointer transition-all duration-300 
            delay-75 rounded-full appearance-none flex items-center justify-center flex-shrink-0
            text-center no-underline text-white bg-blue-400 h-12 w-full disabled:opacity-50
            hover:bg-blue-700 active:bg-blue-300 shadow-xl"
                  disabled={formik.isSubmitting}
                  type="submit"
                >
                  Duyet
                </button>
              </form>
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

import React, { useContext, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormik } from "formik";
import axios from "axios";
import environment from "../../config";
import { UserContext } from "../../contexts/user-reducer";
import { useToasts } from "react-toast-notifications";
import { toBase64 } from "../../lib";

export const CreatePosts = () => {
  const [content, setContent] = useState(EditorState.createEmpty());
  const { addToast } = useToasts();

  const { idUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      img: "",
      idUser: idUser,
      theme: "New",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        await axios({
          url: environment.api + "posts",
          method: "POST",
          data: {
            ...values,
            content: draftToHtml(convertToRaw(content.getCurrentContent())),
          },
        }).then(function ({ data: { data } }) {
          console.log(data);
        });

        addToast("Post success!", {
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
    <div className="w-full min-h-screen px-1 pt-1 sm:px-6 sm:pt-6">
      <div className="w-full">
        <form
          className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              name="title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </div>
          <div className="my-4">
            {formik.values.img ? <img src={formik.values.img} alt="img" /> : ""}
          </div>
          <div className="my-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image:
            </label>
            <div className="px-1 pt-1 sm:px-2 sm:pt-2 flex text-sm text-gray-600">
              <label
                htmlFor="img"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="img"
                  name="img"
                  type="file"
                  className="sr-only"
                  onChange={async (event: any) => {
                    const result = await toBase64(
                      event.currentTarget.files[0]
                    ).catch((err) => {
                      console.log(err);
                      addToast("File khong hop le!", {
                        appearance: "error",
                        autoDismiss: true,
                      });
                    });
                    formik.setFieldValue("img", result);
                  }}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>

          <div className="mb-4 max-w-sm">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                  Theme:
            </label>
            <div className="relative">
              <select
                value={formik.values.theme}
                name="theme"
                onChange={formik.handleChange}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="New">New</option>
                <option value="Cultural">Cultural</option>
                <option value="Life">Life</option>
                <option value="Education">Education</option>
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
          <div className="px-1 pt-1 sm:px-6 sm:pt-6">
            <Editor
              editorState={content}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="bg-white"
              onEditorStateChange={setContent}
            />
            <div className="pb-8 w-64">
              <button
                className="py-6 my-2 text-lg font-bold cursor-pointer transition-all duration-300 
            delay-75 rounded-full appearance-none flex items-center justify-center flex-shrink-0
            text-center no-underline text-white bg-blue-400 h-12 w-full disabled:opacity-50
            hover:bg-blue-700 active:bg-blue-300 shadow-xl"
                disabled={formik.isSubmitting}
                type="submit"
              >
                Post
              </button>
            </div>
            <p>Preview</p>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: draftToHtml(convertToRaw(content.getCurrentContent())),
              }}
            ></div>
          </div>
        </form>
      </div>
    </div>
  );
};

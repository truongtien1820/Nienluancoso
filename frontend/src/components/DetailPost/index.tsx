import axios from "axios";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import environment from "../../config";

export const DetailPost = () => {
  const { postId } = useParams();
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
          </div>
        )}
      </div>
    </div>
  );
};

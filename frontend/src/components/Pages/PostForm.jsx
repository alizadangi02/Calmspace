import React, { useState } from "react";
import { createPostAPI } from "../utils/apiRequest";
import Swal from "sweetalert2"; 
import { Vortex } from "./ui/vortex";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag);

    try {
      const response = await createPostAPI({ title, content, tags: tagsArray });

      Swal.fire({
        title: "Post Created!",
        text: "Your post has been created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTitle("");
      setContent("");
      setTags(""); 
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue creating the post. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <Vortex>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "7rem",
            paddingBottom: "4rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "60%",
              padding: "40px",
              backgroundColor: "black",
              borderRadius: "12px",
              boxShadow: "0 1px 10px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                marginBottom: "15px",
                fontSize: "25px",
                color: "#e0e0e0",
              }}
            >
              Create a New Post
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Post Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <textarea
                  placeholder="Post Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                  rows="6"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Tags (comma-separated)"
                  value={tags}
                  onChange={handleTagsChange}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default PostForm;

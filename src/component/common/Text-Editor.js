import React, { useRef } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";
// const config = {
//   buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
// };
const config = {
  readonly: false, // all options from https://xdsoft.net/jodit/doc/,
  height: "250px",
  // buttons: 'bold,italic,underline,|,ul,ol,|,link,image,|,p,h1,h2',
  // buttonsMD: 'bold,italic,underline,|,ul,ol,|,link,image,|,p,h1,h2',
  // toolbarAdaptive: false,
};
// const modules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["link", "code","image"],
//     ["clean"],
//   ],
// };

// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "code",
//   'image',
//   'imageBlot',
// ];

const TextEditor = ({ value, onChange, placeholder }) => {
  const editor = useRef(null);
  // const [content, setContent] = useState("");
  return (
    <>
      <div className="relative z-10">
        <JoditEditor
          ref={editor}
          value={value}
          config={config}
          tabIndex={1} // tabIndex of textarea
          // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={onChange}
        />
      </div>

      {/* <ReactQuill
        style={{ height: "190px" }}
        theme="snow"
        value={value || ""}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      /> */}
    </>
  );
};

export default TextEditor;

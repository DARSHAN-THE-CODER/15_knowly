import React, { useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    // loading: () => <p>Loading ...</p>,
});

const Markup = ({ data, setData, status, onClick, noSend }) => {

    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike", ],
            // [
            //     { list: "ordered" },
            //     { list: "bullet" },
            //     { indent: "-1" },
            //     { indent: "+1" },
            // ],
            // ["link"],
            // ["clean"],
        ],
    };

    const formats = [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        // "list",
        // "bullet",
        // "indent",
        // "link",
        // "image",
    ];

    function setFocus(editor) {
        editor.focus();
    }

    // console.log(data)
    console.log(data)
    return (
        <div className="flex  justify-center">
            <div className="flex w-full flex-row text-white p-3 overflow-hidden">
                <div className="w-full text-white bg-black border-none">
                    <QuillNoSSRWrapper
                        value={data}
                        className="text-white max-h-[200px] overflow-auto"
                        modules={modules}
                        required={true}
                        onEditorCreated={(editor) => setFocus(editor)}
                        formats={formats}
                        // onKeyUp={(e) => {
                        //     if (e.code === "Enter" && e.shiftKey === false) {
                        //         e.preventDefault();
                        //         // if (status) {
                        //         //   onClick();
                        //         // }
                        //     }
                        // }}
                        placeholder={"Type a message"}
                        onChange={(e) => {
                            setData(e);
                        }}
                        style={{ wordBreak: "break-all", color: "white"}}
                        theme="snow"
                    />
                </div>
                {/* {!noSend && (
                    <div className="border-2 p-2 hover:cursor-pointer border-none text-lg text-black rounded-lg flex">
                        {status ? (
                            <div
                                onClick={onClick}
                                className="p-2 my-auto border-2 hover:cursor-pointer border-black text-lg text-black rounded-lg flex"
                            >
                                {data === "<p><></p>" ? (
                                    <AiOutlineSend className="ml-1 my-auto" />
                                ) : (
                                    <IoSend className="ml-1 my-auto" />
                                )}
                            </div>
                        ) : (
                            <div className="p-2 my-auto border-2 hover:cursor-pointer border-black rounded-lg flex">
                                <LoadBtn status={"Sending"} />
                            </div>
                        )}
                    </div>
                )} */}
            </div>
        </div>
    )

}

export default Markup;
import { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";

import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import Question from "./Question";



const Landing = ({ code, setCode, show = false, question, title, handleSubmit, handleTeacherAnswerShow }) => {
  // const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [selected, setSelected] = useState({
    id: "0",
    status: false
  })

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    console.log(formData)
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="flex flex-row justify-end">
          <div className="px-4 py-2">
            <LanguagesDropdown onSelectChange={onSelectChange} />
          </div>
          <div className="px-4 py-2">
            <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
          </div>
        </div>
        <div className="flex flex-row space-x-4 items-start px-4 py-4 ">


          <div className="right-container flex flex-shrink-0 w-[30%] flex-col">

            <div className="flex flex-col">
              <Question question={question} title={title} />
              <div className="flex justify-evenly">

              <button
                onClick={handleTeacherAnswerShow}
                // disabled={!code}
                className={classnames(
                  "mt-4 border-2 border-black z-10 rounded-md  px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                  !code ? "opacity-50" : ""
                )}
              >
                Submit
              </button>
              <button
                onClick={handleSubmit}
                // disabled={!code}
                className={classnames(
                  "mt-4 border-2 border-black z-10 rounded-md  px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                  !code ? "opacity-50" : ""
                )}
              >
                Knowly Review
              </button>
              </div>
            </div>

            {show && (<><OutputWindow outputDetails={outputDetails} />
              <div className="flex flex-col items-end">
                <CustomInput
                  customInput={customInput}
                  setCustomInput={setCustomInput}
                />
                <button
                  onClick={handleCompile}
                  disabled={!code}
                  className={classnames(
                    "mt-4 border-2 border-black z-10 rounded-md  px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                    !code ? "opacity-50" : ""
                  )}
                >
                  {processing ? "Processing..." : "Compile and Execute"}
                </button>
              </div>
            </>
            )}
            {show && (outputDetails && <OutputDetails outputDetails={outputDetails} />)}

          </div>



          <div className="flex flex-col w-full h-[40vh] justify-start items-end">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value}
            />
            {/* {
              review && (
                <div className='flex flex-col border-black rounded-xl p-4 w-full shadow-lg border-2'>
                    <h2 className='text-center text-3xl font-bold'>Knowly Review</h2>
                    <div id="knowlyreview" className='text-xl'></div>
                </div>
            )
            } */}
          </div>

        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default Landing;

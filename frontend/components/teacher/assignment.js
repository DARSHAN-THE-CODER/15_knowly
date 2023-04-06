import React, { useState } from "react";
// import { PlusCircleIcon } from "@heroicons/react/solid";

function AssignmentComponent({ title, setTitle, question, setQuestion, solution, setSolution, testCases, setTestCases, handleSubmit}) {
  // const [question, setQuestion] = useState("");
  // const [solution, setSolution] = useState("");
  // const [title, setTitle] = useState("")

  // const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // console.log(question);
  //   // console.log(solution);
  //   // console.log(testCases);
  //   let temp = {
  //     title: title,
  //     question: question,
  //     answer: solution,
  //     testCases: testCases
  //   }
  //   console.log(temp)
  // };

  return (
    <div className="max-w-xl mx-auto p-4 shadow-lg m-auto mt-10">
      <h2 className="font-bold text-2xl text-center text-gray-600">Enter the question and test cases</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="question">
            Title
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            id="question"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="question">
            Question
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
        </div>


        <div className="mb-4">
          <label className="block font-bold mb-2">Test Cases</label>
          {testCases.map((testCase, index) => (
            <div key={index} className="mb-2">
              <p>Test Case : {index + 1}</p>
              <input
                className="w-full px-3 py-2 border rounded mb-2"
                placeholder="Input"
                value={testCase.input}
                onChange={(event) =>
                  handleTestCaseChange(index, "input", event.target.value)
                }
              />
              <input
                className="w-full px-3 py-2 border rounded"
                placeholder="Output"
                value={testCase.output}
                onChange={(event) =>
                  handleTestCaseChange(index, "output", event.target.value)
                }
              />
            </div>
          ))}
          <button
            className="flex items-center px-3 py-2 text-gray-700 border rounded hover:bg-gray-100"
            type="button"
            onClick={handleAddTestCase}
          >
            {/* <PlusCircleIcon className="h-5 w-5 mr-2" /> */}
            Add Test Case
          </button>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="question">
            Solution
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            id="solution"
            value={solution}
            onChange={(event) => setSolution(event.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AssignmentComponent;

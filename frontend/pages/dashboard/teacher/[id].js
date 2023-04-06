import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import Card from '@/components/common/Card'

import Markup from '@/components/common/Markup'

function Teacher() {

  const router = useRouter()
  const [data, setData] = useState("tags for better visibility\n\nI would give your code a 6/10. Your code would only work for arrays with two answers, which your testcases do not reflect. Modify the code so that it works with an array of any length like this:\n\n<code>class Solution {\npublic:\n vector<int> twoSum(vector<int>& nums, int target) {\n map<int,int> m;\n for(int i=0;i<nums.size();i++){\n if(m.find(nums[i]) != m.end()){\n return {m[nums[i]],i};\n } else {\n m[target - nums[i]] = i;\n }\n }\n return {-1,-1};\n }\n};\n</code>\nThe only change I made was to move the return statement within the if-statement, which stores the indices of the two numbers that add up to the target. This ensures that the code will work with arrays of any length and testcases with multiple answers.")
  useEffect(() => {
    console.log(router.query['id'])
    // if(process.browser){
    //   const temp = document.getElementById('xyz');
    //   temp.innerHTML = replace(replace("I&nbsp;would&nbsp;give&nbsp;your&nbsp;code&nbsp;a&nbsp;7/10.&nbsp;Some&nbsp;issues&nbsp;with&nbsp;your&nbsp;code&nbsp;are&nbsp;that&nbsp;the&nbsp;for&nbsp;loop&nbsp;should&nbsp;use&nbsp;i++&nbsp;instead&nbsp;of&nbsp;i--,&nbsp;and&nbsp;the&nbsp;map&nbsp;should&nbsp;be&nbsp;declared&nbsp;outside&nbsp;the&nbsp;for&nbsp;loop.&nbsp;Here&nbsp;is&nbsp;the&nbsp;corrected&nbsp;code:\n\nclass&nbsp;Solution&nbsp;{\n&nbsp;public:&nbsp;vector<int>&nbsp;twoSum(vector<int>&&nbsp;nums,&nbsp;int&nbsp;target)&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;map<int,&nbsp;int>&nbsp;m;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;<&nbsp;nums.size();&nbsp;i++)&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(m.find(nums[i])&nbsp;==&nbsp;m.end())&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m[target&nbsp;-&nbsp;nums[i]]&nbsp;=&nbsp;i;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;{m[nums[i]],&nbsp;i};\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;{-1,&nbsp;-1};\n&nbsp;&nbsp;&nbsp;&nbsp;}\n};"));
    // }
  }, [])
  // const temp = document.getElementById('xyz');
  const cardData = [
    {
      title: "Conduct Quiz",
      img: "",
      button: "Proceed"
    },
    {
      title: "Create Assignment",
      img: "",
      button: "Proceed",
      path: "/dashboard/teacher/assignment"
    },
    {
      title: "Upload notes",
      img: "",
      button: "Proceed"
    }
  ]

  // function callthis(){
  //   if(process.browser){
  //     const temp = document.getElementById('xyz');
  //     temp.innerHTML = replace(replace("I&nbsp;would&nbsp;give&nbsp;your&nbsp;code&nbsp;a&nbsp;7/10.&nbsp;Some&nbsp;issues&nbsp;with&nbsp;your&nbsp;code&nbsp;are&nbsp;that&nbsp;the&nbsp;for&nbsp;loop&nbsp;should&nbsp;use&nbsp;i++&nbsp;instead&nbsp;of&nbsp;i--,&nbsp;and&nbsp;the&nbsp;map&nbsp;should&nbsp;be&nbsp;declared&nbsp;outside&nbsp;the&nbsp;for&nbsp;loop.&nbsp;Here&nbsp;is&nbsp;the&nbsp;corrected&nbsp;code:\n\nclass&nbsp;Solution&nbsp;{\n&nbsp;public:&nbsp;vector<int>&nbsp;twoSum(vector<int>&&nbsp;nums,&nbsp;int&nbsp;target)&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;map<int,&nbsp;int>&nbsp;m;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;<&nbsp;nums.size();&nbsp;i++)&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(m.find(nums[i])&nbsp;==&nbsp;m.end())&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m[target&nbsp;-&nbsp;nums[i]]&nbsp;=&nbsp;i;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;{m[nums[i]],&nbsp;i};\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;{-1,&nbsp;-1};\n&nbsp;&nbsp;&nbsp;&nbsp;}\n};"));
  //   }
  // }

  // function replace(string){
  //   const replacedStr = string.replace(/\n/g, "<p></p>");
  //   let modifiedString = replacedStr.replace(/ /g, '&nbsp;').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  //   if(process.browser){
  //     const temp = document.getElementById('xyz');
  //     temp.innerHTML = modifiedString;
  //   }
  //   return modifiedString;
  // }

  return (
    <div className='h-[80vh]'>
      <div className='flex flex-wrap justify-center items-center m-auto h-full'>
        {
          cardData.map((card, index) => (
            <div className='w-[300px] m-auto'>
              <Card title={card.title} btnContent={card.button} img={card.img} path={card?.path} />
            </div>
          ))
        }
        {/* <p contentEditable='true' dangerouslySetInnerHTML={{__html: replace("I&nbsp;would&nbsp;give&nbsp;your&nbsp;code&nbsp;a&nbsp;7/10.&nbsp;Some&nbsp;issues&nbsp;with&nbsp;your&nbsp;code&nbsp;are&nbsp;that&nbsp;the&nbsp;for&nbsp;loop&nbsp;should&nbsp;use&nbsp;i++&nbsp;instead&nbsp;of&nbsp;i--,&nbsp;and&nbsp;the&nbsp;map&nbsp;should&nbsp;be&nbsp;declared&nbsp;outside&nbsp;the&nbsp;for&nbsp;loop.&nbsp;Here&nbsp;is&nbsp;the&nbsp;corrected&nbsp;code:\n\nclass&nbsp;Solution&nbsp;{\n&nbsp;public:&nbsp;vector<int>&nbsp;twoSum(vector<int>&&nbsp;nums,&nbsp;int&nbsp;target)&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;map<int,&nbsp;int>&nbsp;m;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i&nbsp;=&nbsp;0;&nbsp;i&nbsp;<&nbsp;nums.size();&nbsp;i++)&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(m.find(nums[i])&nbsp;==&nbsp;m.end())&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m[target&nbsp;-&nbsp;nums[i]]&nbsp;=&nbsp;i;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;{m[nums[i]],&nbsp;i};\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;{-1,&nbsp;-1};\n&nbsp;&nbsp;&nbsp;&nbsp;}\n};") }} /> */}
        {/* <div className='bg-blue-300 p-4 rounded-2xl w-[700px] break-all' id='xyz'></div> */}
      {/* <Markup
        data={data}
        setData={setData}
      /> */}
      </div>
    </div>
  )
}

export default Teacher
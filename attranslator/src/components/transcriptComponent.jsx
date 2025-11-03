import React from 'react'

const transcriptComponent = ({transcript}) => {
    console.log("transcript in usememo");
    console.log(transcript);
    
  return (
    <>
        <div className="w-fit h-full md:w-full bg-green-400 overflow-y-auto p-4 text-white break-words">
          {transcript || "Transcript will appear here..."}
        </div>
    </>
  )
}

export default transcriptComponent

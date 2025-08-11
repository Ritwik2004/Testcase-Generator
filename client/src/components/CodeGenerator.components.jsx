import React, { useState } from 'react'
import Markdown from "react-markdown"
import { generateCode } from '../../context/api.js'

const CodeGeneratorComponent = ({ genCode }) => {

  return (
    <div>
      <h2 className="text-lg text-center font-semibold mb-4">Suggested Test Cases</h2>

      {genCode && (
        <div className="mt-6 text-gray-900 p-4 rounded overflow-auto">
          <Markdown>
            {genCode}
          </Markdown>
        </div>
      )}
    </div>
  )
}

export default CodeGeneratorComponent

import { OpenAI } from "openai";
import path from "path"
import { History } from "../models/user.model.js";


const AI = new OpenAI({
    apiKey: process.env.GEMNI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// const generateTestCase = async (req, res) => {
//     console.log("Comming in generate summaries")
//     try {
//         const { files } = req.body
//         console.log("file : ", files)

//         const prompt = `Generate test case summaries for these files:\n\n${files
//             .map((f) => `File: ${f.filename}\n${f.content}`)
//             .join("\n\n")}`;
//         console.log("Prompt : ", prompt)
//         const response = await AI.chat.completions.create({
//             model: "gemini-2.0-flash",
//             messages: [
//                 {
//                     role: "user",
//                     content: prompt,
//                 },
//             ]
//         })
//         console.log("response : ", response.choices[0].message.content)
//         //connect database

//         res.json({ success: true, message: response.choices[0].message.content })

//     } catch (error) {
//         console.log("error : ", error || "generate case error")
//         res.json({ success: false, message: error.message })
//     }
// }

// const codeGenerator = async (req, res) => {

//     try {

//         // const { summary } = req.body;
//         const { files } = req.body
//         let extension;
//         files.forEach(file => {
//             const ext = path.extname(file.filename);
//             if (ext === ".js") {
//                 extension = "Java Script,"
//             }
//             else if (ext === ".cpp") {
//                 extension = "C++,"
//             }
//             else if (ext === ".c") {
//                 extension = "C,"
//             }
//             else if (ext === ".java") {
//                 extension = "Java,"
//             }
//             else if (ext === ".py") {
//                 extension = "Python,"
//             }
//             else {
//                 extension = ext + ","
//             }
//         });
//         // console.log(files)
//         const prompt = `I provide you a coding file which is written with ${extension} code \nGenerate test case for this files :\n\n${files} \n Only give the testcases with mentioning the file name no other thing`;
//         const response = await AI.chat.completions.create({
//             model: "gemini-2.0-flash",
//             messages: [
//                 {
//                     role: "user",
//                     content: prompt,
//                 },
//             ]
//         })

//         //save response in database
//         console.log("Response : ", response.choices[0].message.content)
//         res.json({ success: true, message: response.choices[0].message.content })
//     } catch (error) {
//         console.log("error : ", error)
//         res.json({ success: false, message: error.message })
//     }
// }


const codeGenerator = async (req, res) => {
  try {
    const { files, username } = req.body;

    const extensions = [];
    let filenames = "";
    files.forEach(file => {
      const ext = path.extname(file.filename);
      const name = path.basename(file.filename, ext)
      filenames += name + ext + " | "
      if (ext === ".js") extensions.push("JavaScript");
      else if (ext === ".cpp") extensions.push("C++");
      else if (ext === ".c") extensions.push("C");
      else if (ext === ".java") extensions.push("Java");
      else if (ext === ".py") extensions.push("Python");
      else extensions.push(ext.replace(".", "").toUpperCase());
    });

    const extensionText = extensions.join(", ");
    const fileDetails = files
      .map(f => `File: ${f.filename}\n${f.content}`)
      .join("\n\n");

    const prompt = `I provide you coding files written in ${extensionText}.\nGenerate test cases for these files: ${fileDetails}.\nOnly give the test cases with mentioning the file names (highlight the file names), nothing else.`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
    });
    const HistoryCreation = await History.create({
      username,
      fileName : filenames,
      response : response.choices[0].message.content
    })
    if(!HistoryCreation){
      console.log("History is not created")
    }
    // console.log("Response:", response.choices[0].message.content);
    res.json({ success: true, message: response.choices[0].message.content });
  } catch (error) {
    console.log("error:", error);
    res.json({ success: false, message: error.message });
  }
};


export {
    // generateTestCase,
    codeGenerator
}
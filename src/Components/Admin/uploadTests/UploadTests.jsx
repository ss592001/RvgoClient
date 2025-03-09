import React, { useState } from "react";
import "./UploadTests.css";
import CustomInput from "../../CustomComponents/CustomInput/CustomInput";
import CustomButton from "../../CustomComponents/CustomButton/CustomButton";
import CustomLoader from "../../CustomComponents/CustomLoader/CustomLoader";
import { PostRoute } from "../../Custom_hooks/Routes";
import { SubmitTestConfirmation } from "../../CustomComponents/CustomTestPlatform/CustomTestPlatform";
import ClimbingBoxLoader from "react-spinners/ClipLoader";

import { url } from "../../Custom_hooks/Routes";
import { toast } from "react-toastify";
import { useMediaQuery } from "../../Custom_hooks/Custom";
export const FilePicker = ({
  htmlFor,
  isLableVisible,
  isSubmitBtnVisible,
  selectedFile,
  onChange,
  lableStyle,
  lableInfo,
  accept,
  lable,
  containerStyle,
}) => {
  return (
    <div style={{ marginTop: "0%", width: "100%" }}>
      {isLableVisible && (
        <CustomInput
          label={lable}
          placeholder={""}
          type={"text"}
          handleInputChange={() => {}}
          value={""}
          Required={false}
          inputStyle={{ display: "none" }}
          labelStyle={{ marginTop: 0 }}
        />
      )}
      <div className="fileInputBox" style={{ ...lableStyle }}>
        <label id="fileLabel" htmlFor={htmlFor}>
          {selectedFile ? selectedFile.name : lableInfo}
        </label>
        <input
          type="file"
          id={htmlFor}
          name={htmlFor}
          className="fileinputfortraining"
          accept={accept}
          onChange={onChange}
        />
        {isSubmitBtnVisible && (
          <CustomButton
            text={"Start extracting Data from pdf"}
            style={{ borderRadius: "1vw" }}
          />
        )}
      </div>
    </div>
  );
};
const UploadTests = () => {
  const isMobile = useMediaQuery("(max-width:430px)");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [marks, setMarks] = useState("");
  const [type, setType] = useState("Mock");
  const [subject, setSubject] = useState("Mock");
  const [uploadedData, setUploadedData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isSubmiting, setisSubmiting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImagePdf, setSelectedImagePdf] = useState(null);
  const [error, setError] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploader, setUploader] = useState(0);

  const handleUploadImagePdf = (ev) => {
    setUploader(1);
    const file = ev.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    setSelectedImagePdf(file);
    if (file)
      fetch(`${url}/uploadImagePdf`, {
        method: "POST",
        body: formdata,
      })
        .then((response) => {
          if (!response.ok) {
            console.log(error);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setUploadedData(data);
          if (!data[0]) {
            setUploader(2);
          } else {
            setUploader(0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const handleUploadQAPdf = (ev) => {
    setUploader(1);
    const file = ev.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    setSelectedFile(file);
    if (file)
      fetch(`${url}/uploadQAPdf`, {
        method: "POST",
        body: formdata,
      })
        .then((response) => {
          if (!response.ok) {
            console.log(error);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setUploadedData(data);
          if (!data[0]) {
            setUploader(2);
          } else {
            setUploader(0);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const handleUploadImage = (ev, index) => {
    console.log("index", index);
    const file = ev.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    fetch(`${url}/uploadImages`, {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        if (!response.ok) {
          console.log(error);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        handleUpdateQuestion(data, index);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdateQuestion = (image, index) => {
    console.log("flow", image, index);
    setUploadedData((prevQuestion) =>
      prevQuestion.map((_question, _index) =>
        _index === index
          ? {
              ..._question,
              diagram: `${url}/images/${image}`,
            }
          : _question
      )
    );
    console.log("uploaded doc", uploadedData);
  };

  const handleSaveTest = () => {
    const bodyData = {
      name: name,
      description: description,
      type: subject,
      totalMarks: marks,
      testTime: duration,
      uploadedAt: new Date(),
      Test: uploadedData,
    };
    if (
      name !== "" &&
      description !== "" &&
      type !== "" &&
      marks !== "" &&
      duration !== "" &&
      uploadedData.length !== 0
    ) {
      PostRoute(
        "saveTest",
        () => {
          setLoader(true);
        },
        (res) => {
          console.log(res);
          if (res.status === 200) {
            setLoader(false);
            toast.success(
              "Test uploaded successfully. You can now view this test in the tests section."
            );
          } else if (res.status === 201) {
            toast.error("Something went wrong . Please try again.");
            setError("Something went wrong . Please try again.");
          }
        },
        bodyData
      );
    } else {
      toast.error("Missing Fileds. All Fields are Required.");
      // setisSubmiting(true);
    }
  };

  const handleMcqEdit = (ev, index) => {
    // console.log(index, ev.target.innerText);
    uploadedData[index].question = ev.target.innerText;
    console.log("new mcq question change", uploadedData);
  };
  const handleExplanationEdit = (ev, index) => {
    // console.log(index, ev.target.innerText);
    uploadedData[index].explanation = ev.target.innerText;
    console.log("new mcq explanation change", uploadedData);
  };
  const handleAnswerEdit = (ev, index) => {
    // console.log(index, ev.target.innerText);
    uploadedData[index].answer = ev.target.innerText;
    console.log("new mcq answer change", uploadedData);
  };
  const handleOptionEdit = (ev, quesIndex, optionIndex) => {
    // console.log(quesIndex, optionIndex, ev.target.innerText);
    const question = uploadedData[quesIndex];
    question.options[optionIndex] = ev.target.innerText;
    console.log("new mcq option change", uploadedData);
  };
  return (
    <>
      <SubmitTestConfirmation
        isOpen={isSubmiting}
        onClose={() => {
          setisSubmiting(!isSubmiting);
        }}
        onConfirm={() => {}}
        isCancelButtonVisible={true}
        isConfirmButtonVisible={false}
        message={
          "All fields are required to make a test. Please fill out all the details before saving the test."
        }
        fontSize="1.3vw"
      />
      <div className="testContainer">
        <div className="testHeader">
          <div
            style={
              isMobile
                ? { width: "100%", color: "rgb(126, 23, 28)", fontSize: "4vw" }
                : { width: "100%", color: "rgb(126, 23, 28)", fontSize: "2vw" }
            }
          >
            Upload New Test
          </div>
          <div
            className=""
            style={{
              marginLeft: "63%",
            }}
          >
            {loader ? (
              <>
                <div
                  style={{
                    position: "fixed",
                    right: "7%",
                    top: isMobile ? "6.7%" : "5%",
                  }}
                >
                  <ClimbingBoxLoader
                    color={"rgb(126, 23, 28)"}
                    loading={loader}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              </>
            ) : (
              <CustomButton
                text={"Upload Test"}
                style={{
                  width: isMobile ? "30%" : "15%",
                  height: isMobile ? "3.5vh" : "",
                  position: "fixed",
                  right: "2%",
                  marginTop: isMobile ? "-4%" : "0%",
                  marginLeft: "2%",
                  backgroundColor: "blue",
                }}
                handleClick={() => {
                  handleSaveTest();
                }}
              />
            )}
          </div>
        </div>
        <div
          className="allTestsContainer"
          style={{ height: "86vh", padding: "2%", boxSizing: "border-box" }}
        >
          <CustomInput
            label={"Test Name"}
            placeholder={"Enter test name"}
            type={"text"}
            handleInputChange={(ev) => {
              setName(ev.target.value);
            }}
            value={name}
            Required={true}
            inputStyle={{
              width: isMobile ? "100%" : "97%",
              backgroundColor: "rgb(219, 219, 219)",
            }}
            labelStyle={{}}
          />
          <CustomInput
            label={"Test Description"}
            placeholder={"Enter test description"}
            type={"text"}
            handleInputChange={(ev) => {
              setDescription(ev.target.value);
            }}
            value={description}
            Required={true}
            inputStyle={{
              width: isMobile ? "100%" : "97%",
              backgroundColor: "rgb(219, 219, 219)",
            }}
            labelStyle={{}}
          />
          <div style={{ display: "flex", gap: "2%" }}>
            <div className="testMoreInfoContainer">
              <CustomInput
                label={"Test Time Duration (min)"}
                placeholder={"Enter test time duration"}
                type={"text"}
                handleInputChange={(ev) => {
                  setDuration(ev.target.value);
                }}
                value={duration}
                Required={true}
                inputStyle={{}}
                labelStyle={{ marginTop: 0 }}
              />
              <CustomInput
                label={"Total Marks"}
                placeholder={"Enter test marks"}
                type={"text"}
                handleInputChange={(ev) => {
                  setMarks(ev.target.value);
                }}
                value={marks}
                Required={true}
                inputStyle={{}}
                labelStyle={{}}
              />
            </div>
            <div className="testMoreInfoContainer" style={isMobile ? {} : {}}>
              <CustomInput
                label={"Test Type"}
                placeholder={"Test time"}
                type={"text"}
                handleInputChange={() => {}}
                value={""}
                Required={true}
                inputStyle={{ display: "none" }}
                labelStyle={{ marginTop: 0 }}
              />

              <div
                style={{
                  display: "flex",
                  gap: isMobile ? "10%" : "5%",
                  overflow: "scroll",
                  scrollbarWidth:isMobile?'thin':'none', scrollbarColor: 'transparent',
                  marginBottom: isMobile ? "5%" : "0%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "10%" : "5%",
                  }}
                >
                  <input
                    type="radio"
                    name="testType"
                    style={
                      isMobile
                        ? { height: "6vw", width: "6vw" }
                        : { height: "1.5vw", width: "1.5vw" }
                    }
                    checked={type === "Practice"}
                    onChange={() => {
                      setType("Practice");
                    }}
                    onChangeCapture={() => {
                      setType("Practice");
                    }}
                    value={"Practice"}
                  />
                  <div>Practice</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5%",
                    margin: "2%",
                    marginLeft: 0,
                  }}
                >
                  <input
                    type="radio"
                    name="testType"
                    style={
                      isMobile
                        ? { height: "5vw", width: "5vw" }
                        : { height: "1.5vw", width: "1.5vw" }
                    }
                    checked={type === "Mock"}
                    onChange={() => {
                      setType("Mock");
                      setSubject("Mock");
                    }}
                    onChangeCapture={() => {
                      setType("Mock");
                      setSubject("Mock");
                    }}
                    value={"Mock"}
                  />
                  <div>Mock</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "10%" : "5%",
                  }}
                >
                  <input
                    type="radio"
                    name="testType"
                    style={
                      isMobile
                        ? { height: "6vw", width: "6vw" }
                        : { height: "1.5vw", width: "1.5vw" }
                    }
                    checked={type === "diagnostic"}
                    onChange={() => {
                      setType("diagnostic");
                      setSubject("diagnostic");
                    }}
                    onChangeCapture={() => {
                      setType("diagnostic");
                      setSubject("diagnostic");
                    }}
                    value={"diagnostic"}
                  />
                  <div>Diagnostic</div>
                </div>
              </div>
              {type === "Practice" && (
                <>
                  <div
                    style={{
                      display: isMobile ? "block" : "flex",
                      gap: "5%",
                      borderTop: isMobile ? "1px solid white" : "",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5%",
                        marginTop: isMobile ? "5%" : "0%",
                      }}
                    >
                      <input
                        type="radio"
                        name="testTypeSub"
                        style={
                          isMobile
                            ? { height: "3vw", width: "3vw" }
                            : { height: "1.5vw", width: "1.5vw" }
                        }
                        checked={subject === "English Reading Practice"}
                        onChange={() => {
                          setSubject("English Reading Practice");
                        }}
                        onChangeCapture={() => {
                          setSubject("English Reading Practice");
                        }}
                        value={"English Reading Practice"}
                      />
                      <div>English Reading</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5%",
                        margin: "2%",
                        marginLeft: 0,
                      }}
                    >
                      <input
                        type="radio"
                        name="testTypeSub"
                        style={
                          isMobile
                            ? { height: "3vw", width: "3vw" }
                            : { height: "1.5vw", width: "1.5vw" }
                        }
                        checked={subject === "English Writing Practice"}
                        onChange={() => {
                          setSubject("English Writing Practice");
                        }}
                        onChangeCapture={() => {
                          setSubject("English Writing Practice");
                        }}
                        value={"English Writing Practice"}
                      />
                      <div>English Writing</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5%",
                        margin: "2%",
                        marginLeft: 0,
                      }}
                    >
                      <input
                        type="radio"
                        name="testTypeSub"
                        style={
                          isMobile
                            ? { height: "3vw", width: "3vw" }
                            : { height: "1.5vw", width: "1.5vw" }
                        }
                        checked={subject === "Maths Practice"}
                        onChange={() => {
                          setSubject("Maths Practice");
                        }}
                        onChangeCapture={() => {
                          setSubject("Maths Practice");
                        }}
                        value={"Maths Practice"}
                      />
                      <div>Maths</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "2%",
              width: "100%",
              marginTop: "4%",
            }}
          >
            <FilePicker
              // lable={'CHOOSE PDF TYPE FOR MCQ *'}
              htmlFor={"fileInput"}
              isLableVisible={true}
              isSubmitBtnVisible={false}
              selectedFile={selectedFile}
              onChange={handleUploadQAPdf}
              lableInfo={"UPLOAD TEXT PDF HERE"}
              accept=".pdf"
              lableStyle={{
                fontSize: "1.5vw",
                boxShadow: "2px 2px 10px -2px black",
                borderRadius: "1vw",
              }}
            />
            <FilePicker
              htmlFor={"fileInput2"}
              isLableVisible={true}
              isSubmitBtnVisible={false}
              selectedFile={selectedImagePdf}
              onChange={handleUploadImagePdf}
              lableInfo={"UPLOAD IMAGE PDF HERE"}
              accept=".pdf"
              lableStyle={{
                fontSize: "1.5vw",
                backgroundColor: "rgb(255, 206, 208)",
                color: "white",
                borderRadius: "1vw",
                boxShadow: "2px 2px 10px -2px black",
              }}
            />
          </div>

          <div style={{ margin: "5%" }}>
            {uploader === 1 && (
              <div
                style={
                  isMobile
                    ? { fontSize: "3vw", color: "black",marginLeft:'-21%' }
                    : {
                        fontSize: "1.4vw",
                        color: "black",
                        marginTop: "-4%",
                      }
                }
              >
                <CustomLoader />
                {/* Extracting questions..... Please Wait */}
              </div>
            )}
            {Boolean(uploadedData.length !== 0) ? (
              <div className="allTestHeader" style={{ borderRadius: "1vw" }}>
                Extracted MCQ
              </div>
            ) : (
              uploader === 2 && (
                <div
                  style={
                    isMobile
                      ? {}
                      : {
                          fontSize: "1.4vw",
                          color: "red",
                          border: "1.2px solid red",
                          borderRadius: ".5vw",
                          padding: "1%",
                        }
                  }
                >
                  Could not find any data in the pdf. This may be due to
                  incorrect format of the questions in the pdf. Please try again
                  with a prescribed format.
                </div>
              )
            )}

            {uploadedData[0] &&
              uploadedData?.map((q, index) => {
                return (
                  <>
                    <div
                      className="questionContainerForResult"
                      key={index}
                      style={{ borderRadius: "2vw" }}
                    >
                      <div className="mainQuestionContainer">
                        <div className="questionImageontainer">
                          {Boolean(q.diagram) ? (
                            <>
                              <img
                                src={q.diagram}
                                alt="question img"
                                className="questionImage"
                              />
                              <FilePicker
                                htmlFor={`imageChange_${index}`}
                                isLableVisible={false}
                                isSubmitBtnVisible={false}
                                selectedFile={""}
                                onChange={(ev) => {
                                  handleUploadImage(ev, index);
                                }}
                                lableInfo={"CHANGE IMAGE"}
                                accept=".png, .jpeg, .jpg"
                                lableStyle={{
                                  width: "40%",
                                  height: "5vh",
                                  marginBottom: "2%",
                                }}
                              />
                            </>
                          ) : (
                            <FilePicker
                              htmlFor={`imageInput_${index}`}
                              isLableVisible={false}
                              isSubmitBtnVisible={false}
                              selectedFile={""}
                              onChange={(ev) => {
                                handleUploadImage(ev, index);
                              }}
                              lableInfo={"UPLOAD QUESTION IMAGE HERE"}
                              accept=".png, .jpeg, .jpg"
                              lableStyle={{
                                width: isMobile ? "99%" : "99%",
                                height: isMobile ? "7vh" : "13vh",
                                marginBottom: "2%",
                              }}
                            />
                          )}
                        </div>
                        <div
                          className="question"
                          style={{
                            justifyContent: "left",
                            alignItems: "left",
                            textAlign: "left",
                          }}
                          contentEditable
                          onInput={(ev) => handleMcqEdit(ev, index)}
                        >
                          <div>
                            <span style={{ fontWeight: "bolder" }}>
                              {index + 1}.
                            </span>{" "}
                            {q.question}
                          </div>
                        </div>

                        <div className="optionsContainer">
                          {q.options.length > 0 ||
                          (q.options[0] === "" &&
                            q.options[1] === "" &&
                            q.options[2] === "" &&
                            q.options[3] === "") ? (
                            q.options.map((option, optIndex) => {
                              return (
                                <div className="option" key={optIndex}>
                                  <span className="optionNo">
                                    {optIndex === 0
                                      ? "A"
                                      : optIndex === 1
                                      ? "B"
                                      : optIndex === 2
                                      ? "C"
                                      : "D"}
                                  </span>
                                  <div
                                    contentEditable
                                    onInput={(ev) =>
                                      handleOptionEdit(ev, index, optIndex)
                                    }
                                  >
                                    {option?.split(".")[1]
                                      ? option?.split(".")[1]
                                      : option}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <>
                              <input
                                placeholder="Your answer"
                                value={""}
                                onChange={(ev) => {}}
                              />
                            </>
                          )}
                        </div>
                        <div
                          style={{
                            justifyContent: "left",
                            alignItems: "left",
                            textAlign: "left",
                          }}
                        >
                          <span style={{ fontWeight: "bolder" }}>Answer :</span>{" "}
                          <span
                            contentEditable
                            onInput={(ev) => handleAnswerEdit(ev, index)}
                          >
                            {q.answer}
                          </span>
                        </div>
                        <div
                          style={{
                            justifyContent: "left",
                            alignItems: "left",
                            textAlign: "left",
                          }}
                        >
                          <span style={{ fontWeight: "bolder" }}>
                            Explanation/Question Type :
                          </span>{" "}
                          <span
                            contentEditable
                            onInput={(ev) => handleExplanationEdit(ev, index)}
                          >
                            {q.explanation}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadTests;

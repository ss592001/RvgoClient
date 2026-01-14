import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./UploadTests.css";
import CustomInput from "../../CustomComponents/CustomInput/CustomInput";
import CustomButton from "../../CustomComponents/CustomButton/CustomButton";
import CustomLoader from "../../CustomComponents/CustomLoader/CustomLoader";
import { PostRoute } from "../../Custom_hooks/Routes";
import { SubmitTestConfirmation } from "../../CustomComponents/CustomTestPlatform/CustomTestPlatform";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import Tesseract from "tesseract.js";
import { useLocation } from "react-router";
import { url } from "../../Custom_hooks/Routes";
import { toast } from "react-toastify";
import { useMediaQuery } from "../../Custom_hooks/Custom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestionDb } from "Components/Redux/Store";
import CustomRadio from "Components/CustomComponents/CustomButton/CustomRadio";
import Swal from "sweetalert2";
import { findAllByDisplayValue } from "@testing-library/react";
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
  imageLink,
  imageStyle,
  iconVisibleWhenImageUploaded,
}) => {
  return (
    <div style={{ marginTop: "0%", width: "auto" }}>
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
      <div
        className="fileInputBox"
        style={{ ...lableStyle, ...containerStyle }}
      >
        <label id="fileLabel" htmlFor={htmlFor}>
          {iconVisibleWhenImageUploaded !== false && (
            <>
              <div>
                <img src={imageLink} alt="uploadPdf" style={imageStyle} />
              </div>
            </>
          )}

          <div
            style={{
              display: isLableVisible ? "block" : "none",
              color: "rgb(42, 120, 255)",
            }}
          >
            {selectedFile ? selectedFile.name : lableInfo}
          </div>
        </label>
        <input
          type="file"
          id={htmlFor}
          name={htmlFor}
          className="fileinputfortraining"
          accept={accept}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

const UploadTests = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const questionsFromDb = location?.state?.questions
    ? location?.state?.questions
    : [];
  const isMobile = useMediaQuery("(max-width:430px)");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [marks, setMarks] = useState("");
  const [type, setType] = useState("Mock");
  const [subject, setSubject] = useState("Mock");
  const topicSelectorPAM = [
    {
      topic: "Exponent Rules",
      subTopic: ["Simplification of expressions using exponent rules"],
    },
    {
      topic: "Basic function questions",
      subTopic: [
        "Function graph intrepretation",
        "Comparrision of two functions",
        "Function evaluation at a given point",
      ],
    },
    {
      topic: "Radical equations",
      subTopic: ["Solving radical equations"],
    },
    {
      topic: "Polynomial",
      subTopic: [
        "Equivalent expression/simplification based questions",
        "Identifying functions using graphs(Factor theorem)",
      ],
    },
    {
      topic: "Exponential functions",
      subTopic: [
        "Solving exponential functions",
        "Identifying y-intercept of exponential functions",
        "Linear versus exponential functions(Distinguishing/Comparing)",
        "Compound interest problems",
        "Identifying exponential function of a graph",
        "Identifying exponential function for a word problem",
        "Interpreting y-intercept / rate of exponential function",
      ],
    },
    {
      topic: "Absolute value equations and inequalities",
      subTopic: [
        "Framing / solving of absolute value equation / inequalities",
        "Absolute value equations inequalities",
      ],
    },
    {
      topic: "Parabolas",
      subTopic: [
        "Identifying x/y intercept of a parabola",
        "Identifying x/y coordinate of vertex of parabola",
        "Converting one form to another for parabolas",
        "Word problems on parabolas",
        "Identification of equations using graphs",
      ],
    },
    {
      topic: "Quadratic equations",
      subTopic: [
        "Sum and Product of roots (cubic)",
        "Sum and Product of roots (quadratic)",
        "Solving system of one linear and one quadratic equation",
        "Solving quadratic equations",
        "Using discriminant of a quadratic equation(no. of x intercepts)",
        "Frame quadratic equation and solve",
        "Complex numbers",
      ],
    },
    {
      topic: "Transformations of graph",
      subTopic: [
        "Transformations of graph",
        "Transformation of linear equations",
        "Circles",
        "Exponential functions",
        "Rational functions",
        "Transformation of parabolas",
        "Function graphs",
      ],
    },
  ];
  const topicSelectorHOA = [
    {
      topic: "Linear equations in one or two variables",
      subTopic: [
        "Identifiaction of linear equations for word problems",
        "Interpreting slope/y-intercept of linear functions",
        "Identification for linear equation using graphs",
        "Finding linear function (using x,f(x))",
        "Conditions of solvability for slop intercept form",
        "Solving simultaneous linear equations in two variables",
        "Solving linear equation in one variable",
      ],
    },
    {
      topic: "Linear inequalities",
      subTopic: [
        "Solving linear inequality in one variable",
        "Solving linear inequality in two variable",
        "Absolute value functions (Equations/inequalities)",
      ],
    },
  ];
  const topicSelectorPSDA = [
    {
      topic: "Research studies",
      subTopic: [
        "Confidence interval / Margin of error based inference",
        "Cause and effect questions",
        "Generalisation questions",
      ],
    },
    {
      topic: "Statistics",
      subTopic: [
        "Two way probablity table",
        "Effects on numerical values(outliers / removal of values)",
        "Table based data interpretation",
        "Graph based data interpretation",
        "Scatterplot based questions(including line of best fit)",
        "Data based calculation questions(mean/median.sd etc.)",
      ],
    },
    {
      topic: "Ratios, Rates, Percentages",
      subTopic: [
        "Questions on time , distance and speed",
        "Percentage based",
        "Unit change questions (other than areas and volumes)",
        "Area / volume based questions on ratios/ unit charge",
        "Calculating multipliers for percentage increase and decrease",
      ],
    },
  ];
  const topicSelectorGeometry = [
    {
      topic: "Lines and angles",
      subTopic: ["Basic properties"],
    },
    {
      topic: "Area and volumes",
      subTopic: ["Calculating area/volumes/dimensions of geometric figures"],
    },
    {
      topic: "Triangles",
      subTopic: [
        "Properties of triangles",
        "Trignometry",
        "Special triangles",
        "Similarity in triangels",
      ],
    },
    {
      topic: "Circles",
      subTopic: [
        "Arc length/area of sector calculations",
        "Circle properties (Angles/chords)",
        "Translations on circles",
        "Circle equations(identification/solving)",
        "Unit circle/circle trignometry",
      ],
    },
    {
      topic: "Polygons",
      subTopic: ["Angle sum properties", "length and area"],
    },
  ];
  const englishSelector = [
    {
      topic: "Form, Structure & Sense",
      subTopic: [
        "Verb Agreement and Forms Sheet",
        "Modifiers",
        "Parallelism & Faulty Comparisons",
        "Pronoun Antecedent ",
        "Plurals & Possessives",
      ],
    },
    {
      topic: "Boundaries",
      subTopic: ["Linking clauses", "Punctuation", "Supplements"],
    },
    {
      topic: "Transitions",
      subTopic: ["Transitions", "Logical Transitions Simulation"],
    },
    {
      topic: "Rhetorical Synthesis",
      subTopic: ["RS (SS)"],
    },
    {
      topic: "Infographics",
      subTopic: ["COE Sheet"],
    },
    {
      topic: "Craft and Structure",
      subTopic: [
        "Words In Context",
        "Structure and Function",
        "Cross-Text Questions",
      ],
    },
    {
      topic: "Information and Ideas",
      subTopic: [
        "Main Idea and Central Details",
        "Comman of Evidence - Textual",
        "Illustrating Claims",
        "Logical Text Completion, Inference & Fact Based",
        "Poetry Based",
      ],
    },
  ];
  const allList = [
    ...topicSelectorPAM,
    ...topicSelectorHOA,
    ...topicSelectorPSDA,
    ...topicSelectorGeometry,
    ...englishSelector,
  ];
  const questionsDb = useSelector((state) => state.user.currentQuestionDb);

  const [uploadedData, setUploadedData] = useState([
    ...(questionsDb ?? []),
    ...(questionsFromDb ?? []),
  ]);
  const [loader, setLoader] = useState(false);
  const [isSubmiting, setisSubmiting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImagePdf, setSelectedImagePdf] = useState(null);
  const [error, setError] = useState("");
  const [subtopicList, setSubtopicList] = useState([]);
  const [uploader, setUploader] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFLT, setIsFLT] = useState(false);
  const [isFLTMaths, setIsFLTMaths] = useState(false);
  const [isFLTEnglish, setIsFLTEnglish] = useState(false);
  const [sectional, setIsSectional] = useState(0);
  const handleUploadImagePdf = (ev) => {
    setUploader(1);
    const file = ev.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    setSelectedImagePdf(file);
    try {
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
            // let temparray=[];
            // temparray=[...uploadedData,]
            // dispatch(setCurrentQuestionDb((prev) => [...prev, ...data]));
            setUploadedData((prev) => [...prev, ...data]);
            if (!data[0]) {
              setUploader(2);
            } else {
              setUploader(0);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    } catch (error) {
      return toast.error("Opps something went wrong. Please try again.");
    }
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
  // useEffect(() => {
  //   setUploadedData((prev) => [...prev, ...questionsFromDb]);
  // });

  // const addQuestion = (newQuestion) => {
  //   setQuestions((prev) => [...prev, newQuestion]);
  // };
  // useEffect(() => {
  //     setUploadedData((prevItems) => [...prevItems, ...questionsFromDb]);
  // }, [questionsFromDb]);

  // useEffect(() => {
  //   if (window.MathJax && window.MathJax.typesetPromise) {
  //     window.MathJax.typesetPromise();
  //   }
  // }, [uploadedData]);
 
  const handleUploadQAPdf = (ev) => {
    setUploader(1);
    const file = ev.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    setSelectedFile(file);
    try {
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
            console.log(data);
            // dispatch(setCurrentQuestionDb((prev) => [...prev, ...data]));
            // setUploadedData(questionsDb);
            setUploadedData((prev) => [...prev, ...data]);
            if (!data[0]) {
              setUploader(2);
            } else {
              setUploader(0);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    } catch (error) {
      return toast.error("Opps something went wrong. Please try again.");
    }
  };

  // const handleUploadImage = (ev, index) => {
  //   console.log("index", index);
  //   const file = ev.target.files[0];
  //   const formdata = new FormData();
  //   formdata.append("file", file);
  //   fetch(`${url}/uploadImages`, {
  //     method: "POST",
  //     body: formdata,
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         console.log(error);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       handleUpdateQuestion(data, index);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const handleDeleteQuestion = (index) => {
    setUploadedData((prevData) => {
      let updatedData = [...prevData];
      updatedData = updatedData.filter((_, i) => i !== index);
      dispatch(setCurrentQuestionDb(updatedData));
      return updatedData;
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
    console.log({
      name: name,
      description: description,
      type: subject,
      totalMarks: marks,
      testTime: duration,
      uploadedAt: new Date(),
      Test: uploadedData,
      sectional: sectional,
      Flt: isFLT === "FLT" ? true : false,
    });
    if (isFLT && uploadedData.length !== 98) {
      return Swal.fire({
        title: "Wrong FLT Format",
        text: "FLT test can only have exactly 98 questions. These questions will be automatically splited into 4 modules (2 english - 27 questions each and 2 maths - 22 questions each.). So please enter correct number of questions.",
        icon: "error",
        timer: 20000,
      });
    }
    if (sectional === 2 && uploadedData.length !== 54) {
      return Swal.fire({
        title: "Wrong FLT Format",
        text: "English FLT test can only have exactly 54 questions. These questions will be automatically splited into 2 modules ( 27 questions each.). So please enter correct number of questions.",
        icon: "error",
        timer: 20000,
      });
    }
    if (sectional === 1 && uploadedData.length !== 44) {
      return Swal.fire({
        title: "Wrong FLT Format",
        text: "Maths FLT test can only have exactly 44 questions. These questions will be automatically splited into 2 modules (22 questions each). So please enter correct number of questions.",
        icon: "error",
        timer: 20000,
      });
    }
    const bodyData = {
      name: name,
      description: description,
      type: subject,
      totalMarks: marks,
      testTime: duration,
      uploadedAt: new Date(),
      Test: uploadedData,
      Flt: isFLT === "FLT" ? true : false,
      sectional: sectional,
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
            dispatch(setCurrentQuestionDb([]));
            setLoader(false);
            Swal.fire({
              title:
                "Test uploaded successfully. You can now view this test in the tests section.",
              icon: "success",
              timer: 3000,
            });
          } else if (res.status === 201) {
            toast.error("Something went wrong . Please try again.");
            setError("Something went wrong . Please try again.");
          }
        },
        bodyData
      );
    } else {
      Swal.fire({
        title: "All fields are required",
        icon: "error",
        timer: 3000,
      });
      // toast.error("Missing Fileds. All Fields are Required.");
      // setisSubmiting(true);
    }
  };

  const handleMcqEdit = (ev, idx) => {
    setUploadedData((prevData) => {
      const updatedData = [...prevData];
      const updatedQuestion = { ...updatedData[idx] };
      updatedQuestion.question = ev.target.value;
      updatedData[idx] = updatedQuestion;

      return updatedData;
    });
  };
  const handlePassageEdit = (ev, idx) => {
    setUploadedData((prevData) => {
      const updatedData = [...prevData];
      const updatedQuestion = { ...updatedData[idx] };
      updatedQuestion.passage = ev.target.value;
      updatedData[idx] = updatedQuestion;

      return updatedData;
    });
  };
  const handleExplanationEdit = (ev, idx) => {
    setUploadedData((prevData) => {
      const updatedData = [...prevData];
      const updatedQuestion = { ...updatedData[idx] };
      updatedQuestion.explanation = ev.target.value;
      updatedData[idx] = updatedQuestion;

      return updatedData;
    });
  };

  const updateTopic = (ev, idx) => {
    const subTopics = allList.filter((list, index) => list.topic === ev);
    console.log("....", subTopics[0]);
    setSubtopicList(subTopics[0].subTopic);
    setUploadedData((prevData) => {
      const updatedData = [...prevData];
      const updatedQuestion = { ...updatedData[idx] };
      updatedQuestion.topic = ev;
      updatedData[idx] = updatedQuestion;

      return updatedData;
    });
  };
  const updateSubTopic = (ev, idx) => {
    setUploadedData((prevData) => {
      const updatedData = [...prevData];
      const updatedQuestion = { ...updatedData[idx] };
      updatedQuestion.subTopic = ev;
      updatedData[idx] = updatedQuestion;

      return updatedData;
    });
  };
  const handleAnswerEdit = (ev, idx) => {
    setUploadedData((prevData) => {
      const updatedData = [...prevData];
      const updatedQuestion = { ...updatedData[idx] };
      updatedQuestion.answer = ev.target.value;
      updatedData[idx] = updatedQuestion;

      return updatedData;
    });
  };

  const updateOption = (ev, index, questionType) => {
    const newValue = ev.target.value;
    setUploadedData((prev) => {
      const newOptions = [...prev.options];
      if (questionType === "objective") {
        const label = newOptions[index].split(".")[0] + ".";
        newOptions[index] = `${label} ${newValue}`;
      } else {
        newOptions[index] = newValue;
      }
      return {
        ...prev,
        options: newOptions,
      };
    });
  };

  // const handleOptionEdit = (ev, qIndex, optionIndex, questionType) => {
  //   const newValue = ev.target.value;
  //   setUploadedData((prevData) => {
  //     const updatedData = [...prevData];
  //     const updatedQuestion = { ...updatedData[qIndex] };
  //     if (questionType === "objective") {
  //       updatedQuestion.options = updatedQuestion.options.map((option, i) => {
  //         return i === optionIndex ? ev.target.value : option;
  //       });
  //     } else {
  //       updatedQuestion.options = updatedQuestion.options.map((option, i) =>
  //         i === optionIndex ? ev.target.value : option
  //       );
  //     }

  //     updatedData[qIndex] = updatedQuestion;
  //     return updatedData;
  //   });
  // };

  const handleOptionEdit = (ev, questionIndex, optionIndex, questionType) => {
    const newValue = ev.target.value;
    setUploadedData((prevQuestions) => {
      return prevQuestions.map((question, qIdx) => {
        if (qIdx !== questionIndex) return question;
        const updatedOptions = question.options.map((opt, oIdx) => {
          if (oIdx !== optionIndex) return opt;

          const match = opt.match(/^([A-D]\.\s*)(.*)$/);
          const prefix = match ? match[1] : "";
          if (newValue.includes(`${opt.split(".")[0]}.`)) {
            return newValue.trim();
          } else {
            return prefix + newValue.trim();
          }
        });

        return {
          ...question,
          options: updatedOptions,
        };
      });
    });
  };
  console.log(uploadedData);
  const [tag, setTag] = useState("");

  const handleKeyDown = (e, quesIndex) => {
    if (e.key !== "Enter") {
      return;
    }
    if (tag.length === 0) {
      return toast.error("Tag field empty . Please enter a tag name to add.");
    }
    const question = uploadedData[quesIndex];
    question.tags = [...question.tags, tag];
    setTag("");
  };

  const deleteTag = (qIndex, tagIndex) => {
    setUploadedData((prevData) => {
      const updatedData = [...prevData];
      const updatedQuestion = { ...updatedData[qIndex] };
      updatedQuestion.tags = updatedQuestion.tags.filter(
        (_, i) => i !== tagIndex
      );
      updatedData[qIndex] = updatedQuestion;
      return updatedData;
    });
  };

  const updateDifficultyLevel = (val, idx) => {
    setUploadedData((prevData) => {
      const updatedData = [...prevData];
      const updatedQuestion = { ...updatedData[idx] };
      updatedQuestion.difficulty = val;
      updatedData[idx] = updatedQuestion;

      return updatedData;
    });
  };
  const updateQuestionType = (val, idx) => {
    setUploadedData((prevData) => {
      const updatedData = [...prevData];
      const updatedQuestion = { ...updatedData[idx] };
      updatedQuestion.type = val;
      updatedData[idx] = updatedQuestion;

      return updatedData;
    });
  };
  const selectQuestionFromDb = () => {
    dispatch(setCurrentQuestionDb(uploadedData));
    navigate("/admin/access/questions/database", {
      state: {
        filter: "selection",
      },
    });
  };

  const handleCreateNewQuestion = () => {
    setUploadedData([
      ...uploadedData,
      {
        id: Math.random(),
        title: "Test Question",
        tags: ["quadratic", "radical", "geometry"],
        passage: `Enter question passage here`,
        question: "Enter question here",
        options: ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
        answer: "B",
        explanation: "Enter your explanation here",
        diagram: "",
        type: "objective",
        difficulty: "easy",
      },
    ]);
  };

  const splitToModules = (index) => {
    if (index === 1) {
      return (
        <div
          style={
            isMobile
              ? {}
              : {
                  fontSize: "1.5vw",
                  padding: "1%",
                  backgroundColor: "black",
                  borderRadius: "1vw",
                  marginTop: "2%",
                  color: "white",
                }
          }
        >
          Module 1 English
        </div>
      );
    }
    if (index === 28) {
      return (
        <div
          style={
            isMobile
              ? {}
              : {
                  fontSize: "1.5vw",
                  padding: "1%",
                  backgroundColor: "black",
                  borderRadius: "1vw",
                  marginTop: "2%",
                  color: "white",
                }
          }
        >
          Module 2 English
        </div>
      );
    }
    if (index === 55) {
      return (
        <div
          style={
            isMobile
              ? {}
              : {
                  fontSize: "1.5vw",
                  padding: "1%",
                  backgroundColor: "black",
                  borderRadius: "1vw",
                  marginTop: "2%",
                  color: "white",
                }
          }
        >
          Module 1 Maths
        </div>
      );
    }
    if (index === 77) {
      return (
        <div
          style={
            isMobile
              ? {}
              : {
                  fontSize: "1.5vw",
                  padding: "1%",
                  backgroundColor: "black",
                  borderRadius: "1vw",
                  marginTop: "2%",
                  color: "white",
                }
          }
        >
          Module 2 Maths
        </div>
      );
    }
  };
  const splitToModulesSectional = (index, type) => {
    if (type === 1) {
      if (index === 1) {
        return (
          <div
            style={
              isMobile
                ? {}
                : {
                    fontSize: "1.5vw",
                    padding: "1%",
                    backgroundColor: "black",
                    borderRadius: "1vw",
                    marginTop: "2%",
                    color: "white",
                  }
            }
          >
            Module 1 Maths
          </div>
        );
      }
      if (index === 23) {
        return (
          <div
            style={
              isMobile
                ? {}
                : {
                    fontSize: "1.5vw",
                    padding: "1%",
                    backgroundColor: "black",
                    borderRadius: "1vw",
                    marginTop: "2%",
                    color: "white",
                  }
            }
          >
            Module 2 Maths
          </div>
        );
      }
    } else {
      if (index === 1) {
        return (
          <div
            style={
              isMobile
                ? {}
                : {
                    fontSize: "1.5vw",
                    padding: "1%",
                    backgroundColor: "black",
                    borderRadius: "1vw",
                    marginTop: "2%",
                    color: "white",
                  }
            }
          >
            Module 1 English
          </div>
        );
      }
      if (index === 28) {
        return (
          <div
            style={
              isMobile
                ? {}
                : {
                    fontSize: "1.5vw",
                    padding: "1%",
                    backgroundColor: "black",
                    borderRadius: "1vw",
                    marginTop: "2%",
                    color: "white",
                  }
            }
          >
            Module 2 English
          </div>
        );
      }
    }
  };

  useEffect(() => {
    if (data) {
      console.log("editable test", data);
      setUploadedData(data.Test);
      setName(data.name);
      setDescription(data.description);
      setDuration(data.testTime);
      setMarks(data.totalMarks);
      setIsFLT(data.Flt ? "FLT" : false);
      setIsSectional(data.sectional);
      if (data.type === "English Reading Practice") {
        setType("Practice");
        setSubject("English Reading Practice");
      } else if (data.type === "English Writing Practice") {
        setType("Practice");
        setSubject("English Writing Practice");
      } else if (data.type === "Maths Practice") {
        setType("Practice");
        setSubject("Maths Practice");
      } else if (data.type === "Miscellaneous Practice") {
        setType("Practice");
        setSubject("Miscellaneous Practice");
      } else if (data.type === "Mock") {
        setType("Mock");
      } else {
        setType("diagnostic");
      }
    }
  }, [data]);

  const handleSaveEditedTest = () => {
    console.log({
      name: name,
      description: description,
      type: subject,
      totalMarks: marks,
      testTime: duration,
      uploadedAt: new Date(),
      Test: uploadedData,
      sectional: sectional,
      Flt: isFLT === "FLT" ? true : false,
      id: data.id,
    });
    if (isFLT && uploadedData.length !== 98) {
      return Swal.fire({
        title: "Wrong FLT Format",
        text: "FLT test can only have exactly 98 questions. These questions will be automatically splited into 4 modules (2 english - 27 questions each and 2 maths - 22 questions each.). So please enter correct number of questions.",
        icon: "error",
        timer: 20000,
      });
    }
    if (sectional === 2 && uploadedData.length !== 54) {
      return Swal.fire({
        title: "Wrong FLT Format",
        text: "English FLT test can only have exactly 54 questions. These questions will be automatically splited into 2 modules ( 27 questions each.). So please enter correct number of questions.",
        icon: "error",
        timer: 20000,
      });
    }
    if (sectional === 1 && uploadedData.length !== 44) {
      return Swal.fire({
        title: "Wrong FLT Format",
        text: "Maths FLT test can only have exactly 44 questions. These questions will be automatically splited into 2 modules (22 questions each). So please enter correct number of questions.",
        icon: "error",
        timer: 20000,
      });
    }
    const bodyData = {
      name: name,
      description: description,
      type: subject,
      totalMarks: marks,
      testTime: duration,
      uploadedAt: new Date(),
      Test: uploadedData,
      Flt: isFLT === "FLT" ? true : false,
      sectional: sectional,
      _id: data._id,
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
        "saveEditedTest",
        () => {
          setLoader(true);
        },
        (res) => {
          console.log(res);
          if (res.status === 200) {
            dispatch(setCurrentQuestionDb([]));
            setLoader(false);
            Swal.fire({
              title:
                "Test Updated successfully. You can now view this test in the tests section.",
              icon: "success",
              timer: 3000,
            });
          } else if (res.status === 201) {
            toast.error("Something went wrong . Please try again.");
            setError("Something went wrong . Please try again.");
          }
        },
        bodyData
      );
    } else {
      Swal.fire({
        title: "All fields are required",
        icon: "error",
        timer: 3000,
      });
      // toast.error("Missing Fileds. All Fields are Required.");
      // setisSubmiting(true);
    }
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
          {data ? (
            <div
              className="uploaderContainer"
              style={{
                color: "blue",
                fontSize: !isMobile ? "2vw" : "4vw",
                marginTop: isMobile ? "16%" : "",
              }}
            >
              Only Question Editing Allowed
            </div>
          ) : (
            <>
              <div className="uploaderContainer">
                <div title="Upload text pdf here">
                  <FilePicker
                    // lable={'CHOOSE PDF TYPE FOR MCQ *'}
                    htmlFor={"fileInput"}
                    isLableVisible={false}
                    isSubmitBtnVisible={false}
                    selectedFile={selectedFile}
                    onChange={handleUploadQAPdf}
                    lableInfo={"UPLOAD TEXT PDF HERE"}
                    accept=".pdf"
                    imageStyle={
                      !isMobile
                        ? { height: "3vw", width: "3vw", cursor: "pointer" }
                        : { height: "10vw", width: "10vw", cursor: "pointer" }
                    }
                    imageLink={
                      "https://img.icons8.com/sf-black-filled/64/4D4D4D/upload.png"
                    }
                  />
                </div>
                <div title="Upload image pdf here">
                  <FilePicker
                    htmlFor={"fileInput2"}
                    isLableVisible={false}
                    isSubmitBtnVisible={false}
                    selectedFile={selectedImagePdf}
                    onChange={handleUploadImagePdf}
                    lableInfo={"UPLOAD IMAGE PDF HERE"}
                    accept=".pdf"
                    // lableStyle={{
                    //   fontSize: "1.4vw",
                    //   backgroundColor: "white",
                    //   color: "white",
                    //   borderRadius: "1vw",
                    //   boxShadow: "2px 2px 10px -2px black",
                    // }}
                    imageStyle={
                      !isMobile
                        ? { height: "3vw", width: "3vw", cursor: "pointer" }
                        : { height: "9vw", width: "9vw", cursor: "pointer" }
                    }
                    imageLink={
                      "https://img.icons8.com/sf-black-filled/64/4D4D4D/add-image.png"
                    }
                  />
                </div>
                <div
                  onClick={selectQuestionFromDb}
                  title="Select question from database"
                >
                  <img
                    style={
                      !isMobile
                        ? { height: "3vw", width: "3vw", cursor: "pointer" }
                        : { height: "9vw", width: "9vw", cursor: "pointer" }
                    }
                    src="https://img.icons8.com/ios-filled/50/4D4D4D/cloud-database.png"
                    alt="dbIcon"
                  />
                </div>
                <div
                  className="addDummyQuestion"
                  onClick={handleCreateNewQuestion}
                  title="Add new question"
                >
                  <img
                    style={
                      !isMobile
                        ? { height: "3vw", width: "3vw", cursor: "pointer" }
                        : { height: "9vw", width: "9vw", cursor: "pointer" }
                    }
                    width="50"
                    height="50"
                    src="https://img.icons8.com/sf-black-filled/64/4D4D4D/add-property.png"
                    alt="add-folder--v1"
                  />
                </div>
              </div>
            </>
          )}
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
                text={!data ? "Upload Test" : "Update"}
                style={{
                  width: isMobile ? "30%" : "15%",
                  height: isMobile ? "3.5vh" : "",
                  position: "fixed",
                  right: "2%",
                  marginTop: isMobile ? "-4%" : "0%",
                  marginLeft: "2%",
                  backgroundColor: "#333F6B",
                }}
                handleClick={() => {
                  if (data) {
                    handleSaveEditedTest();
                  } else {
                    handleSaveTest();
                  }
                }}
              />
            )}
          </div>
        </div>

        <div
          className="allTestsContainer"
          style={{
            height: "86vh",
            padding: "2%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ cursor: data ? "not-allowed" : "" }}>
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
                pointerEvents: data ? "none" : "",
                // opacity: data ? "0.3" : "",
              }}
              labelStyle={{
                marginTop: "3%",
                pointerEvents: data ? "none" : "",
                // opacity: data ? "0.3" : "",
              }}
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
                pointerEvents: data ? "none" : "",
                // opacity: data ? "0.3" : "",
              }}
              labelStyle={{
                pointerEvents: data ? "none" : "",
                // opacity: data ? "0.3" : "",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "2%",
              cursor: data ? "not-allowed" : "",
            }}
          >
            <div
              className="testMoreInfoContainer"
              style={{
                pointerEvents: data ? "none" : "",
              }}
            >
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
            <div
              title={data ? "Function not editable" : ""}
              className="testMoreInfoContainer"
              style={
                data
                  ? {
                      pointerEvents: "none",
                      // opacity: "0.3",
                    }
                  : {}
              }
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "1%",
                  borderRadius: !isMobile ? ".4vw" : "1.5vw",
                  boxShadow: "2px 2px 10px -5px gray",
                }}
              >
                <div
                  onClick={() => {
                    if (isFLT !== "FLT")
                      Swal.fire({
                        title: "Necessary Information",
                        text: "FLT test will have exactly 98 questions . These questions will be splited into 4 modules as - English Module 1 (27 questions - 32 minutes) ,English Module 2 (27 questions - 32 minutes),Maths Module 1 (22 questions - 35 minutes) and Maths Module 2 (22 questions - 35 minutes). ",
                        icon: "info",
                        timer: 40000,
                      });

                    setIsSectional(0);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <CustomRadio
                    label={"Convert test to FLT (98 questions)"}
                    setType={setIsFLT}
                    setter={"FLT"}
                    // setter={isFLT}
                    type={isFLT}
                  />
                </div>
                <div
                  onClick={() => {
                    if (sectional !== 1)
                      Swal.fire({
                        title: "Necessary Information",
                        text: "Maths FLT test will have exactly 44 questions . These questions will be splited into 2 modules as - Maths Module 1 (22 questions - 35 minutes) and Maths Module 2 (22 questions - 35 minutes). ",
                        icon: "info",
                        timer: 40000,
                      });
                    setIsFLT(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <CustomRadio
                    label={"Convert test to Maths FLT"}
                    setType={setIsSectional}
                    setter={1}
                    // setter={isFLT}
                    type={sectional}
                  />
                </div>
                <div
                  onClick={() => {
                    if (sectional !== 2)
                      Swal.fire({
                        title: "Necessary Information",
                        text: "English FLT test will have exactly 54 questions . These questions will be splited into 2 modules as - English Module 1 (27 questions - 32 minutes) ,English Module 2 (27 questions - 32 minutes). ",
                        icon: "info",
                        timer: 40000,
                      });

                    setIsFLT(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <CustomRadio
                    label={"Convert test to English FLT"}
                    setType={setIsSectional}
                    setter={2}
                    // setter={isFLT}
                    type={sectional}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: isMobile ? "10%" : "5%",
                  overflow: "scroll",
                  scrollbarWidth: isMobile ? "thin" : "none",
                  scrollbarColor: "transparent",
                  marginBottom: isMobile ? "5%" : "0%",
                }}
              ></div>
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
                  scrollbarWidth: isMobile ? "thin" : "none",
                  scrollbarColor: "transparent",
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
                      false
                        ? { height: "6vw", width: "6vw" }
                        : {
                            height: !isMobile ? "1.5vw" : "6vw",
                            width: !isMobile ? "1.8vw" : "8vw",
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            backgroundColor:
                              type === "Practice" ? "#333F6B" : "#fff",
                            border:
                              type === "Practice"
                                ? "3px solid white"
                                : "0px solid white",

                            borderRadius: "6px",
                            marginRight: "8px",

                            transition: "background-color 0.2s ease",
                          }
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
                  <div style={{ fontSize: isMobile ? "3vw" : "" }}>
                    Practice
                  </div>
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
                      false
                        ? { height: "5vw", width: "5vw" }
                        : {
                            height: !isMobile ? "1.5vw" : "6vw",
                            width: !isMobile ? "1.8vw" : "7vw",
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            // width: "20px",
                            // height: "20px",
                            backgroundColor:
                              type === "Mock" ? "#333F6B" : "#fff",
                            border:
                              type === "Mock"
                                ? "3px solid white"
                                : "0px solid white",

                            borderRadius: "6px",
                            marginRight: "8px",
                            transition: "background-color 0.2s ease",
                          }
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
                  <div style={{ fontSize: isMobile ? "3vw" : "" }}>Mock</div>
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
                      false
                        ? { height: "6vw", width: "6vw" }
                        : {
                            height: !isMobile ? "1.5vw" : "6vw",
                            width: !isMobile ? "2vw" : "8.5vw",

                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",

                            backgroundColor:
                              type === "diagnostic" ? "#333F6B" : "#fff",
                            border:
                              type === "diagnostic"
                                ? "3px solid white"
                                : "0px solid white",

                            borderRadius: "6px",
                            marginRight: "8px",
                            transition: "background-color 0.2s ease",
                          }
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
                  <div style={{ fontSize: isMobile ? "3vw" : "" }}>
                    Diagnostic
                  </div>
                </div>
              </div>
              {type === "Practice" && (
                <>
                  <div
                    style={{
                      display: isMobile ? "block" : "flex",
                      gap: "0%",
                      borderTop: isMobile ? "1px solid white" : "",
                    }}
                  >
                    <div
                      style={{
                        width: isMobile ? "50%" : "80%",
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
                          false
                            ? { height: "3vw", width: "3vw" }
                            : {
                                height: !isMobile ? "1.5vw" : "5vw",
                                width: !isMobile ? "1.5vw" : "5vw",
                                appearance: "none",
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                                // width: "20px",
                                // height: "20px",
                                backgroundColor:
                                  subject === "English Reading Practice"
                                    ? "#333F6B"
                                    : "#fff",
                                border:
                                  subject === "English Reading Practice"
                                    ? "3px solid white"
                                    : "1px solid white",

                                borderRadius: "6px",
                                marginRight: "8px",
                                transition: "background-color 0.2s ease",
                              }
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
                      <div>Eng Reading</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5%",
                        margin: "2%",
                        marginLeft: 0,
                        width: isMobile ? "50%" : "80%",
                      }}
                    >
                      <input
                        type="radio"
                        name="testTypeSub"
                        style={
                          false
                            ? { height: "3vw", width: "3vw" }
                            : {
                                height: !isMobile ? "1.5vw" : "5vw",
                                width: !isMobile ? "1.5vw" : "5vw",
                                appearance: "none",
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                                backgroundColor:
                                  subject === "English Writing Practice"
                                    ? "#333F6B"
                                    : "#fff",
                                border:
                                  subject === "English Writing Practice"
                                    ? "3px solid white"
                                    : "1px solid white",

                                borderRadius: "6px",
                                marginRight: "8px",
                                transition: "background-color 0.2s ease",
                              }
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
                      <div>Eng Writing</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5%",
                        margin: "2%",
                        marginLeft: 0,
                        width: isMobile ? "50%" : "50%",
                      }}
                    >
                      <input
                        type="radio"
                        name="testTypeSub"
                        style={
                          false
                            ? { height: "3vw", width: "3vw" }
                            : {
                                height: !isMobile ? "1.5vw" : "5vw",
                                width: !isMobile ? "1.5vw" : "5vw",
                                appearance: "none",
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                                backgroundColor:
                                  subject === "Maths Practice"
                                    ? "#333F6B"
                                    : "#fff",
                                border:
                                  subject === "Maths Practice"
                                    ? "3px solid white"
                                    : "1px solid white",

                                borderRadius: "6px",
                                marginRight: "8px",
                                transition: "background-color 0.2s ease",
                              }
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

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5%",
                        margin: "2%",
                        marginLeft: 0,
                        width: isMobile ? "50%" : "50%",
                      }}
                    >
                      <input
                        type="radio"
                        name="testTypeSub"
                        style={
                          false
                            ? { height: "3vw", width: "3vw" }
                            : {
                                height: !isMobile ? "1.5vw" : "5vw",
                                width: !isMobile ? "1.5vw" : "5vw",
                                appearance: "none",
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                                backgroundColor:
                                  subject === "Miscellaneous Practice"
                                    ? "#333F6B"
                                    : "#fff",
                                border:
                                  subject === "Miscellaneous Practice"
                                    ? "3px solid white"
                                    : "1px solid white",

                                borderRadius: "6px",
                                marginRight: "8px",
                                transition: "background-color 0.2s ease",
                              }
                        }
                        checked={subject === "Miscellaneous Practice"}
                        onChange={() => {
                          setSubject("Miscellaneous Practice");
                        }}
                        onChangeCapture={() => {
                          setSubject("Miscellaneous Practice");
                        }}
                        value={"Miscellaneous Practice"}
                      />
                      <div>Misc</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div style={{ margin: "5%" }}>
            {uploader === 1 && (
              <>
                <div
                  style={
                    isMobile
                      ? { fontSize: "1.5vw", color: "black", marginLeft: "39%" }
                      : {
                          display: "block",
                          fontSize: "1.4vw",
                          color: "black",
                          marginTop: "-4%",
                          marginLeft: "46%",
                        }
                  }
                >
                  <div>
                    <CustomLoader />
                  </div>
                </div>
              </>
            )}
            {Boolean(uploadedData?.length !== 0) ? (
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
              uploadedData?.map((question, index) => {
                return (
                  <>
                    {isFLT && splitToModules(index + 1)}
                    {sectional !== 0 &&
                      splitToModulesSectional(index + 1, sectional)}

                    <div className="questionContainerForResult" key={index}>
                      <div className="questionIndex">
                        <div className="indexNo">{index + 1}.</div>
                        <div
                          className="deleteIcon"
                          onClick={() => {
                            handleDeleteQuestion(index);
                          }}
                        >
                          <img
                            width={"20"}
                            height={"20"}
                            src="https://img.icons8.com/ios-filled/50/FA5252/waste.png"
                            alt="waste"
                          />
                        </div>
                      </div>
                      <div className="questionDescriptor">
                        <div className="questionElementContainer">
                          <div className="imageContainer uploaderImage">
                            {question.diagram === "" ? (
                              <>
                                <div
                                  title="Upload question image"
                                  style={{ cursor: "pointer" }}
                                  // onClick={handleUploadImage}
                                >
                                  <FilePicker
                                    htmlFor={`imageChange_${index}`}
                                    isLableVisible={true}
                                    isSubmitBtnVisible={false}
                                    selectedFile={""}
                                    onChange={(ev) => {
                                      handleUploadImage(ev, index);
                                    }}
                                    lableInfo={""}
                                    imageStyle={
                                      !isMobile
                                        ? {
                                            height: "3vw",
                                            width: "3vw",
                                            cursor: "pointer",
                                          }
                                        : {
                                            height: "6vw",
                                            width: "6vw",
                                            cursor: "pointer",
                                          }
                                    }
                                    imageLink={
                                      "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/3535e0/external-upload-image-multimedia-tanah-basah-glyph-tanah-basah.png"
                                    }
                                    accept=".png, .jpeg, .jpg"
                                    lableStyle={{
                                      width: "100%",
                                      height: "auto",
                                      marginBottom: "2%",
                                    }}
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <div>
                                    <img
                                      src={question.diagram}
                                      alt="diagram"
                                      height={!isMobile ? "60%" : "80%"}
                                      width={!isMobile ? "60%" : "80%"}
                                      style={{
                                        marginLeft: !isMobile ? "23%" : "20%",
                                      }}
                                    />
                                  </div>
                                  <div title="Edit question image.">
                                    <FilePicker
                                      htmlFor={`imageChange_${index}`}
                                      isLableVisible={true}
                                      isSubmitBtnVisible={false}
                                      selectedFile={""}
                                      onChange={(ev) => {
                                        handleUploadImage(ev, index);
                                      }}
                                      lableInfo={""}
                                      imageStyle={
                                        !isMobile
                                          ? {
                                              height: "3vw",
                                              width: "3vw",
                                              cursor: "pointer",
                                            }
                                          : {
                                              height: "6vw",
                                              width: "6vw",
                                              cursor: "pointer",
                                            }
                                      }
                                      imageLink={
                                        "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/3535e0/external-upload-image-multimedia-tanah-basah-glyph-tanah-basah.png"
                                      }
                                      accept=".png, .jpeg, .jpg"
                                      lableStyle={{
                                        width: "100%",
                                        height: "auto",
                                        marginBottom: "2%",
                                      }}
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                          {question.passage && (
                            <>
                              <div className="extractedText textHead">
                                Passage
                              </div>
                              {true ? (
                                <textarea
                                  value={question.passage}
                                  className="editArea"
                                  onChange={(ev) =>
                                    handlePassageEdit(ev, index)
                                  }
                                />
                              ) : (
                                <>
                                  {/* <InlineMath math={latexInline} /> */}

                                  <div className="extractedText">
                                    {/* {parseLatexText(question.passage)} */}
                                    {/* <BlockMath math={question.passage} /> */}
                                    {question.passage}
                                  </div>
                                </>
                              )}
                            </>
                          )}
                          <div className="extractedText textHead">Question</div>

                          {true ? (
                            <textarea
                              value={question.question}
                              className="editArea"
                              onChange={(ev) => handleMcqEdit(ev, index)}
                            />
                          ) : (
                            <div className="extractedText">
                              {/* <BlockMath math={question.question} /> */}
                              {question.question}
                            </div>
                          )}
                          <div>
                            <div className="extractedText textHead"></div>
                            <select
                              value={question.topic}
                              onChange={(e) => updateTopic(e.target.value)}
                              className="selectInput"
                            >
                              <option value="option1">
                                Select question topic
                              </option>
                              {allList.map((t, index) => (
                                <option value={t.topic}>{t.topic}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <div className="extractedText textHead"></div>
                            <select
                              value={question.subTopic}
                              onChange={(e) =>
                                updateSubTopic(e.target.value, index)
                              }
                              className="selectInput"
                            >
                              <option value="option1">
                                Select question subtopic
                              </option>
                              {subtopicList.map((st, index) => (
                                <option value={st}>{st}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="questionElementContainer">
                          {question.options[0] && (
                            <div className="extractedText textHead">
                              Options
                            </div>
                          )}
                          {question.options[0] && (
                            <>
                              {question.options.map((option, i) => (
                                <div className="extractedText options">
                                  {i === 0
                                    ? "A."
                                    : i === 1
                                    ? "B."
                                    : i === 2
                                    ? "C."
                                    : "D."}
                                  &nbsp;
                                  <span>
                                    {true ? (
                                      <textarea
                                        value={option.replace(
                                          i === 0
                                            ? "A. "
                                            : i === 1
                                            ? "B. "
                                            : i === 2
                                            ? "C. "
                                            : "D. ",
                                          ""
                                        )}
                                        className="editArea optionEditArea"
                                        onChange={(ev) =>
                                          handleOptionEdit(
                                            ev,
                                            index,
                                            i,
                                            question.type
                                          )
                                        }
                                      />
                                    ) : (
                                      <span className="extractedText">
                                        {/* <BlockMath math={option.split(".")[1]} />{" "} */}
                                        {option.replace(
                                          index === 0
                                            ? "A. "
                                            : index === 1
                                            ? "B. "
                                            : index === 2
                                            ? "C. "
                                            : "D. ",
                                          ""
                                        )}
                                      </span>
                                    )}
                                  </span>
                                </div>
                              ))}
                            </>
                          )}
                          <div className="extractedText textHead">Answer</div>
                          <div className="extractedText">
                            {true ? (
                              <textarea
                                value={question.answer}
                                className="editArea optionEditArea"
                                onChange={(ev) => handleAnswerEdit(ev, index)}
                              />
                            ) : (
                              <div className="extractedText">
                                {question.answer}
                              </div>
                            )}
                          </div>
                          <div className="extractedText textHead">
                            Explanation
                          </div>
                          <div className="extractedText">
                            {true ? (
                              <textarea
                                value={question.explanation}
                                className="editArea"
                                onChange={(ev) =>
                                  handleExplanationEdit(ev, index)
                                }
                              />
                            ) : (
                              <div className="extractedText">
                                {/* <BlockMath math={question.explanation} /> */}
                                {question.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="extraElementsContainer">
                        <div className="questionElementContainer2">
                          <div>Tags</div>
                          <div className="tagsContainer">
                            {question?.tags?.map((tag, i) => (
                              <div key={i} className="tags">
                                &nbsp;
                                <span> {tag}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span
                                  style={{ color: "red", cursor: "pointer" }}
                                  onClick={() => {
                                    deleteTag(index, i);
                                  }}
                                >
                                  &times;
                                </span>
                                &nbsp;
                              </div>
                            ))}
                          </div>
                          <div className="questionDescriptor">
                            <CustomInput
                              lableStyle={{ display: "none" }}
                              label={""}
                              placeholder={
                                "Enter new tag name here and Press Enter"
                              }
                              Required={false}
                              value={tag}
                              inputStyle={
                                !isMobile
                                  ? {
                                      border: "1px solid rgb(156, 156, 156)",
                                      width: "100%",
                                    }
                                  : {
                                      border: "1px solid rgb(156, 156, 156)",
                                      width: "100%",
                                      height: "3vh",
                                    }
                              }
                              handleInputChange={(e) => {
                                setTag(e.target.value);
                              }}
                              onKeyDown={(e) => {
                                handleKeyDown(e, index);
                              }}
                            />
                          </div>
                          <div className="textHead">Question Type</div>
                          <div className="difficultyTypes">
                            <div className="checkBoxInput">
                              <div>
                                <input
                                  type="checkbox"
                                  name="type"
                                  id=""
                                  checked={question.type === "objective"}
                                  onChange={() =>
                                    updateQuestionType("objective", index)
                                  }
                                />
                              </div>
                              <div className="extractedText">Objective</div>
                            </div>
                            <div className="checkBoxInput">
                              <div>
                                <input
                                  type="checkbox"
                                  name="type"
                                  id=""
                                  checked={question.type === "subjective"}
                                  onChange={() =>
                                    updateQuestionType("subjective", index)
                                  }
                                />
                              </div>
                              <div className="extractedText">Subjective</div>
                            </div>
                          </div>
                        </div>
                        <div className="questionElementContainer2">
                          <div className="textHead">Difficulty Level</div>
                          <div className="difficultyTypes">
                            <div className="checkBoxInput">
                              <div>
                                <input
                                  type="checkbox"
                                  name="level"
                                  id=""
                                  checked={question.difficulty === "easy"}
                                  onChange={() =>
                                    updateDifficultyLevel("easy", index)
                                  }
                                />
                              </div>
                              <div className="extractedText">Easy</div>
                            </div>
                            <div className="checkBoxInput">
                              <div>
                                <input
                                  type="checkbox"
                                  name="level"
                                  id=""
                                  checked={question.difficulty === "moderate"}
                                  onChange={() =>
                                    updateDifficultyLevel("moderate", index)
                                  }
                                />
                              </div>
                              <div className="extractedText">Moderate</div>
                            </div>
                            <div className="checkBoxInput">
                              <div>
                                <input
                                  type="checkbox"
                                  name="level"
                                  id=""
                                  checked={question.difficulty === "hard"}
                                  onChange={() =>
                                    updateDifficultyLevel("hard", index)
                                  }
                                />
                              </div>
                              <div className="extractedText">Hard</div>
                            </div>
                          </div>
                          {/* <div
                            style={{
                              display: "flex",
                              gap: "4%",
                              marginTop: "10%",
                            }}
                          >
                            <CustomButton
                              text={"Save"}
                              // handleClick={handleSave}
                            />
                            <CustomButton
                              text={"Cancel"}
                              style={{ backgroundColor: "red" }}
                              // handleClick={handleCancelUpload}
                            />
                          </div> */}
                        </div>
                      </div>
                    </div>
                    {/* <div
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
                                className="questionImage demoImage"
                              />
                              <div title="Edit Question Image">
                                <FilePicker
                                  htmlFor={`imageChange_${index}`}
                                  isLableVisible={false}
                                  isSubmitBtnVisible={false}
                                  selectedFile={""}
                                  onChange={(ev) => {
                                    handleUploadImage(ev, index);
                                  }}
                                  lableInfo={
                                    <img
                                      width="48"
                                      height="48"
                                      src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/3232ff/external-upload-image-multimedia-tanah-basah-glyph-tanah-basah.png"
                                      alt="external-upload-image-multimedia-tanah-basah-glyph-tanah-basah"
                                    />
                                  }
                                  accept=".png, .jpeg, .jpg"
                                  lableStyle={{
                                    width: "15%",
                                    height: "7vh",
                                    marginBottom: "2%",
                                  }}
                                />
                              </div>
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
                        {q.passage !== "" && (
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
                                {index + 1}. Passage
                              </span>{" "}
                              <br />
                              {q.passage}
                            </div>
                          </div>
                        )}
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
                              {q.passage !== "" ? "Question" : `${index + 1}.`}
                              {q.passage !== "" ? <br /> : ""}
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
                                    style={{
                                      display: "flex",
                                      textAlign: "left",
                                      justifyContent: "left",
                                      alignItems: "left",
                                    }}
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
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.3vw" }}
                          >
                            Answer :
                          </span>{" "}
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
                          <span
                            style={{ fontWeight: "bold", fontSize: "1.3vw" }}
                          >
                            Explanation :
                          </span>{" "}
                          <span
                            contentEditable
                            onInput={(ev) => handleExplanationEdit(ev, index)}
                          >
                            {q.explanation}
                          </span>
                        </div>
                      </div>
                    </div> */}
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

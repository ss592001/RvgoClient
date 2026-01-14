import React from "react";
import { useState, useEffect, useRef } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import CustomModal from "Components/CustomComponents/CustomModal/CustomModal";
import CustomButton from "Components/CustomComponents/CustomButton/CustomButton";
import CustomInput from "Components/CustomComponents/CustomInput/CustomInput";

import "./QuestionDb.css";
import { FilePicker } from "./UploadTests";
import { toast } from "react-toastify";
import CustomLoader from "Components/CustomComponents/CustomLoader/CustomLoader";
import { BlockMath, InlineMath } from "react-katex";
import { useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentQuestionDb } from "../../Redux/Store";
import { GetRoute, PostRoute } from "Components/Custom_hooks/Routes";
import CustomDataLoader from "Components/CustomComponents/CustomDataLoader";
import ScreenCaptureWrapper from "./ScreenCapture";
import { url } from "Components/Custom_hooks/Routes";
import { useMediaQuery } from "Components/Custom_hooks/Custom";
import Swal from "sweetalert2";
import Snipper from "./Snipper";
const QuestionDatabase = () => {
  const isMobile = useMediaQuery("(max-width:430px)");
  const location = useLocation();
  const filter = location.state?.filter || null;
  const auth = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();
  const [showCard, setShowCard] = useState(null);
  const [popup, setpopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageAi, setSelectedImageAi] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [question, setQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [detectEditing, setDetectEditing] = useState(false);
  const screenCaptureRef = useRef();
  const [image, setImage] = useState();
  const [screenCapture, setScreenCapture] = useState("");
  const [quesFilter, setQuesFilter] = useState("");
  const [mainQuestionsArray, setMainQuestionsArray] = useState([]);
  const [subtopicList, setSubtopicList] = useState([]);
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
  const handleCapture = (dataUrl) => {
    setImage(dataUrl);
    setpopup(false);
    console.log(dataUrl);
    // handleCaptureClick();
    // handleExtractTextSnipping(dataUrl);
  };

  const handleClick = () => {
    if (screenCaptureRef.current) {
      screenCaptureRef.current.triggerCapture();
    }
  };

  console.log("question", question);
  useEffect(() => {
    if (window?.MathJax && window?.MathJax?.typesetPromise) {
      window?.MathJax?.typesetPromise();
    }
  }, [question, isEditing]);

  const headerStyle = {
    backgroundColor: "rgb(108, 108, 108)",
    color: "#fff",
    padding: "5px",
    textAlign: "left",
    border: "1px solid #ccc",
    fontSize: isMobile ? "2vw" : "1.2vw",
  };

  const cellStyle = {
    padding: "2px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontSize: isMobile ? "2vw" : "1.1vw",
  };

  useEffect(() => {
    GetRoute(
      `getAllQuestions/${auth.data._id}`,
      () => {
        setisLoading(true);
      },
      (data) => {
        setQuestions(data);
        setMainQuestionsArray(data);
        console.log(data);
        setisLoading(false);
      }
    );
  }, [filter]);

  const refresh = () => {
    GetRoute(
      `getAllQuestions/${auth.data._id}`,
      () => {
        setisLoading(true);
      },
      (data) => {
        setQuestions(data);
        setMainQuestionsArray(data);
        setQuesFilter("");
        console.log(data);
        setisLoading(false);
      }
    );
  };
  const fetchQuestions = () => {
    GetRoute(
      `getAllQuestions/${auth.data._id}`,
      () => {
        setisLoading(true);
      },
      (data) => {
        setQuestions(data);
        setMainQuestionsArray(data);
        console.log(data);
        setisLoading(false);
      }
    );
  };
  const handleUploadImage = (ev) => {
    const file = ev.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    setSelectedImageAi(null);
    console.log(ev.target.files[0]);
    setSelectedImage(file);
  };

  const handleUploadImageAi = (ev) => {
    const file = ev.target.files[0];
    const formdata = new FormData();
    formdata.append("file", file);
    setSelectedImage(null);
    setSelectedImageAi(file);
  };
  const handleExtractTextSnipping = (imageUrl) => {
    setpopup(true);
    setIsExtracting(true);
    try {
      const formdata = new FormData();
      formdata.append("base64Image", imageUrl);

      fetch(`${url}/extractSnippingText`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ base64Image: imageUrl }),
      })
        .then((response) => {
          if (!response.ok) {
            console.log("error");
          }
          setImage(null);
          setScreenCapture(null);
          return response.json();
        })
        .then((data) => {
          console.log("ai data", data.content);
          setQuestion(data);
          setIsExtracting(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      return toast.error("Opps something went wrong. Please try again.");
    }
  };
  const handleExtractText = () => {
    const route =
      selectedImage !== null ? "extractText" : "extractTextWithoutAi";
    try {
      const formdata = new FormData();
      if (selectedImage !== null) {
        formdata.append("file", selectedImage);
      } else {
        formdata.append("file", selectedImageAi);
      }
      setIsExtracting(true);
      fetch(`${url}/${route}`, {
        method: "POST",
        body: formdata,
      })
        .then((response) => {
          if (!response.ok) {
            console.log("error");
          }
          return response.json();
        })
        .then((data) => {
          console.log("ai data", data.content);
          // if (data.content[0]) {
          setQuestion(data);
          setIsExtracting(false);
          // } else {
          //   toast.error("Opps something went wrong. Please try again.");
          // }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      return toast.error("Opps something went wrong. Please try again.");
    }
  };

  const handleExtractTextWithoutAi = () => {
    try {
      const formdata = new FormData();
      formdata.append("file", selectedImageAi);
      setIsExtracting(true);

      fetch(`${url}/extractTextWithoutAi`, {
        method: "POST",
        body: formdata,
      })
        .then((response) => {
          if (!response.ok) {
            console.log("error");
          }
          return response.json();
        })
        .then((data) => {
          console.log("ai data", data.content);
          setQuestion(data);
          setIsExtracting(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      return toast.error("Opps something went wrong. Please try again.");
    }
  };
  const handleCancelUpload = () => {
    setQuestion(null);
    setSelectedImage(null);
    setSelectedImageAi(null);
    setIsExtracting(false);
    setpopup(false);
    setDetectEditing(false);
  };
  const handleSave = () => {
    const Ques = { adminId: auth.data._id, ...question };
    const route = isEditing && detectEditing ? "EditQuestion" : "saveQuestion";
    PostRoute(
      route,
      () => {
        setisLoading(true);
      },
      (data) => {
        fetchQuestions();
        setQuestions(data);
        setQuestion(null);
        setSelectedImage(null);
        setSelectedImageAi(null);
        setIsExtracting(false);
        setpopup(false);
        setisLoading(false);
        setDetectEditing(false);
      },
      Ques
    );
  };

  const [newTag, setNewTag] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      addTag(newTag.trim());
      setNewTag("");
    }
  };
  const addTag = (tag) => {
    setQuestion((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
  };

  const deleteTag = (index) => {
    setQuestion((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };
  const updateDifficultyLevel = (val) => {
    setQuestion((prev) => ({
      ...prev,
      difficulty: val,
    }));
  };
  const updateQuestionType = (val) => {
    setQuestion((prev) => ({
      ...prev,
      type: val,
    }));
  };
  const updateQuestion = (ev) => {
    setQuestion((prev) => ({
      ...prev,
      question: ev.target.value,
    }));
  };
  const updatePassage = (ev) => {
    setQuestion((prev) => ({
      ...prev,
      passage: ev.target.value,
    }));
  };
  const updateTitle = (ev) => {
    setQuestion((prev) => ({
      ...prev,
      title: ev.target.value,
    }));
  };

  const updateOption = (ev, index, questionType) => {
    const newValue = ev.target.value;
    setQuestion((prev) => {
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

  const updateAnswer = (ev) => {
    setQuestion((prev) => ({
      ...prev,
      answer: ev.target.value,
    }));
  };
  const updateTopic = (ev) => {
    const subTopics = allList.filter((list, index) => list.topic === ev);
    console.log("....", subTopics[0]);
    setSubtopicList(subTopics[0].subTopic);
    setQuestion((prev) => ({
      ...prev,
      topic: ev,
    }));
  };
  const updateSubTopic = (ev) => {
    setQuestion((prev) => ({
      ...prev,
      subTopic: ev,
    }));
  };
  const updateExplanation = (ev) => {
    setQuestion((prev) => ({
      ...prev,
      explanation: ev.target.value,
    }));
  };

  const handleSelectQuestion = (question, index) => {
    setSelectedQuestions((prevSelected) => {
      const alreadySelected = prevSelected.some((q) => q._id === question._id);

      if (alreadySelected) {
        // Remove it
        return prevSelected.filter((q) => q._id !== question._id);
      } else {
        // Add it
        return [...prevSelected, question];
      }
    });
  };
  console.log("selectedQ", selectedQuestions);
  const navigate = useNavigate();
  const uploadQuestions = () => {
    navigate("/admin/test/upload", {
      state: {
        questions: selectedQuestions,
      },
    });
  };

  const handleTerminateQuestion = (ques) => {
    const Ques = { adminId: auth.data._id, ...ques };
    const route = "terminateQuestion";
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        PostRoute(
          route,
          () => {
            setisLoading(true);
          },
          () => {
            fetchQuestions();
            setQuestion(null);
            setSelectedImage(null);
            setIsExtracting(false);
            setpopup(false);
            setisLoading(false);
            Swal.fire({
              title: "Deleted!",
              text: "Question has been deleted.",
              icon: "success",
            });
          },
          Ques
        );
      }
    });
  };

  const handleUploadQuestionImage = (ev, index) => {
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
          console.log(response);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return setQuestion((prev) => ({
          ...prev,
          diagram: `${url}/images/${data}`,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddManualQuestion = () => {
    setQuestion({
      id: Math.random(),
      adminId: "682a069dabdf121fa26d3e68",
      title: "Enter a title to this question.",
      tags: ["quadratic", "radical", "Maths"],
      passage: "Enter a passage for question if needed.",
      question: "Enter the question.",
      options: ["A. option1", "B. option2", "C. option3", "D. option4"],
      answer:
        "Enter the answer of the question i.e A,B,C,D in case of objective question and simple answer in case of subjective question.",
      explanation: "Enter a suitable explanation to the question",
      diagram: "",
      type: "objective",
      difficulty: "easy",
    });
  };
  const captureRef = useRef();

  const handleCaptureClick = () => {
    if (captureRef.current) {
      captureRef.current.startCapture();
    }
  };

  const handleFilter = (filter) => {
    setQuesFilter(filter);
    const filteredQuestions = mainQuestionsArray?.filter((q, i) => {
      const tags = q.tags.map((t) => t.toLowerCase());
      console.log(tags);
      return tags.includes(filter);
    });
    setQuestions(filteredQuestions);
  };
  return (
    <>
      <ScreenCaptureWrapper
        ref={screenCaptureRef}
        onCapture={handleCapture}
        setImage={setImage}
      />
      <Snipper ref={captureRef} setScreenCapture={setScreenCapture} />
      {popup && (
        <CustomModal isOpen={""} open={""} close={""}>
          {question !== null && (
            <div className="adminsHeader noTopMargin">
              {!isEditing ? "Extracted Question" : "Edit Question"}{" "}
              <span
                style={{ cursor: "pointer" }}
                title="New Admin"
                onClick={() => setpopup(true)}
              >
                {!isEditing ? (
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/sf-black-filled/64/3232ff/create-new.png"
                    alt="plus-2-math"
                    onClick={() => setIsEditing(true)}
                  />
                ) : (
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/ios-filled/50/0c0cf2/left.png"
                    alt="circled-left"
                    onClick={() => setIsEditing(false)}
                  />
                )}
              </span>
            </div>
          )}

          {question === null ? (
            <>
              {" "}
              {/* <div className="uploadImageHeader">
                UPLOAD QUESTION IMAGE HERE
              </div>
              <div className="questionImagePicker">
                <div
                  title="Extract Question With Ai."
                  style={{
                    display: !isMobile ? "flex" : "block",
                    gap: !isMobile ? "2%" : "5%",
                  }}
                >
                  <FilePicker
                    htmlFor={"fileInput2"}
                    isLableVisible={true}
                    isSubmitBtnVisible={false}
                    selectedFile={selectedImage}
                    onChange={handleUploadImage}
                    iconVisibleWhenImageUploaded={true && !selectedImage}
                    accept=".png"
                    lableStyle={{
                      fontSize: "1.5vw",
                      backgroundColor: "white",
                      color: "white",
                      borderRadius: !isMobile ? "1vw" : "4vw",
                      boxShadow: "2px 2px 10px -2px black",
                      width: !isMobile ? "10vw" : "60%",
                      height: !isMobile ? "" : "10vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      border: "2px dashed rgb(42, 120, 255)",
                      cursor: "pointer",
                    }}
                    imageStyle={{ height: isMobile ? "10vw" : "" }}
                    imageLink={
                      "https://img.icons8.com/ios-filled/50/4D4D4D/sparkling--v1.png"
                    }
                  />
                  <div title="Create Question Without Ai.">
                    <FilePicker
                      htmlFor={"fileInput3"}
                      isLableVisible={true}
                      isSubmitBtnVisible={false}
                      selectedFile={selectedImageAi}
                      onChange={handleUploadImageAi}
                      iconVisibleWhenImageUploaded={true && !selectedImageAi}
                      accept=".png"
                      lableStyle={{
                        fontSize: "1.5vw",
                        backgroundColor: "white",
                        color: "white",
                        borderRadius: !isMobile ? "1vw" : "4vw",
                        boxShadow: "2px 2px 10px -2px black",
                        width: !isMobile ? "10vw" : "60%",
                        height: !isMobile ? "" : "10vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        border: "2px dashed rgb(42, 120, 255)",
                        cursor: "pointer",
                        marginTop: !isMobile ? "" : "5%",
                      }}
                      imageStyle={{ height: isMobile ? "10vw" : "" }}
                      imageLink={
                        "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/4D4D4D/external-upload-image-multimedia-tanah-basah-glyph-tanah-basah.png"
                      }
                    />
                  </div>

                  <div>
                    <div
                      onClick={handleClick}
                      title="Capture screenshot"
                      className="ManualQuestionAdd"
                      style={{
                        fontSize: "1.5vw",
                        backgroundColor: "white",
                        color: "white",
                        borderRadius: !isMobile ? "1vw" : "4vw",
                        boxShadow: "2px 2px 10px -2px black",
                        width: !isMobile ? "10vw" : "60%",
                        height: !isMobile ? "30vh" : "10vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        border: "2px dashed rgb(42, 120, 255)",
                        cursor: "pointer",
                        marginTop: !isMobile ? "" : "5%",
                      }}
                    >
                      <img
                        width="54"
                        height="54"
                        src="https://img.icons8.com/sf-black-filled/64/4D4D4D/screenshot.png"
                        alt="book"
                        style={{ marginTop: !isMobile ? "-17%" : "0%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => {
                        handleAddManualQuestion();
                      }}
                      title="Add Question Manually"
                      className="ManualQuestionAdd"
                      style={{
                        fontSize: "1.5vw",
                        backgroundColor: "white",
                        color: "white",
                        borderRadius: !isMobile ? "1vw" : "4vw",
                        boxShadow: "2px 2px 10px -2px black",
                        width: !isMobile ? "10vw" : "60%",
                        height: !isMobile ? "30vh" : "10vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        border: "2px dashed rgb(42, 120, 255)",
                       
                        cursor: "pointer",
                        marginTop: !isMobile ? "" : "5%",
                      }}
                    >
                      <img
                        width="54"
                        height="54"
                        src="https://img.icons8.com/sf-black-filled/64/4D4D4D/windows-explorer.png"
                        alt="book"
                        style={{ marginTop: !isMobile ? "-17%" : "0%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {isExtracting ? (
                <div
                  style={{
                    marginLeft: isMobile ? "18%" : "46%",
                    marginTop: isMobile ? "5%" : "3%",
                    scale: isMobile ? ".5" : "",
                    width: isMobile ? "100%" : "",
                  }}
                >
                  <CustomLoader />
                </div>
              )  
              : (
                <div style={{ display: "flex", gap: "4%" }}>
                  <CustomButton
                    text={"Submit"}
                    isDissabled={
                      selectedImage === null && selectedImageAi === null
                    }
                    handleClick={handleExtractText}
                    style={{
                      cursor:
                        selectedImage === null && selectedImageAi === null
                          ? "not-allowed"
                          : "pointer",
                    }}
                  />
                  <CustomButton
                    text={"Cancel"}
                    handleClick={() => {
                      setpopup(false);
                    }}
                    style={{
                      backgroundColor: "red",
                      cursor: "pointer",
                    }}
                  />
                </div>
              )} */}
              {/* HEADER */}
              <div className="uploadImageHeader">
                UPLOAD QUESTION IMAGE HERE
              </div>
              {/* GRID */}
              <div className="uploadGrid">
                {/* Extract With AI */}
                <div className="uploadCard">
                  <FilePicker
                    htmlFor="fileInput2"
                    isLableVisible={true}
                    isSubmitBtnVisible={false}
                    selectedFile={selectedImage}
                    onChange={handleUploadImage}
                    accept=".png"
                    lableStyle={{
                      opacity: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />

                  <div className="uploadOverlay">
                    <img src="https://img.icons8.com/ios-filled/50/4D4D4D/sparkling--v1.png" />
                    {selectedImage ? (
                      <span className="fileName">{selectedImage.name}</span>
                    ) : (
                      <span>
                        Extract Question
                        <br />
                        With AI
                      </span>
                    )}
                  </div>
                </div>

                {/* Without AI */}
                <div className="uploadCard">
                  <FilePicker
                    htmlFor="fileInput3"
                    isLableVisible={true}
                    isSubmitBtnVisible={false}
                    selectedFile={selectedImageAi}
                    onChange={handleUploadImageAi}
                    accept=".png"
                    lableStyle={{
                      opacity: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />

                  <div className="uploadOverlay">
                    <img src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/4D4D4D/external-upload-image-multimedia-tanah-basah-glyph-tanah-basah.png" />
                    {selectedImageAi ? (
                      <span className="fileName">{selectedImageAi.name}</span>
                    ) : (
                      <span>
                        Extract Question
                        <br />
                        Without AI
                      </span>
                    )}
                  </div>
                </div>

                {/* Screenshot */}
                <div className="uploadCard" onClick={handleClick}>
                  <div className="uploadOverlay">
                    <img src="https://img.icons8.com/sf-black-filled/64/4D4D4D/screenshot.png" />
                    <span>
                      Capture
                      <br />
                      Screenshot
                    </span>
                  </div>
                </div>

                {/* Manual */}
                <div className="uploadCard" onClick={handleAddManualQuestion}>
                  <div className="uploadOverlay">
                    <img src="https://img.icons8.com/sf-black-filled/64/4D4D4D/windows-explorer.png" />
                    <span>
                      Add
                      <br />
                      Manually
                    </span>
                  </div>
                </div>
              </div>
              {isExtracting ? (
                <div
                  style={{
                    marginLeft: isMobile ? "18%" : "46%",
                    marginTop: isMobile ? "5%" : "3%",
                    scale: isMobile ? ".5" : "",
                    width: isMobile ? "100%" : "",
                  }}
                >
                  <CustomLoader />
                </div>
              ) : (
                <div style={{ display: "flex", gap: "4%" }}>
                  <CustomButton
                    text={"Submit"}
                    isDissabled={
                      selectedImage === null && selectedImageAi === null
                    }
                    handleClick={handleExtractText}
                    style={{
                      cursor:
                        selectedImage === null && selectedImageAi === null
                          ? "not-allowed"
                          : "pointer",
                    }}
                  />
                  <CustomButton
                    text={"Cancel"}
                    handleClick={() => {
                      setpopup(false);
                    }}
                    style={{
                      backgroundColor: "red",
                      cursor: "pointer",
                    }}
                  />
                </div>
              )}{" "}
            </>
          ) : (
            <>
              {/* <div className="uploadImageHeader">Extracted Question</div> */}
              <div className="questionDescriptor">
                <div className="questionElementContainer">
                  <div className="imageContainer uploaderImage">
                    {isEditing === true ? (
                      <>
                        <div
                          title="Upload question image"
                          style={{ cursor: "pointer" }}
                        >
                          {question.diagram !== "" && (
                            <div>
                              <img
                                src={question.diagram}
                                alt="diagram"
                                height={"60%"}
                                width={"60%"}
                                style={{ marginLeft: "23%" }}
                              />
                            </div>
                          )}

                          <FilePicker
                            htmlFor={`imageChange_${1}`}
                            isLableVisible={true}
                            isSubmitBtnVisible={false}
                            selectedFile={""}
                            onChange={(ev) => {
                              handleUploadQuestionImage(ev);
                            }}
                            lableInfo={""}
                            imageStyle={{
                              height: !isMobile ? "3vw" : "10vw",
                              width: !isMobile ? "3vw" : "10vw",
                              cursor: "pointer",
                            }}
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
                            {question?.diagram === "" ? (
                              <>
                                <img
                                  width="30"
                                  height="30"
                                  src="https://img.icons8.com/ios-glyphs/30/737373/no-image.png"
                                  alt="no-image"
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  src={question?.diagram}
                                  alt="diagram"
                                  height={"60%"}
                                  width={"60%"}
                                  style={{ marginLeft: "23%" }}
                                />
                              </>
                            )}
                          </div>
                          {/* <div title="Edit question image.">
                            <FilePicker
                              htmlFor={`imageChange_${1}`}
                              isLableVisible={true}
                              isSubmitBtnVisible={false}
                              selectedFile={""}
                              onChange={(ev) => {
                                handleUploadQuestionImage(ev);
                              }}
                              lableInfo={""}
                              imageStyle={{
                                height: "3vw",
                                width: "3vw",
                                cursor: "pointer",
                              }}
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
                          </div> */}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="extractedText textHead">Title</div>
                  {isEditing ? (
                    <textarea
                      value={question.title}
                      className="editArea"
                      onChange={(ev) => updateTitle(ev)}
                      style={{ height: "6vh" }}
                    />
                  ) : (
                    <>
                      <div className="extractedText">{question.title}</div>
                    </>
                  )}
                  {question.passage && (
                    <>
                      <div className="extractedText textHead">Passage</div>
                      {isEditing ? (
                        <textarea
                          value={question.passage}
                          className="editArea"
                          onChange={(ev) => updatePassage(ev)}
                        />
                      ) : (
                        <>
                          <div
                            className="extractedText"
                            dangerouslySetInnerHTML={{
                              __html: question.passage,
                            }}
                          >
                            {/* {question.passage} */}
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <div className="extractedText textHead">Question</div>
                  {isEditing ? (
                    <textarea
                      value={question.question}
                      className="editArea"
                      onChange={(ev) => updateQuestion(ev)}
                    />
                  ) : (
                    <div
                      className="extractedText"
                      dangerouslySetInnerHTML={{
                        __html: question.question,
                      }}
                    >
                      {/* {question.question} */}
                    </div>
                  )}
                  <div>
                    <div className="extractedText textHead"></div>
                    <select
                      value={question.topic}
                      onChange={(e) => updateTopic(e.target.value)}
                      className="selectInput"
                    >
                      <option value="option1">Select question topic</option>
                      {allList.map((t, index) => (
                        <option value={t.topic}>{t.topic}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div className="extractedText textHead"></div>
                    <select
                      value={question.subTopic}
                      onChange={(e) => updateSubTopic(e.target.value)}
                      className="selectInput"
                    >
                      <option value="option1">Select question subtopic</option>
                      {subtopicList.map((st, index) => (
                        <option value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="questionElementContainer">
                  {question?.options.length > 0 && (
                    <div className="extractedText textHead">Options</div>
                  )}
                  {question?.options.length > 0 && (
                    <>
                      {question.options.map((option, index) => (
                        <div className="extractedText options">
                          {index === 0
                            ? "A."
                            : index === 1
                            ? "B."
                            : index === 2
                            ? "C."
                            : "D."}
                          &nbsp;
                          <span>
                            {isEditing ? (
                              <textarea
                                value={option.replace(
                                  index === 0
                                    ? "A. "
                                    : index === 1
                                    ? "B. "
                                    : index === 2
                                    ? "C. "
                                    : "D. ",
                                  ""
                                )}
                                className="editArea optionEditArea"
                                onChange={(ev) =>
                                  updateOption(ev, index, question.type)
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
                    {isEditing ? (
                      <textarea
                        value={question.answer}
                        className="editArea optionEditArea"
                        onChange={(ev) => updateAnswer(ev)}
                      />
                    ) : (
                      <div className="extractedText">{question.answer}</div>
                    )}
                  </div>
                  <div className="extractedText textHead">Explanation</div>
                  <div className="extractedText">
                    {isEditing ? (
                      <textarea
                        value={question.explanation}
                        className="editArea"
                        onChange={(ev) => updateExplanation(ev)}
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
              <div className="extraElementsContainer ">
                <div className="questionElementContainer2">
                  <div>Tags</div>
                  <div className="tagsContainer">
                    {question.tags.map((tag, index) => (
                      <div key={index} className="tags">
                        &nbsp;
                        <span> {tag}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => {
                            deleteTag(index);
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
                      placeholder={"Enter new tag name here and Press Enter"}
                      Required={false}
                      value={newTag}
                      inputStyle={{
                        border: "1px solid rgb(156, 156, 156)",
                        width: "100%",
                        height: isMobile ? "4vh" : "",
                      }}
                      handleInputChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <div>Question Type</div>
                  <div className="difficultyTypes">
                    <div className="checkBoxInput">
                      <div>
                        <input
                          type="checkbox"
                          name="type"
                          id=""
                          checked={question.type === "objective"}
                          onChange={() => updateQuestionType("objective")}
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
                          onChange={() => updateQuestionType("subjective")}
                        />
                      </div>
                      <div className="extractedText">Subjective</div>
                    </div>
                  </div>
                </div>
                <div className="questionElementContainer2">
                  <div>Difficulty Level</div>
                  <div className="difficultyTypes">
                    <div className="checkBoxInput">
                      <div>
                        <input
                          type="checkbox"
                          name="level"
                          id=""
                          checked={question.difficulty === "easy"}
                          onChange={() => updateDifficultyLevel("easy")}
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
                          onChange={() => updateDifficultyLevel("moderate")}
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
                          onChange={() => updateDifficultyLevel("hard")}
                        />
                      </div>
                      <div className="extractedText">Hard</div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "4%",
                      marginTop: !isMobile ? "10%" : "20%",
                    }}
                  >
                    <CustomButton
                      text={"Save"}
                      handleClick={handleSave}
                      style={{
                        // backgroundColor: "green",
                        height: isMobile ? "4vh" : "",
                      }}
                    />
                    <CustomButton
                      text={"Cancel"}
                      style={{
                        backgroundColor: "red",
                        height: isMobile ? "4vh" : "",
                      }}
                      handleClick={handleCancelUpload}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </CustomModal>
      )}

      <>
        {isLoading ? (
          <>
            <div className="loaderContainer">
              <CustomDataLoader />
              <div className="loaderText">Loading Question dataset ...</div>
            </div>
          </>
        ) : (
          <>
            {image && !isExtracting ? (
              <>
                <div
                  className="dashboardContainer"
                  style={isMobile ? { marginTop: "25vh" } : {}}
                >
                  <img
                    src={!screenCapture ? image : screenCapture}
                    alt="not found"
                    height={"100%"}
                    width={"100%"}
                  />
                  <div style={{ display: "flex", gap: "4%" }}>
                    <CustomButton
                      text={"Capture"}
                      handleClick={() => handleCaptureClick()}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                    <CustomButton
                      text={"Submit"}
                      handleClick={() => {
                        handleExtractTextSnipping(
                          !screenCapture ? image : screenCapture
                        );
                      }}
                      style={{
                        backgroundColor: "green",
                        cursor: "pointer",
                      }}
                    />
                    <CustomButton
                      text={"Cancel"}
                      handleClick={() => {
                        // setpopup(true);
                        setScreenCapture(null);
                        setImage(null);
                      }}
                      style={{
                        backgroundColor: "red",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className={!isMobile ? "dashboardContainer" : ""}
                  style={{ margin: isMobile ? "2%" : "" }}
                >
                  <div className="adminsHeader">
                    Question {!isMobile ? "Database" : "DB"} <p> </p>
                    <span style={{ cursor: "pointer" }}>
                      {filter !== null ? (
                        <>
                          <div style={{ display: "flex", gap: "5%" }}>
                            <div>
                              <img
                                width="40"
                                height="40"
                                src="https://img.icons8.com/sf-black-filled/64/4D4D4D/upload.png"
                                alt="upload"
                                onClick={uploadQuestions}
                              />
                            </div>
                            <div className="highlight">
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => handleFilter("english")}
                              >
                                <img
                                  width="35"
                                  height="35"
                                  src={
                                    quesFilter === "english"
                                      ? "https://img.icons8.com/ios-filled/50/228BE6/brick.png"
                                      : "https://img.icons8.com/ios-filled/50/4D4D4D/brick.png"
                                  }
                                  alt="brick"
                                />
                              </div>
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => handleFilter("maths")}
                              >
                                <img
                                  width="35"
                                  height="35"
                                  src={
                                    quesFilter === "maths"
                                      ? "https://img.icons8.com/ios-filled/50/228BE6/minimum-value.png"
                                      : "https://img.icons8.com/ios-filled/50/4D4D4D/minimum-value.png"
                                  }
                                  alt="brick"
                                />
                              </div>
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => refresh()}
                              >
                                <img
                                  width="35"
                                  height="35"
                                  src="https://img.icons8.com/ios-filled/50/4D4D4D/connection-sync.png"
                                  alt="connection-sync"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ display: "flex", gap: "5%" }}>
                            <div
                              title="New Question"
                              onClick={() => setpopup(true)}
                            >
                              <img
                                width="35"
                                height="35"
                                src="https://img.icons8.com/ios-filled/50/4D4D4D/plus-2-math.png"
                                alt="plus-2-math"
                              />
                            </div>
                            <div className="highlight">
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => handleFilter("english")}
                              >
                                <img
                                  width="35"
                                  height="35"
                                  src={
                                    quesFilter === "english"
                                      ? "https://img.icons8.com/ios-filled/50/228BE6/brick.png"
                                      : "https://img.icons8.com/ios-filled/50/4D4D4D/brick.png"
                                  }
                                  alt="brick"
                                />
                              </div>
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => handleFilter("maths")}
                              >
                                <img
                                  width="35"
                                  height="35"
                                  src={
                                    quesFilter === "maths"
                                      ? "https://img.icons8.com/ios-filled/50/228BE6/minimum-value.png"
                                      : "https://img.icons8.com/ios-filled/50/4D4D4D/minimum-value.png"
                                  }
                                  alt="brick"
                                />
                              </div>
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => refresh()}
                              >
                                <img
                                  width="35"
                                  height="35"
                                  src="https://img.icons8.com/ios-filled/50/4D4D4D/connection-sync.png"
                                  alt="connection-sync"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </span>
                  </div>
                  {!questions[0] ? (
                    <>
                      <div className="noTestMessage">
                        No Question Uploaded !!!
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="scrollableContent">
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                          }}
                        >
                          <thead>
                            <tr>
                              {["S.NO.", "Id", "Title", "Tags", "Actions"].map(
                                (col, idx) => (
                                  <th key={idx} style={headerStyle}>
                                    {col}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {questions &&
                              [...questions]
                                ?.reverse()
                                .map((question, rowIndex) => (
                                  <tr
                                    key={rowIndex}
                                    style={{
                                      color: "black",
                                      fontSize: "1.1vw",
                                    }}
                                  >
                                    <td style={cellStyle}>{rowIndex + 1}.</td>
                                    <td style={cellStyle}>
                                      {question._id.slice(0, 7)}
                                    </td>
                                    <td style={cellStyle}>{question.title}</td>

                                    <td style={cellStyle} className="overflow">
                                      <div
                                        className="tagsContainer"
                                        style={{
                                          gap: "2%",
                                          maxWidth: "35vw",
                                        }}
                                      >
                                        {question.tags?.map(
                                          (feature, index) => (
                                            <div
                                              key={index}
                                              className="tags"
                                              style={{ padding: "2%" }}
                                              // style={{ width: "auto" }}
                                            >
                                              &nbsp;
                                              {feature}
                                              &nbsp; &nbsp;
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </td>
                                    <td className="cellWidth" style={cellStyle}>
                                      {" "}
                                      <>
                                        {showCard === question._id && (
                                          <div
                                            className="adminSelectionCard dbCard"
                                            style={{
                                              marginTop: isMobile ? "" : "0%",
                                              marginLeft: isMobile
                                                ? ""
                                                : "-16%",
                                            }}
                                          >
                                            <div
                                              className="SelectionCardCross"
                                              onClick={() => setShowCard(null)}
                                            >
                                              <img
                                                width={!isMobile ? "30" : "13"}
                                                height={!isMobile ? "30" : "13"}
                                                src="https://img.icons8.com/ios-glyphs/30/FA5252/multiply.png"
                                                alt="multiply"
                                              />
                                            </div>

                                            <div className="practiceAction">
                                              <div
                                                className="actionElement"
                                                onClick={() => {
                                                  handleTerminateQuestion(
                                                    question
                                                  );
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    color: "red",
                                                    fontSize: isMobile
                                                      ? "3vw"
                                                      : "",
                                                  }}
                                                >
                                                  Terminate
                                                </div>
                                              </div>
                                              <div
                                                className="actionElement"
                                                onClick={() => {
                                                  setDetectEditing(true);
                                                  setQuestion(question);
                                                  setpopup(true);
                                                  setIsEditing(true);
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    color: "",
                                                    fontSize: isMobile
                                                      ? "3vw"
                                                      : "",
                                                  }}
                                                >
                                                  Edit
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        {filter !== null ? (
                                          <>
                                            <input
                                              checked={selectedQuestions.some(
                                                (q) => q._id === question._id
                                              )}
                                              type="checkbox"
                                              name={question._id}
                                              id={question._id}
                                              className="checkBox"
                                              onChange={() => {
                                                handleSelectQuestion(
                                                  question,
                                                  rowIndex
                                                );
                                              }}
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <div
                                              style={{
                                                display: "flex",
                                                gap: !isMobile ? "5%" : "0%",
                                                marginLeft: isMobile
                                                  ? "7%"
                                                  : "20%",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  marginTop: isMobile
                                                    ? "5%"
                                                    : "4%",
                                                }}
                                              >
                                                <img
                                                  width={
                                                    !isMobile ? "40" : "23"
                                                  }
                                                  height={
                                                    !isMobile ? "40" : "23"
                                                  }
                                                  src="https://img.icons8.com/stamp/32/4D4D4D/create-new.png"
                                                  alt="create-new"
                                                  onClick={() => {
                                                    setDetectEditing(true);
                                                    setQuestion(question);
                                                    setpopup(true);
                                                    setIsEditing(true);
                                                  }}
                                                />
                                              </div>
                                              <div>
                                                <img
                                                  width={
                                                    !isMobile ? "50" : "30"
                                                  }
                                                  height={
                                                    !isMobile ? "50" : "20"
                                                  }
                                                  src="https://img.icons8.com/sf-black-filled/64/4D4D4D/delete-forever.png"
                                                  alt="delete-forever"
                                                  onClick={() => {
                                                    handleTerminateQuestion(
                                                      question
                                                    );
                                                  }}
                                                />
                                              </div>
                                            </div>
                                            {/* <img
                                            onClick={() => {
                                              setShowCard(question._id);
                                            }}
                                            style={{
                                              marginLeft: isMobile
                                                ? "20%"
                                                : "33%",
                                              cursor: "pointer",
                                            }}
                                            width={isMobile ? "25" : "30"}
                                            height={isMobile ? "25" : "30"}
                                            src="https://img.icons8.com/ios-filled/50/4D4D4D/four-squares.png"
                                            alt="course-assign"
                                          /> */}
                                          </>
                                        )}
                                      </>
                                    </td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </>
    </>
  );
};

export default QuestionDatabase;

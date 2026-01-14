// import React from "react";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { useSelector } from "react-redux";
// import { useMediaQuery } from "../../Custom_hooks/Custom";
// const Dashboard = () => {
//   const auth = useSelector((state) => state.user.auth);
//   const isMobile = useMediaQuery("(max-width:430px)");
//   console.log("auth", auth);

//   const handleFidTestCount = (status) => {
//     const tests = auth.data.assignedTests.filter(
//       (test) => test.testStatus === status
//     );
//     return tests.length;
//   };

//   const handleFindTestTypeCount = (type) => {
//     const tests = auth.data.assignedTests.filter(
//       (test) => test.testType === type
//     );
//     return tests.length;
//   };
//   return (
//     <>
//       <div className="dashboardContainer">
//         <div className="profileContainer">
//           <div className="ProfileIcon">{auth.data.name[0]}</div>
//           <div>
//             <div className="adminHeader">{auth.data.name}</div>
//             <div className="adminText">{auth.data.email}</div>
//           </div>
//         </div>
//         <div className="mainAnalysisContainer">
//           <div className="analysisContainer">
//             <div className="analysisElement">
//               <div>
//                 <img
//                   className="analysisIcon"
//                   src="https://img.icons8.com/ios/50/FFFFFF/student-registration.png"
//                   alt="student-registration"
//                 />
//               </div>
//               <div>Total Mock Tests - {handleFindTestTypeCount("Mock")}</div>

//               <div>
//                 Total Practice Tests -{" "}
//                 {handleFidTestCount("Completed") +
//                   handleFidTestCount("Pending") -
//                   handleFindTestTypeCount("Mock")}
//               </div>
//             </div>
//           </div>
//           <div
//             className="analysisContainer chart"
//             style={{ backgroundColor: "white" }}
//           >
//             <div>
//               <div className="boldText">Test Count Analyser</div>
//               <PieChart
//                 series={[
//                   {
//                     data: [
//                       {
//                         id: 0,
//                         value:
//                           handleFidTestCount("Completed") +
//                             handleFidTestCount("Pending") ===
//                           0
//                             ? 1
//                             : handleFidTestCount("Completed"),
//                         label: "Completed",
//                       },
//                       {
//                         id: 1,
//                         value:
//                           handleFidTestCount("Completed") +
//                             handleFidTestCount("Pending") ===
//                           0
//                             ? 1
//                             : handleFidTestCount("Pending"),
//                         label: "Pending",
//                       },
//                     ],
//                   },
//                 ]}
//                 width={isMobile ? 400 : 400}
//                 height={isMobile ? 150 : 200}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import "./Dashboard.css";
// import { LineChart } from "@mui/x-charts/LineChart";
import { GetRoute } from "../../Custom_hooks/Routes";
import { useMediaQuery } from "../../Custom_hooks/Custom";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Users, UserCheck, BarChart3, Smile } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Local UI components (no alias required)
const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl shadow-lg ${className}`}>{children}</div>
);

const CardContent = ({ className = "", children }) => (
  <div className={className}>{children}</div>
);

const Button = ({ className = "", children, ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-xl bg-[#333F6B] text-white hover:opacity-90 transition ${className}`}
  >
    {children}
  </button>
);

const chartData = [
  { month: "Jan", students: 200 },
  { month: "Feb", students: 350 },
  { month: "Mar", students: 500 },
  { month: "Apr", students: 700 },
  { month: "May", students: 900 },
];

const admins = [
  { id: 1, name: "SAT Mock Test", role: "Maths", status: "Active" },
  { id: 2, name: "Weekly Quiz", role: "English", status: "Active" },
  { id: 3, name: "Full Length Test", role: "Practice", status: "Inactive" },
];

function Dashboard() {
  const auth = useSelector((state) => state.user.auth);
  const isMobile = useMediaQuery("(max-width:430px)");
  console.log("auth", auth);
  const [test, setTests] = useState([]);

  useEffect(() => {
    GetRoute(
      `refreshUser/${auth?.data._id}`,
      () => {},
      (data) => {
        setTests(data.assignedTests);
      }
    );
  }, []);

  const handleFidTestCount = (status) => {
    const tests = test.filter((test) => test.testStatus === status);
    return tests.length;
  };

  const handleFindTestTypeCount = (type) => {
    const newType = type.toUpperCase();
    const tests = test.filter((t) =>
      t.testType.toUpperCase().includes(newType)
    );
    return tests.length;
  };
  const completed = handleFidTestCount("Completed") || 0;
  const total =
    handleFidTestCount("Completed") + handleFidTestCount("Pending") || 0;

  const percentage = total === 0 ? 0 : (completed / total) * 100;
  const stats = [
    {
      title: "Total Tests Allotted",
      value: handleFidTestCount("Completed") + handleFidTestCount("Pending"),
      icon: Users,
    },
    {
      title: "Tests Attempted",
      value: handleFidTestCount("Completed"),
      icon: BarChart3,
    },
    {
      title: "Practice Tests",
      value: handleFindTestTypeCount("Practice"),
      icon: UserCheck,
    },
    {
      title: "Mock Tests",
      value: handleFindTestTypeCount("Mock"),
      icon: Smile,
    },
  ];
  return (
    <div className="min-h-screen bg-white p-6 text-gray-800 overflow-y-auto max-h-screen">
      {/* Top Gradient Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 rounded-2xl bg-gradient-to-r from-[#6A85B6] to-[#BAC8E0] p-6 shadow-lg flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
            <Smile className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              WELCOME {auth.data.name.toUpperCase()}
            </h1>
            <p className="text-sm text-white/80">{auth.data.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center text-white font-bold">
            {auth.data.name[0].toUpperCase()}
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-[#F8FAFF] to-[#EEF2FF] border border-[#333F6B]/10">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h2 className="text-3xl font-bold text-[#333F6B]">
                    {stat.value}
                  </h2>
                </div>
                <stat.icon className="w-10 h-10 text-[#333F6B]/70" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Motivation + Resume Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <Card className="lg:col-span-2 bg-gradient-to-r from-[#333F6B] to-[#4B5A8A] text-white">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-2">
              🔥 You're on a 5-day learning streak!
            </h3>
            <p className="mb-4 text-white/80">
              Consistency is the key to success. Continue your last lesson.
            </p>
            <Button className="bg-white text-[#333F6B]">
              📘 Resume Last Lesson
            </Button>
          </CardContent>
        </Card>

        {/* Animated Progress Ring */}
        <Card className="flex items-center justify-center">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">Test Completion</p>
            <motion.div
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1 }}
              className="w-32 h-32 rounded-full border-8 border-[#333F6B]/20 flex items-center justify-center"
            >
              <span className="text-3xl font-bold text-[#333F6B]">
                {percentage}%
              </span>
            </motion.div>
          </CardContent>
        </Card>
      </div>

      {/* Badges + Time Spent */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Badges */}
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">🏆 Achievements</h3>
            <div className="flex gap-4 flex-wrap">
              {["Starter", "5-Day Streak", "Quiz Master", "Fast Learner"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="px-4 py-2 rounded-full bg-[#333F6B]/10 text-[#333F6B] font-semibold text-sm"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Time Spent */}
        <Card className="flex items-center justify-center">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-gray-500">⏱️ Time Spent Today</p>
            <h2 className="text-4xl font-bold text-[#333F6B] mt-2">1h 25m</h2>
            <p className="text-xs text-gray-400 mt-1">Great consistency!</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <Card className="bg-white/10 backdrop-blur-xl border-none rounded-2xl">
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Your Learning Progress
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="students" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-xl border-none rounded-2xl">
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Practice Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#333F6B" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Admin Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card className="bg-white/10 backdrop-blur-xl border-none rounded-2xl">
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Upcoming Tests</h3>
            <div className="overflow-y-auto max-h-[100vh]">
              <table className="w-full text-left">
                <thead className="text-gray-300">
                  <tr>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id} className="border-t border-white/10">
                      <td className="py-3">{admin.name}</td>
                      <td>{admin.role}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            {
                              Active: "bg-green-500/20 text-green-300",
                              Inactive: "bg-red-500/20 text-red-300",
                            }[admin.status]
                          }`}
                        >
                          {admin.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Dashboard;

// import 'rsuite/dist/rsuite.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { useMediaQuery } from './Components/Custom_hooks/Custom';
import { PersistGate } from 'redux-persist/integration/react'
import Login from './Components/Auth/Login/Login';
import { store, persistor } from './Components/Redux/Store';
import Dashboard from './Components/User/Dashboard/Dashboard';
import CustomSidebar from './Components/CustomComponents/CustomSidebar/CustomSidebar';
import PracticeTests from './Components/User/PracticeTests/PracticeTests';
import MockTests from './Components/User/MockTests/MockTests';
import CustomTestPlatform from './Components/CustomComponents/CustomTestPlatform/CustomTestPlatform';
import Description from './Components/User/Test/Description';
import { Expression, GraphingCalculator } from "desmos-react";
import './App.css'
import Result from './Components/User/Test/Result';
import UploadTests from './Components/Admin/uploadTests/UploadTests';
import Users from './Components/Admin/Users/Users';
import AdminDashboard from './Components/Admin/Dashboard/Dashboard';
import PracticeTest from './Components/Admin/PracticeTest/PracticeTest';
import Mock from './Components/Admin/Mock/Mock';
import ResultDescriptor from './Components/User/Test/ResultDescriptor';
import Home from './Components/Home/Home';
import { ToastContainer } from 'react-toastify';
import './output.css'
import DiagnosticTest from 'Components/Admin/DiagnosticTest/DiagnosticTest';
import DiagnosticTests from 'Components/User/DiagnosticTests/DiagnosticTests';
function App() {
  const isMobile = useMediaQuery('(max-width:412px)');

  return <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <GraphingCalculator attributes={{ className: "calculator c2" }} projectorMode>
      <Expression id="fn" latex="x^2" />
    </GraphingCalculator>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Login />} />
            <Route element={<CustomSidebar />}>
              <Route path='/user/dashboard' element={<Dashboard />} />
              <Route path='/test/practice' element={<PracticeTests />} />
              <Route path='/test/mock' element={<MockTests />} />
              <Route path='/test/diagnostic' element={<DiagnosticTests/>} />

              <Route path='/admin/dashboard' element={<AdminDashboard />} />
              <Route path='/admin/test/upload' element={<UploadTests />} />
              <Route path='/admin/test/practice' element={<PracticeTest />} />
              <Route path='/admin/test/mock' element={<Mock />} />
              <Route path='/admin/test/diagnostic' element={<DiagnosticTest/>} />
              <Route path='/admin/access/users' element={<Users />} />

            </Route>
            <Route path='/test/platform' element={<CustomTestPlatform />} />
            <Route path='/test/description' element={<Description />} />
            <Route path='/test/submit/result' element={<ResultDescriptor />} />
            <Route path='/test/result' element={<Result />} />
          </Routes>

        </BrowserRouter>
      </PersistGate>
    </Provider>
  </>
}

export default App;


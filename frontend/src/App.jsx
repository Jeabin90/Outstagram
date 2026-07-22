import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 주소로 들어가거나 /login으로 갈 때 로그인 화면 띄우기 */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
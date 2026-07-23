import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MyPage from "./components/mypage/MyPage";
import EditProfilePage from "./components/editprofile/EditProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/edit" element={<EditProfilePage />} />

        {/* 로고 클릭 시 메인 창으로 이동 */}
        {/* <Route path="/main" element={<main />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PostsList } from "../components/posts/PostsList"
import { Post } from "../components/posts/Post"
import { CategoriesList } from "../components/categories/CategoriesList"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />} >
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:post_id" element={<Post />} />
        <Route path="/categories" element={<CategoriesList />} />
      </Route>
    </Routes>
  </>
}

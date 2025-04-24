import { Route, Routes } from "react-router-dom"
import AuthLayout from "./layouts/auth-layout"
import { AuthRoutes, ProtectedRoutes } from "./router"
import ProtectedLayout from "./layouts/protected-layout"
import { AuthMiddleware, ProtectedMiddleware } from "./router/middleware"


function App() {

  return (
    <>
      <Routes>
        {AuthRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path}
            element={
              <AuthMiddleware>
                <AuthLayout>{r.component}</AuthLayout>
              </AuthMiddleware>
            }
          />
        ))}

        {ProtectedRoutes.map((r) => (
          <Route
            key={r.path}
            path={r.path}
            element={
              <ProtectedMiddleware><ProtectedLayout>{r.component}</ProtectedLayout></ProtectedMiddleware>
            }
          />
        ))}
         <Route path="*" element={ <ProtectedMiddleware><ProtectedLayout>{<div>not found</div>}</ProtectedLayout></ProtectedMiddleware>} />
      </Routes>

    </>
  )
}

export default App

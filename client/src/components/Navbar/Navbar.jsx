import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();
  const [User, setUser] = useState(
    JSON.parse(localStorage.getItem("profile_"))
  );

  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/");
  };
  useEffect(() => {
    const token = User?.token_;
    if (token) {
      let decodedtoken = jwtDecode(token);
      if (decodedtoken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile_")));
  }, [location]);
  return (
    <>
      <div className="flex pl-[5%] pr-[5%] gap-8 items-center justify-between h-[50px] w-full  text-[20px]  bg-[#66666680] text-slate-200">
        <div className="flex items-center gap-5">
          <Link className=" flex gap-5" to="/">
            {/* <img src="/logo.jpg" width={"40px"} className="rounded-[70%]"/> */}
            <div>PngBoy</div>
          </Link>
        </div>
        <div>
          {User ? (
            <div className="flex gap-8">
              {
                <Link to={`/user/${User.user_._id}`}>
                  <div className="flex gap-2">
                    <div className="bg-purple-700 rounded-[100px]  w-[33px] h-[33px] text-center">
                      {User.user_.name[0]}
                    </div>
                    <span>{User.user_.name}</span>
                  </div>
                </Link>
              }

              <button
                className="bg-[#9191919b] hover:bg-[#7d7d7d9f] border rounded-[8px] p-1 text-sm"
                onClick={logout}
              >
                Sign out
              </button>
            </div>
          ) : location.pathname !== "/auth" ? (
            <div>
              <Link to="/auth">
                <button className="bg-[#9191919b] hover:bg-[#7d7d7d9f] rounded-[8px] p-1 text-sm">
                  Sign in
                </button>
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;

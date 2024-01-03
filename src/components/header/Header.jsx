import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi"; //for search icon
import { SlMenu } from "react-icons/sl"; //menu icon
import { VscChromeClose } from "react-icons/vsc"; // closing icon
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";
import { useDispatch } from "react-redux";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Movixx from "../../assets/Movixx.png";
import { getHistory } from "../../store/homeSlice";
import { SearchHistory } from "../../pages/home/searchHistory/SearchHistory";

export const Header = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const searchQueryHandler = (event) => {
    setShowHistory(true);
    if (event.key === "Enter" && query.length > 0) {
      setShowHistory(false);
      dispatch(getHistory(query));
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };
  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img className="Movixx" src={Movixx} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => {
                setMobileMenu(false);
                setShowHistory(false);
              }}
            />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose
                onClick={() => {
                  setShowSearch(false);
                  setShowHistory(false);
                }}
              />
            </div>
          </ContentWrapper>
          {showHistory && <SearchHistory></SearchHistory>}
        </div>
      )}
    </header>
  );
};

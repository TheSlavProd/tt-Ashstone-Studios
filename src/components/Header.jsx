import React, { useCallback, useEffect, useState } from 'react';
import arrow from '../assets/svg/arrow.svg';
import logo from '../assets/svg/logo.svg';
import openMenu from '../assets/svg/openMenu.svg';
import closeMenuButton from '../assets/svg/closeMenu.svg';
import search from '../assets/svg/search.svg';
import styled from 'styled-components';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [menu, setMenu] = useState({});
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [hide, setHide] = useState(false);
  const [offsetY, setOffsetY] = useState(document.scrollingElement.scrollHeight);
  useEffect(() => {
    const getData = async () => {
      const data = await fetch('./static/headerMenu.json');
      setMenu(await data.json());
    };
    getData();
  }, []);
  const handleNavigation = useCallback(() => {
    if (offsetY > window.scrollY) {
      setHide(false);
    } else if (offsetY < window.scrollY) {
      setHide(true);
    }
    setOffsetY(window.scrollY);
  }, [offsetY]);

  useEffect(() => {
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, []);
  const menuItemNames = Object.keys(menu);
  return (
    <>
      <MobileMenu isOpen={openMobileMenu} onClose={() => setOpenMobileMenu(false)} />
      <Wrapper hide={hide}>
        <div className="row-1">
          <button className="open-menu" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
            <img src={openMobileMenu ? closeMenuButton : openMenu} alt="menu button" />
          </button>
          <img src={logo} alt="logo" className="logo" />

          <label className="search">
            <button>
              <img src={search} alt="search" />
            </button>
            <input type="text" id="search" />
          </label>
        </div>
        <nav className="row-2">
          <ul className="main-menu">
            {menuItemNames.map((item, index) => {
              const hasItems = menu[item].items;
              return (
                <li key={`${item}${index}`}>
                  {hasItems ? (
                    <>
                      {menu[item].label} <img src={arrow} alt="arrow" />
                    </>
                  ) : (
                    <a href={menu[item].url}>{menu[item].label}</a>
                  )}

                  {hasItems && (
                    <ul>
                      {menu[item].items.map((subItem, index) => (
                        <li key={`${subItem}${index}`}>
                          <a href={subItem.url}>{subItem.label}</a>
                          <img src={arrow} className="rotate90" alt="arrow" />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.header`
  font-size: 1.5em;
  text-align: center;
  max-height: 8.75rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid var(--var-border-grey);
  position: sticky;
  top: 0;
  background: white;
  transition: all 0.2s;
  * {
    transition: all 0.2s;
  }
  @media only screen and (min-width: 600px) {
    transform: translateY(${({ hide }) => (hide ? '-5.125rem' : 0)});
  }

  .row-1 {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1.75rem 12.5rem;
    @media only screen and (max-width: 960px) {
      padding: 1.75rem 5rem;
    }
    @media only screen and (max-width: 740px) {
      padding: 1.75rem 2.5rem;
    }
    border-bottom: 1px solid var(--var-border-grey);
    .open-menu {
      all: unset;
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;
      visibility: hidden;
      @media only screen and (max-width: 740px) {
        visibility: visible;
      }
    }
    .logo {
      height: 1.625rem;
      width: 11.25rem;
    }

    .search {
      position: relative;
      input {
        width: 5rem;
        height: 1.25rem;
        position: absolute;
        right: 1.875rem;
        cursor: text;
        border-width: 0 0 1px 0;
        border-color: transparent;
        outline: unset;
        &:focus {
          border-color: var(--var-border-grey);
        }
      }
      button {
        all: unset;
        width: 1.25rem;
        height: 1.25rem;
        cursor: pointer;
      }
    }
  }
  .row-2 {
    padding: 0 12.5rem;
    @media only screen and (max-width: 740px) {
      display: none;
    }
    @media only screen and (max-width: 960px) {
      padding: 0 5rem;
    }

    .main-menu {
      font-family: Roboto;
      font-size: 1rem;
      font-weight: 500;
      line-height: 1rem;
      text-align: left;
      display: flex;
      gap: 2rem;
      position: relative;
      li {
        cursor: pointer;
        padding: 1.313rem 0;
        &:hover ul {
          display: block;
        }
      }
      a {
        font-weight: 400;
        color: #000000;
        text-decoration: none;
        &:visited {
          color: black;
        }
        img {
          position: relative;
          top: -3px;
        }
      }
      ul {
        display: none;
        position: absolute;
        margin-top: 1.25rem;
        padding: 1.25rem;
        border: 1px solid var(--var-border-grey);
        background: white;
        li {
          cursor: pointer;
          width: 11rem;
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          &:not(:last-child) {
            border-bottom: 1px solid var(--var-border-grey);
          }
          &:hover a {
            transform: translateX(0.5rem);
            color: var(--var-text-grey);
            text-decoration: none;
          }
        }

        .rotate90 {
          transform: rotate(-90deg);
        }
      }
    }
  }
`;

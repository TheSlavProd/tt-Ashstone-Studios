import React, { useEffect, useState } from 'react';
import arrow from '../assets/svg/arrow.svg';
import logo from '../assets/svg/logo.svg';
import closeMenuButton from '../assets/svg/closeMenu.svg';
import styled from 'styled-components';

export default function MobileMenu({ isOpen, onClose }) {
  const [menu, setMenu] = useState({});
  const menuItemNames = Object.keys(menu);
  useEffect(() => {
    const getData = async () => {
      const data = await fetch('./static/headerMenu.json');
      setMenu(await data.json());
    };
    getData();
  }, []);
  if (!isOpen) {
    return <></>;
  }
  return (
    <Wrapper>
      <div className="row-1">
        <img src={logo} alt="logo" className="logo" />

        <button className="open-menu" onClick={onClose}>
          <img src={closeMenuButton} alt="menu button" />
        </button>
      </div>
      <div className="main-menu">
        {menuItemNames.map((item, index) => {
          const hasItems = menu[item].items;
          return (
            <label key={`${item}${index}`}>
              <div className="content">
                {hasItems ? (
                  <>
                    {menu[item].label} <img src={arrow} alt="arrow" />
                  </>
                ) : (
                  <a href={menu[item].url}>{menu[item].label}</a>
                )}
              </div>
              <input type="radio" name="menu-accordion" className="menu-accordion" />
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
            </label>
          );
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  position: fixed;
  background: white;
  z-index: 1;
  font-size: 1.5em;
  text-align: center;
  min-height: 100%;
  min-width: 20rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid var(--var-border-grey);
  top: 0;
  transition: all 0.2s;
  * {
    transition: all 0.2s;
  }
  .row-1 {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1.75rem 2.5rem;
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
  }
  .menu-accordion {
    display: none;

    ~ ul {
      display: none;
      padding: 0.25rem 0;
      background: white;
      width: 100%;

      li {
        cursor: pointer;
        width: 100%;
        display: flex;
        padding: 0.7rem 1rem 0.7rem 3rem;
        justify-content: space-between;
        border-bottom: 1px solid var(--var-border-grey);
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
  .menu-accordion:checked ~ ul {
    display: block;
  }

  .main-menu {
    margin-top: 0.625rem;
    font-family: Roboto;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1rem;
    text-align: left;
    display: flex;
    width: 100%;
    flex-direction: column;
    position: relative;

    label > .content {
      cursor: pointer;
      padding: 1.313rem 1.875rem;
      &:not(:last-child) {
        border-bottom: 1px solid var(--var-border-grey);
      }
    }
    a {
      text-decoration: none;
      &:visited {
        color: black;
      }

      &:hover {
        text-decoration: underline;
      }
      img {
        position: relative;
        top: -3px;
      }
    }
  }
`;

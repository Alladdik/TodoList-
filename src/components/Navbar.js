import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const changeColor = keyframes`
  0% { background-color: rgba(52, 152, 219, 0.2); }
  33% { background-color: rgba(46, 204, 113, 0.2); }
  66% { background-color: rgba(231, 76, 60, 0.2); }
  100% { background-color: rgba(52, 152, 219, 0.2); }
`;

const NavbarContainer = styled.nav`
  background-color: #1a2a3a;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const AnimatedCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  animation: ${float} 6s ease-in-out infinite, ${changeColor} 10s linear infinite;
  opacity: 0.6;
  filter: blur(8px);
`;

const Circle1 = styled(AnimatedCircle)`
  left: 10%;
  top: -50px;
  animation-delay: 0s, 0s;
`;

const Circle2 = styled(AnimatedCircle)`
  left: 20%;
  bottom: -50px;
  animation-delay: 1s, 2s;
`;

const Circle3 = styled(AnimatedCircle)`
  right: 20%;
  top: -30px;
  animation-delay: 2s, 4s;
`;

const Circle4 = styled(AnimatedCircle)`
  right: 10%;
  bottom: -40px;
  animation-delay: 3s, 6s;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 1;
`;

const NavItem = styled.li`
  margin-left: 1.5rem;
  animation: ${fadeIn} 0.5s ease-in;
`;

const glowingEffect = keyframes`
  0% { box-shadow: 0 0 5px rgba(52, 152, 219, 0.7), 0 0 10px rgba(52, 152, 219, 0.5); }
  50% { box-shadow: 0 0 20px rgba(52, 152, 219, 0.8), 0 0 30px rgba(52, 152, 219, 0.6); }
  100% { box-shadow: 0 0 5px rgba(52, 152, 219, 0.7), 0 0 10px rgba(52, 152, 219, 0.5); }
`;

const shine = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const AnimatedNavLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  padding: 0.7rem 1.2rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  background-color: ${props => props.color || '#3498db'};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  display: inline-block;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(45deg);
    animation: ${shine} 1.5s infinite;
    pointer-events: none;
  }

  &:hover {
    background-color: ${props => props.hoverColor || '#2980b9'};
    transform: translateY(-3px);
    animation: ${glowingEffect} 1.5s infinite;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const WelcomeText = styled.span`
  color: #ecf0f1;
  font-weight: bold;
  margin-right: 1rem;
`;

const wavyAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-5px); }
  75% { transform: translateY(5px); }
`;

const OnePieceLink = styled(AnimatedNavLink)`
  background-color: #ff9900;
  color: #000000;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  border: 2px solid #000000;
  position: relative;
  overflow: hidden;

  &:before {
    content: '☠️';
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2em;
  }

  &:after {
    content: '⚓';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2em;
  }

  &:hover {
    background-color: #ffd700;
    color: #8b0000;
    animation: ${wavyAnimation} 0.5s ease infinite;
  }
`;
const Navbar = ({ user, onLogout }) => {
  return (
    <NavbarContainer>
      <Circle1 />
      <Circle2 />
      <Circle3 />
      <Circle4 />
      <NavList>
        {user ? (
          <>
            <NavItem>
              <WelcomeText>Welcome, {user.username}</WelcomeText>
            </NavItem>
            <NavItem>
              <AnimatedNavLink to="/profile" color="#2ecc71" hoverColor="#27ae60">
                Profile
              </AnimatedNavLink>
            </NavItem>
            <NavItem>
              <AnimatedNavLink as="button" onClick={onLogout} color="#e74c3c" hoverColor="#c0392b">
                Logout
              </AnimatedNavLink>
            </NavItem>
            <NavItem>
              <AnimatedNavLink to="/todos" color="#f39c12" hoverColor="#d35400">
                Todo List
              </AnimatedNavLink>
            </NavItem>
            <NavItem>
              <OnePieceLink to="/onepiece">
                One Piece
              </OnePieceLink>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <AnimatedNavLink to="/" color="#3498db" hoverColor="#2980b9">
                Home
              </AnimatedNavLink>
            </NavItem>
            <NavItem>
              <AnimatedNavLink to="/register" color="#9b59b6" hoverColor="#8e44ad">
                Register
              </AnimatedNavLink>
            </NavItem>
            <NavItem>
              <OnePieceLink to="/onepiece">
                One Piece
              </OnePieceLink>
            </NavItem>
          </>
        )}
      </NavList>
    </NavbarContainer>
  );
};

export default Navbar;
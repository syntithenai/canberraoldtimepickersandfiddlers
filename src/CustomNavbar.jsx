import React from "react";
import { Navbar, Container, Form, FormControl, Button, Dropdown, ProgressBar } from "react-bootstrap";
import { PlayCircle, ChevronDown, ChevronUp } from "react-bootstrap-icons";

const CustomNavbar = () => {
  return (
    <div className="navbar-container">
      {/* Navbar */}
      <Navbar className="custom-navbar" fixed="top">
        {/* Logo */}
        <div className="logo">🎻</div>

        {/* Centered Controls: Search & Speed */}
        <div className="center-controls">
          {/* Search Form */}
          <Form className="search-form">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Dropdown>
              <Dropdown.Toggle variant="secondary">Tuning</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Standard</Dropdown.Item>
                <Dropdown.Item>DADGAD</Dropdown.Item>
                <Dropdown.Item>Drop D</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="secondary">Key</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>C Major</Dropdown.Item>
                <Dropdown.Item>G Major</Dropdown.Item>
                <Dropdown.Item>D Minor</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>

          {/* Speed Controls */}
          <div className="speed-controls">
            <Button variant="outline-light">
              <ChevronDown size={20} /> {/* Tortoise */}
            </Button>
            <Button variant="outline-light">
              <ChevronUp size={20} /> {/* Hare */}
            </Button>
          </div>
        </div>

        {/* Play Button */}
        <div className="play-button">
          <Button variant="success" size="lg">
            <PlayCircle size={50} />
          </Button>
        </div>
      </Navbar>

      {/* Progress Bar at the Bottom */}
      <div className="progress-bar-container">
        <ProgressBar now={60} />
      </div>
    </div>
  );
};

export default CustomNavbar;
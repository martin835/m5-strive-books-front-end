import React, { Component } from "react";
import { Container, Navbar, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [lgShow, setLgShow] = useState(false);
  const [authors, setAuthors] = useState([]);

  useEffect(() => fetchAuthorsData(), []);

  const fetchAuthorsData = async () => {
    const apiUrl = process.env.REACT_APP_BE_URL;

    try {
      let response = await fetch(`${apiUrl}/authors`);
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setAuthors(data);
      } else {
        alert("something went wrong :(");
        /*   this.setState({
           isLoading: false,
          isError: true,
        }); */
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="blog-navbar" fixed="top">
        <Container className="justify-content-between">
          <Navbar.Brand as={Link} to="/">
            <img className="blog-navbar-brand" alt="logo" src={logo} />
          </Navbar.Brand>
          <Button onClick={() => setLgShow(true)}>See All Authors</Button>
          <Button
            as={Link}
            to="/new"
            className="blog-navbar-add-button bg-dark"
            size="lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
            Post Article
          </Button>
        </Container>
      </Navbar>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {authors.map((author) => (
            <p>
              {author.name} {author.surname}{" "}
            </p>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;

/* export default class NavBar extends Component {
  render() {
    return (
      <Navbar expand="lg" className="blog-navbar" fixed="top">
        <Container className="justify-content-between">
          <Navbar.Brand as={Link} to="/">
            <img className="blog-navbar-brand" alt="logo" src={logo} />
          </Navbar.Brand>

          <Button
            as={Link}
            to="/new"
            className="blog-navbar-add-button bg-dark"
            size="lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
            Post Article
          </Button>
        </Container>
      </Navbar>
    );
  }
} */

import React, { Component } from "react";
import { Container, Navbar, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [lgShow, setLgShow] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [addAuthorForm, setAddAuthorForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    surname: "",
    email: "",
    avatar: "",
    dateOfBirth: "",
  });

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

  const addNewAuthor = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:3001/authors", {
        method: "POST",
        body: JSON.stringify(newAuthor),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response);
        alert("author posted!");
        setNewAuthor({
          name: "",
          surname: "",
          email: "",
          avatar: "",
          dateOfBirth: "",
        });
      } else {
        // what type of error will fall here?
        // here it means you connected to the server, but something went wrong!
        alert("something went wrong! please try again");
        // just some examples...
        if (response.status === 400) {
          alert("some data was wrong");
        }
        if (response.status === 400) {
          alert("not found");
        }
      }
    } catch (error) {
      // what type of error will fall here?
      // you probably have some internet problems :(
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
          {addAuthorForm ? (
            <Form onSubmit={(e) => addNewAuthor(e)} className="mt-5">
              <Form.Group
                controlId="
              author-name"
                className="mt-3"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  size="lg"
                  placeholder="Name"
                  value={newAuthor.name}
                  onChange={(e) =>
                    setNewAuthor({
                      ...newAuthor,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group
                controlId="
              author-surname"
                className="mt-3"
              >
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  size="lg"
                  placeholder="Surname"
                  value={newAuthor.surname}
                  onChange={(e) =>
                    setNewAuthor({
                      ...newAuthor,
                      surname: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group
                controlId="
              author-email"
                className="mt-3"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  size="lg"
                  type="email"
                  placeholder="Email"
                  value={newAuthor.email}
                  onChange={(e) =>
                    setNewAuthor({
                      ...newAuthor,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group
                controlId="
              author-birthday"
                className="mt-3"
              >
                <Form.Label>Date of birth</Form.Label>
                <Form.Control
                  size="lg"
                  type="datetime-local"
                  placeholder="date-of-birth"
                  value={newAuthor.dateOfBirth}
                  onChange={(e) =>
                    setNewAuthor({
                      ...newAuthor,
                      dateOfBirth: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group
                controlId="
              author-email"
                className="mt-3"
              >
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  size="lg"
                  placeholder="URL"
                  value={newAuthor.avatar}
                  onChange={(e) =>
                    setNewAuthor({
                      ...newAuthor,
                      avatar: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="d-flex mt-3 justify-content-end">
                <Button type="reset" size="lg" variant="outline-dark">
                  Reset
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  variant="dark"
                  style={{ marginLeft: "1em" }}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          ) : (
            authors.map((author) => (
              <p>
                {author.name} {author.surname}{" "}
              </p>
            ))
          )}
          <Button onClick={() => setAddAuthorForm(!addAuthorForm)}>
            Add New Author
          </Button>
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

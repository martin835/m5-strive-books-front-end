import React, { Component } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Blog = () => {
  const [article, setArticle] = useState({});

  const params = useParams();
  const apiUrl = process.env.REACT_APP_BE_URL;
  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    console.log(params.id);
    const apiUrl = process.env.REACT_APP_BE_URL;

    try {
      let response = await fetch(`${apiUrl}/articles/${params.id}`);
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setArticle(data);
      } else {
        alert("something went wrong :(");
        this.setState({
          isError: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* const downloadPDF = async () => {
    const apiUrl = process.env.REACT_APP_BE_URL;
    navigate(`${apiUrl}/files/${params.id}/downloadPdf`);
  }; */

  return (
    <div className="blog-details-root">
      <Container>
        <Image className="blog-details-cover" src={article.cover} fluid />
        <h1 className="blog-details-title">{article.title}</h1>

        <div className="blog-details-container">
          <div className="blog-details-author">
            <BlogAuthor {...article.author} />
          </div>
          <div className="blog-details-info">
            <div>{article.createdAt}</div>
            {/* <div>{`${article.readTime.value} ${article.readTime.unit} read`}</div> */}
            <div style={{ marginTop: 20 }}>
              <BlogLike defaultLikes={["123"]} onChange={console.log} />
            </div>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
        <Link
          to={{
            pathname: `${apiUrl}/files/${params.id}/downloadPdf`,
          }}
          target="_blank"
        >
          <Button>Download as PDF</Button>
        </Link>
      </Container>
    </div>
  );
};

export default Blog;

/* class Blog extends Component {
  state = {
    blog: {},
    loading: true,
  };
   componentDidMount() {
    const { id } = this.props.match.params;
    console.log(posts);
    const blog = posts.find((post) => post._id.toString() === id);
    if (blog) {
      this.setState({ blog, loading: false });
    } else {
      this.props.history.push("/404");
    }
  }

  render() {
    const { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
                <div style={{ marginTop: 20 }}>
                  <BlogLike defaultLikes={["123"]} onChange={console.log} />
                </div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </Container>
        </div>
      );
    }
  }
} */

/* export default withRouter(Blog); */

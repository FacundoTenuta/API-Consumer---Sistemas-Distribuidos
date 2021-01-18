import React, { Component } from "react";
import PostsService from "../services/postsService";
import { Link } from "react-router-dom";

export default class PostsList extends Component {
  constructor(props) {
    super(props);
    this.retrievePosts = this.retrievePosts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePost = this.setActivePost.bind(this);

    this.state = {
      posts: [],
      currentPost: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }


  retrievePosts() {
    PostsService.getAll()
      .then(response => {
        this.setState({
          posts: response.data.data
        });
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePosts();
    this.setState({
      currentPost: null,
      currentIndex: -1
    });
  }

  setActivePost(post, index) {
    this.setState({
      currentPost: post,
      currentIndex: index
    });
  }

  render() {
    const { posts, currentPost, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Posts List</h4>

          <ul className="list-group">
            {posts &&
              posts.map((post, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => {this.setActivePost(post, index)}}
                  key={index}
                >
                  {post.title}
                </li>
              ))}
          </ul>

        </div>
        <div className="col-md-6">
          {currentPost ? (
            <div>
              <h4>Post</h4>
              <div>
                <label>
                  <strong>Titulo:</strong>
                </label>{" "}
                {currentPost.title}
              </div>
              <div>
                <label>
                  <strong>Descripción:</strong>
                </label>{" "}
                {currentPost.description}
              </div>

              <Link
                to={"/posts/" + currentPost.post_id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Seleccione un Post...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
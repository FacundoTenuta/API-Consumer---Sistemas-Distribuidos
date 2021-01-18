import React, { Component } from "react";
import PostsService from "../services/postsService";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getPost = this.getPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);

    this.state = {
      currentPost: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPost(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPost: {
          ...prevState.currentPost,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentPost: {
        ...prevState.currentPost,
        description: description
      }
    }));
  }

  getPost(id) {
    PostsService.get(id)
      .then(response => {
        this.setState({
          currentPost: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePost() {
    PostsService.update(
      this.state.currentPost.post_id,
      this.state.currentPost
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "El Post se actualizo correctamente"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePost() {    
    PostsService.delete(this.state.currentPost.post_id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Posts')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPost } = this.state;

    return (
      <div>
        {currentPost ? (
          <div className="edit-form">
            <h4>Post</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPost.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPost.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePost}
            >
              Eliminar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePost}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Seleccione un Post...</p>
          </div>
        )}
      </div>
    );
  }
}
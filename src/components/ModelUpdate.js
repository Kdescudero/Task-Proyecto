import React, {Component, Fragment} from 'react';
class ModelUpdate extends Component {

  state = {
    id: null,
    title: null,
    description: null,
  };

  componentWillReceiveProps(props) {
    if(props.task)
      this.setState({
        ...props.task,
      });
  }

  update(){
    const url = "http://localhost/symfony-api/public/index.php/api/Update";
    const {title, description, id} = this.state;
    const {onUpdate} = this.props;

    const data = [
      {
        "Id": id,
        "title": title,
        "description": description,
      }
    ];

    fetch(url,{
      method: 'POST',
      body:JSON.stringify({data:data})
    })
      .then((response) =>{
         return response.json();
      })
      .then((response) =>{
        document.getElementById("btn-close-modal").click();
        onUpdate({
          id, title, description,
        });
        // if(response.guardado){
        //   //Todo
        // }
      })
  }

  componentDidMount(){
    // const {tasks} = this.props;
    //
    // this.setState({
    //   title : tasks.title,
    //   description : tasks.description,
    //   id : tasks.id,
    // });
  }

  handleInputChange(e, propName) {
    const {value} = e.target;
    // this.props[propName] = value;
    this.setState({
      [propName]: value
    });
  }

  render() {
    const {title, description, id} = this.state;
    const {idModal} = this.props;
    return (
      <Fragment>

        <div className="modal fade" id={idModal} tabIndex="-1" role="dialog" aria-labelledby="myModal"
             aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="myModal">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">Titulo</label>

                    <input
                      required
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      value={title||""}
                      onChange={(e) => this.handleInputChange(e, "title")} />


                  </div>

                  <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label">Descripcion</label>

                    <textarea
                      className="form-control"
                      id="message-text"
                    value={description||""}
                      onChange={(e) => this.handleInputChange(e, "description")}>
                    </textarea>
                  </div>

                </form>
              </div>

              <div className="modal-footer">
                <button id="btn-close-modal" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={() => this.update()}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ModelUpdate;
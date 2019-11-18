import React, { Component } from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getDocument, newDocument } from '../../actions/DocumentAction'
import axios from 'axios'

class NewDocument extends Component {        
        state = {
            _id:"",
            name: "",
            coment:"",
            document_user: "",
            editing:false
        }
   
    static propTypes = {
        getDocument: PropTypes.func.isRequired,
        newDocument: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }
async componentDidMount(){
  if(this.props.match.params.id){
   const res = await axios.get(`/document/${this.props.match.params.id}`)
   this.setState({
editing:true,
_id:this.props.match.params.id,
name:res.data.name,
coment:res.data.coment,
document_user:res.data.document_user
   })
   console.log(res.data);
   
}
}

    OnChange = e => {
        
        
        this.setState({ [e.target.name]: e.target.value, });
        const { user } = this.props.auth
        user ? this.setState({document_user:user._id}) : this.setState({document_user:""})

    };

    OnSubmit = (e) => {
        e.preventDefault();
        
        const { name,coment,document_user} = this.state;        
        const newDoc = { name,coment, document_user };
        this.props.newDocument(newDoc);
        this.props.getDocument();
    
    }

    render() {
        return (
            
            <Form onSubmit={this.OnSubmit}>
             <FormGroup>
              <Input
                  type="text" 
                  id="name"
                  className=" form-control"
                  placeholder="Nombre del documento"
                  name="name"
                  onChange={this.OnChange}
                  value={this.state.name}
                  required
              />
              <Input
                  type="text" 
                  id="coment"
                  className=" form-control"
                  placeholder="Comentario sobre el documento"
                  name="coment"
                  onChange={this.OnChange}
                  value={this.state.coment}
                  required
              />

              <Button type="submit"> Crear </Button>
              </FormGroup>
            </Form>
           
        )
    }
}

NewDocument.propTypes = {
    newDocument: PropTypes.func.isRequired,
    getDocument: PropTypes.func.isRequired,
    doc: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    doc: state.doc,
    auth: state.auth
})

export default connect(mapStateToProps, {newDocument,getDocument})(NewDocument)
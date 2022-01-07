import React, { Component }  from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody,Col,Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Button from 'reactstrap/lib/Button';



    function RenderCampsite({campsite}) {
        return (
            <div className='col-md-5 m-1'>
                <Card>
                     <CardImg top src={campsite.image} alt={campsite.name} />
                     <CardBody>
                         <CardText>{campsite.description}</CardText>
                     </CardBody>
                 </Card>
            </div>);
        
    }

   function RenderComments({comments, addComment, campsiteId}) {
        if(comments){
        return (
        <div className='col-md-5 m-1'>
            <h4>Comments</h4>
            {comments.map(e => {
                return(
                    <div key={e.id}>
                        {e.text} <br/>
                        {e.author} <br/>
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(e.date)))}
                        <br/> <hr/>
                    </div>
                );
            })}
             <div className='row ml-3'>
             <CommentForm campsiteId={campsiteId} addComment={addComment} />
                 <br/>
                 <hr/>
            </div>
        </div>);
        }
        return <div/>;
    }


    const required = val => val && val.length;
    const maxLength = len => val => !val || (val.length <= len);
    const minLength = len => val => val && (val.length >= len);

    class CommentForm extends Component {
        
        constructor(props) {
            super(props);
    
            this.state = {
                isModalOpen: false,
                rating: '',
                author: "",
                text: ''
            };
            
           

        }

        toggleModal=()=>{
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit = values => {
            this.toggleModal();
            this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
            // console.log('Current state is: ' + JSON.stringify(values));
            // alert('Current state is: ' + JSON.stringify(values));
            //event.preventDefault();
        }

        render(){
            return(
                <>
               <Button outline className="fa-lg" onClick={this.toggleModal}> <i className='fa fa-pencil'> Submit Comment</i></Button>
               <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="ratings" md={2}>Ratings</Label>
                                <Col md={12}>
                                <Control.select model=".rating" id="rating" name='rating' style={{width: "100%"}}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={4}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="text" md={2}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".text" id="text" name="text"
                                        rows="6"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
            </Modal>
            </>
            )
        }
    }
 
    function CampsiteInfo(props){
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        if (props.campsite) {
            return (
               <div className='container'>
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr/>
                        </div>
                    </div>
                    <div className='row'>
                        <RenderCampsite campsite={props.campsite}/>
                        <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                    </div>
                    
                </div> 
            );
        }
        return <div />;
    }

export default CampsiteInfo;
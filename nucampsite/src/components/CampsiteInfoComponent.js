import React  from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


    function RenderCampsite({campsite}) {
            return (
            <div className='col-md-5 m-1'>
                <Card>
                     <CardImg top src={campsite.image} alt={campsite.name} />
                     <CardBody>
                         <CardTitle>{campsite.name}</CardTitle>
                         <CardText>{campsite.description}</CardText>
                     </CardBody>
                 </Card>
            </div>);
    }

   function RenderComments({comment}) {
        if(comment){
        return (
        <div className='col-md-5 m-1'>
            <h4>Comments</h4>
            {comment.map(e => {
                return(
                    <div key={e.id}>
                        {e.text} <br/>
                        {e.author} <br/>
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(e.date)))}
                        <br/> <hr/>
                    </div>
                );
            })}
        </div>);
        }
        return <div/>;
    }


    function CampsiteInfo(props){
        if (props.campsite) {
            return (
               <div className='container'>
                    <div className='row'>
                        <RenderCampsite campsite={props.campsite}/>
                        <RenderComments comments={props.campsite.comments}/>
                    </div>
                </div> 
            );
        }
        return <div />;
    }

export default CampsiteInfo;
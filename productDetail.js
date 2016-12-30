import React from 'react';
import _ from 'lodash';
import request from 'superagent' ;
import { Link } from 'react-router';
import './App.css';

  var Specification = React.createClass({
	  
      render: function(){
		  
		  		  console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH:" + this.props.product.id);
	  
          var product = this.props.product;
		  
		  		  console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJ:" + product);
          			
          var display = (
	
              <div>
			  <Link to={'/'}> Home </Link>
			  
			  	 <h1>{this.props.product.name} Details</h1>
			  
			  <br>
			  </br>
			  <br>
			  </br>
			  
                 <ul className="specs">
                  
				  <li>
                    <dl>
                      <dt>Official Product Name</dt>
                         {product.name}
                    </dl>
                  </li>
				  
				  <li>
                    <dl>
                      <dt>Release Year</dt>
                         {product.ReleaseYear}
                    </dl>
                  </li>

				  <li>
                    <dl>
                      <dt>Version</dt>
                         {product.Version}
                    </dl>
                  </li>
				  <br></br>
				  
				  <li>
                    <dl>
                      <dt>RAM</dt>
                         {product.RAM}
                    </dl>
                  </li>
				  
				  <li>
                    <dl>
                      <dt>Manufacturer</dt>
                         {product.Manufacturer}
                    </dl>
                  </li>
				  
				  <li>
                    <dl>
                      <dt>Weight</dt>
                         {product.Weight}
                    </dl>
                  </li>
				  
                  </ul> 

					<br>
					</br>
            </div>
           )
            return (
			
                 <div>
                  {display}
              </div>
			  
             );
      }
  });
  
  	var Form = React.createClass({

       getInitialState: function() {
           return { query: '', subject: ''};
        },
		
		handleSubjectChange: function(e) {
           this.setState({subject: e.target.value});
       },
		
       handleQueryChange: function(e) {
           this.setState({query: e.target.value});
       },
	   
	    handleSubmit: function(e) {
        e.preventDefault();
	    var subject = this.state.subject.trim();
        var query = this.state.query.trim();
        if (!query ) {
          return;
        }
        this.props.addHandler(subject,query);
        this.setState({subject: '', query: ''});
       }, 
		
        render : function() {
			
           return (
		   
             <form style={{marginTop: '30px'}}>
			  
                <h3>Leave a Comment about the item for sale:</h3>
				
                <div className="form-group">
				
				<input type="text" className="form-control" placeholder="Subject Of The Comment" value={this.state.subject} onChange={this.handleSubjectChange}>
				  
				  </input>
                
				</div>
				
                <div className="form-group">
				
                  <input type="text" className="form-control" placeholder="The Comment Itself" value={this.state.query} onChange={this.handleQueryChange}>
				  
				  </input>
				  
                </div>
				
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit Comment</button>
				<br>
				</br>
				<br>
				</br>
				<br>
				</br>
				<br>
				</br>
				<br>
				</br>
				<br>
				</br>
				
              </form>
			  
            );
			
          }
		  
       });	   
	   
    var Comment = React.createClass({
		
			getInitialState : function() {
               return {
                status : '',
				subject: this.props.comment.subject,
                query: this.props.comment.addess,
               } ;
            },
			
		handleVote : function() {
          this.props.upvoteHandler(this.props.product.id);
        },
		
        render : function() {
			
            var lineStyle = {
                 fontSize: '20px', marginLeft: '10px'  };
            var cursor = { cursor: 'pointer' } ;

			var line ;
			
               line = <span>

			   <li>
			   <dl>
			   <dt>Comment Regarding {this.props.comment.subject}</dt>
			   {this.props.comment.query}
			   </dl>
			   </li>
			   <br></br>

			   </span>;
			   
            return (
              <div >
   
                <span style={lineStyle}> {line} <span>
				
                  </span>
                </span>
              </div>  
        );
        }
       }) ;
		
	var CommentList = React.createClass({
    render : function() {
      var items = this.props.comments.map(function(comment,index) {
             return <Comment key={index} comment={comment} 
                      addHandler={this.props.addHandler}  /> ;
         }.bind(this) )
      return (
            <div>
              {items}
            </div>
        );
    }
}) ;

    var ImagesSection = React.createClass({
		
      render: function(){
		  
		  var product = this.props.product;
		  
		  console.log("DDDDDDDDDDDDDDDDDDDDDD:" + product);
            var thumbImages = product.images.map(function(img,index) {
				
              return (
                  <li>
				  <br>
				  </br>
				  <br>
				  </br>
                   <img key={index} src={"/productSpecs/" + img} alt="missing" />
				  <br>
				  </br>	
				  <br>
				  </br>
                  </li>
                );
                });
				
              return (
			  
                  <div>
			  	 <p><b>Photos Of {this.props.product.name}:</b></p>
				 <br></br>
                   <ul className="product-thumbs">
                       {thumbImages}
                   </ul>
                  </div>
                  );
          }
    }) ;
	
    var ProductDetail = React.createClass({
		
	getInitialState: function() {
           return { product: null };
       },
		
    componentDidMount : function() {
       request.get('http://localhost:4000/api/products/' + this.props.params.productId )
          .end(function(error, res){
            if (res) {
              var json = JSON.parse(res.text);
              localStorage.clear();
              localStorage.setItem('product', JSON.stringify(json)) ;
              this.setState( {}) ;                
            } else {
              console.log(error );
            }
          }.bind(this)); 
      }, 
	
    addComment : function(s,q) {
        request
           .post('http://localhost:4000/api/products/' + 
                      this.props.params.productId    + '/comments' )
           .send({ subject: s, query: q })
           .set('Content-Type', 'application/json')
           .end(function(err, res){
             if (err || !res.ok) {
               alert('Error adding');
             } else {
                var json = JSON.parse(res.text);
                localStorage.clear();
                localStorage.setItem('product', JSON.stringify(json)) ;
                this.setState( {}) ;                
             }
           }.bind(this)); 
  }, 

      render: function(){	  
			   
			var display;

			var product = localStorage.getItem('product') ?
            JSON.parse(localStorage.getItem('product')) : 
               { name: '', description: '', ReleaseYear: '', Version: '', RAM: '', Manufacturer: '', Weight: '', comments: [], images : [] } ;
			   
		var comments = _.sortBy(product.comments, function(comment) {
			 
         return - comment;
             }
          );
			
				display = 
				(
                <div>
				   <Specification product={product} />
				   <ImagesSection product={product} />  
                </div>	
                );
			 
            return (
			
                <div>
				{display}

				<CommentList comments={comments} />
				<Form addHandler={this.addComment}  />

			   
            </div>
            );
      }
    });

    export default ProductDetail;
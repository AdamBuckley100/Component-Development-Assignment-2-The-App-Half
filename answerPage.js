    import React from 'react';
    import _ from 'lodash';
    import api from './stubAPIQuestions/stubAPI';
	import { Link } from 'react-router'; 

    var Form = React.createClass({
		
       getInitialState: function() {
           return { answer: '', name: ''};
        },
		
        handleAnswerChange: function(e) {
             this.setState({answer : e.target.value});
         },
		 
         handleNameChange: function(e) {
             this.setState({name: e.target.value});
         },
		 
         onSubmit : function(e) {
              e.preventDefault();
              var answer = this.state.answer.trim();
              var name = this.state.name.trim();
              if (!answer ) {
                  return;
              }
              this.props.answerHandler(answer,name);
              this.setState({answer: '', name: ''});
         },
		 
        render : function() {
             return (
               <form  style={{marginTop: '30px'}}>
                <h3>Add a new answer</h3>

                <div className="form-group">
                  <input type="text"  className="form-control"
                        placeholder="Answer" value={this.state.answer}
                        onChange={this.handleAnswerChange} ></input>
                </div>     
                <div className="form-group">
                  <input type="text"  className="form-control"
                        placeholder="Your name" value={this.state.name}
                        onChange={this.handleNameChange} ></input>
                </div>
                <button type="submit" className="btn btn-primary"
                        onClick={this.onSubmit}>Submit</button>
              </form>
              );
          }
       });

    var Answer = React.createClass({
		
        handleVote : function() {
             this.props.upvoteHandler(this.props.answer.id);
        },
		
        render : function() {
            var lineStyle = {
                 fontSize: '20px', marginLeft: '10px'  };
            return (
               <div>
                  <span className="glyphicon glyphicon-thumbs-up"
                        onClick={this.handleVote}></span>
                    {this.props.answer.upvotes} - by {this.props.answer.author}
                  <span style={lineStyle} >
                    {this.props.answer.answer}
                  </span>
                </div>                
               );
          }
     }) ;

    var AnswerList = React.createClass({
		
        render : function() {
			
          var items = this.props.answers.map(function(answer,index) {
			  
                 return <Answer key={index} answer={answer} upvoteHandler={this.props.upvoteHandler}  /> ;
						  
             }.bind(this) )
			 
          return (
		  
                <div>
				
                  {items}
				  
                </div>
            );
        }
    }) ;  

    var AnswerView = React.createClass({
		
        addAnswer : function(answer,nameOfAnswerer) {
			
          var aQuestionsId = parseInt(this.props.params.questionId, 10);

          api.addAnswer(aQuestionsId,answer,nameOfAnswerer);
		  
          this.setState({});
		  
      }, 
	  
      incrementUpvote : function(answerId) {
		  
           var aQuestionsId = parseInt(this.props.params.questionId, 10);

           api.upvoteAnswer(aQuestionsId, answerId) ;
			
           this.setState({});
      },    
	  
      render: function(){
		  
           var aQuestionsId = parseInt(this.props.params.questionId,10);
		   
           var question = api.getQuestion(aQuestionsId);
		   
           var line = null ;
		     
			line =
			
			<span>
			<Link to={'/'}> Home </Link>
			
			<br></br>
			<br></br>
			
			Answer The Question about: {question.subject}.
			<br></br>
			<br></br>
			The Question Is: {question.query}

			</span>
			
          var answers = _.sortBy(question.answers, function(answer) {
                                 return - answer.upvotes;
                            }
                    ); 
					
          return (  
		  
             <div>
			 
               <h3>{line}</h3> 
			   
               <AnswerList answers={answers} upvoteHandler={this.incrementUpvote} />
			   
               <Form question={question} answerHandler={this.addAnswer} /> 
			   
             </div> 
			 
          );
		  
      }
	  
    });

    export default AnswerView;
import _ from 'lodash';

var questions = [
		  { 
			id: 1,
			subject : 'Display',
			query : 'What are the screen dimensions?',			
			username : 'jmurphy',  
			answers : [],
			upvotes: 10
		  }
	  ] ;

 var stubAPI = {
	 
	 getAll : function() {
		return questions ;
	  },
	  
	 add : function(s,q) {
		  var id = 1 ;
		  var last = _.last(questions) ;
		  if (last) {
			 id = last.id + 1 ;
		  }
		  var len = questions.length ;
		  var newL_len = questions.push({ 
			  'id': id,  
			 subject: s, query : q, username: '', answers: [], upvotes: 0 }) ;
		   return newL_len > len ;
		  },
		  
	 upvote : function(id) {
		 var index = _.findIndex(questions, 
			   function(question) {
				return question.id === id;
			  } );      
		 if (index != -1) {                 
			  questions[index].upvotes = questions[index].upvotes + 1 ;
			  return true ;
			}
		  return false ;
	   
	  },
	  
	  getQuestion : function(id) {
             var result = null ;
             var index = _.findIndex(questions, function(question) {
                    return question.id === id;
                    } );     
             if (index !== -1) {                 
                result = questions[index];
                    }
            return result ;
            },
			
         addAnswer : function(questionId,a,n) {
            var question = this.getQuestion(questionId) ;
            var id = 1 ;
            var last = _.last(question.answers) ;
            if (last) {
               id = last.id + 1 ;
            }
            question.answers.push({ 'id': id,  
                     answer: a , author: n, upvotes: 0 } ) ;

            },
         upvoteAnswer : function(questionId,answerId) {
			 
            var question = this.getQuestion(questionId);
			
            var index = _.findIndex(question.answers, function(a) {
                      return a.id === answerId;
                    } );      
             if (index !== -1) {                 
                 question.answers[index].upvotes += 1 ;
                }
          }
    }
export default stubAPI ;
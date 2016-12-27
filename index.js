import React from 'react';
import ReactDOM from 'react-dom';
import ProductCatalogueApp from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Router, Link, Route, IndexRoute, browserHistory } from 'react-router';
import ProductDetail from './productDetail';
import AnswerView from './answerPage';
	
    var App = React.createClass({
      render : function() {
        return (
            <div>
               <div>
                  <div>
                     <div>
                           {this.props.children}
                     </div>
                   </div>
                </div>
              </div>
        )
      }
    });
	
    ReactDOM.render( (
	
      <Router history={browserHistory} >
	  
        <Route path="/" component={App}>
           <IndexRoute component={ProductCatalogueApp}/>
           <Route path="products/:productId" component={ProductDetail} />
        </Route>
	
	        <Route path="/" component={App}>
           <IndexRoute component={ProductDetail}/>
           <Route path="questions/:questionId" component={AnswerView} />
			</Route>
	 
	 	   <Route path="/" component={App}>
           <IndexRoute component={ProductCatalogueApp}/>
           <Route path=":id" component={ProductDetail} />
			</Route>
			
      </Router>
    ),
      document.getElementById('root')
);
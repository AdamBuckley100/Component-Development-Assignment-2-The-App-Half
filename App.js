import './App.css';

import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import request from 'superagent' ; 


      var SelectBox = React.createClass({
		  
          handleChange : function(e,type,value) {
               e.preventDefault();
               this.props.onUserInput(type,value);
          },
		  
          handleTextChange : function(e) {
                this.handleChange(e, 'search', e.target.value);
          },
		  
          handleSortChange : function(e) {
              this.handleChange(e, 'sort', e.target.value);
          },
		  
          render: function(){
			  
               return (
			   
                 <div className="col-md-10">
				 
                 <input type="text" placeholder="Search" value={this.props.filterText} onChange={this.handleTextChange} />
				 
               Sort by:
			   
                   <select id="sort" value={this.props.order} onChange={this.handleSortChange}>
				   
                   <option value="name">Alphabetical (Ascending)</option>
				   
                   <option value="release-year">Oldest First (Release Date)</option>
				   
               </select>
			   
                 </div>
                );
              }
			  
           });

		   
     var Product= React.createClass({
		 
          render: function(){
			  
			  console.log("debug.... check for each product:" + this.props.oneSingleProduct.id);
			  
               return (
			   
              <li className="thumbnail product-listing">
			  
                <Link to={'/products/' + this.props.oneSingleProduct.id} className="thumb-main-page">
				                   <ul className="product-thumbs-main-page">
								   
								   
				<img src={"/productSpecs/img/images/images/products/" + this.props.oneSingleProduct.imageUrl}
				alt={this.props.oneSingleProduct.name} /> </ul> </Link>
					 
                <Link to={'/products/' + this.props.oneSingleProduct.id}>{this.props.oneSingleProduct.name}</Link>
				
                <p>{this.props.oneSingleProduct.snippet}</p>
				
              </li>
                ) ;
             }
			 
         }) ;

		 
   var FilteredProductList = React.createClass({
	   
        render: function(){
			
            var displayedProducts = this.props.products.map(function(product) {
				
              return <Product key={product.id} oneSingleProduct={product} /> ;
			  
            }) ;
			
            return (
			
                    <div className="col-md-10">
					
                      <ul className="products">
					  
                          {displayedProducts}
						  
                      </ul>
					  
                    </div>
					
              ) ;
        }
    });

	
var ProductCatalogueApp = React.createClass({
	
    componentDidMount : function() {
       request.get('http://localhost:4000/api/products')
          .end(function(error, res){
            if (res) {
              var json = JSON.parse(res.text);
              localStorage.clear();
              localStorage.setItem('products', JSON.stringify(json)) ;
              this.setState( {}) ;                
            } else {
              console.log(error );
            }
          }.bind(this)); 
    },  

     getInitialState: function() {
		 console.log("TESTING!!!!");
           return { search: '', sort: 'name' } ;
      }, 
	  
     handleChange : function(type,value) {
            if ( type === 'search' ) {
                this.setState( { search: value } ) ;
              } else {
                 this.setState( { sort: value } ) ;
              }
      }, 
	  
	        addproduct : function(n,a,p) {
        var that = this;
        request
           .post('http://localhost:4000/api/products')
           .send({ name: n, address: a, phone_number: p })
           .set('Content-Type', 'application/json')
           .end(function(err, res){
             if (err || !res.ok) {
               alert('Error adding');
             } else {
                request.get('http://localhost:4000/api/products')
                  .end(function(error, res){
                    if (res) {
                      var json = JSON.parse(res.text);
                      localStorage.clear();
                      localStorage.setItem('products', JSON.stringify(json)) ;
                      that.setState({}) ;                
                    } else {
                      console.log(error );
                    }
                   }); 
             }  // end else
            }); 
      },
		  
      updateproduct : function(key,n,a,p) {
        var that = this;
        request
           .put('http://localhost:4000/api/products/' + key )
           .send({ name: n, address: a, phone_number:p })
           .set('Content-Type', 'application/json')
           .end(function(err, res){
             if (err || !res.ok) {
               alert('Error updating');
             } else {
                request.get('http://localhost:4000/api/products')
                  .end(function(error, res){
                    if (res) {
                      var json = JSON.parse(res.text);
                      localStorage.clear();
                      localStorage.setItem('products', JSON.stringify(json)) ;
                      that.setState( {}) ;                
                    } else {
                      console.log(error );
                    }
                  }); 
             }
           });            
      },
	  
       render: function(){
		   
		      var Products = localStorage.getItem('products') ?
              JSON.parse(localStorage.getItem('products')) : [] ;
		   
           var list = Products.filter(function(p) {
			   
                  return p.name.toLowerCase().search(this.state.search.toLowerCase()) !== -1;
						 
                    }.bind(this));
					
           var filteredList = _.sortBy(list, this.state.sort) ;
		   
           return (
		   
              <div className="view-container">
			  
              <div className="view-frame">
			  
                 <div className="container-fluid">
				 
                   <div className="row">
				   
				   			   <h1> <strong> Products For Sale </strong> </h1>  
							   
                      <SelectBox onUserInput={this.handleChange} filterText={this.state.search} sort={this.state.sort} />
							 
                      <FilteredProductList products={filteredList} />
					   
                  </div> 
				  
                  </div>        
				  
                </div>
				
              </div>
			  
          );
        }
});


export default ProductCatalogueApp;
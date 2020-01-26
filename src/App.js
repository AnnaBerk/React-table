
import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import Loader from './Loader/Loader';
import Table from './Table';
import DetailRowView from './DetailRowView';
import TableSearch from './TableSearch';
import ModeSelector from './ModeSelector';


class App extends Component {
  state ={
     isModeSelected: false,
     isLoading: false,
     data: [],
     search: '',
     sort: 'asc',  // 'desc'
     sortField: 'id', 
     row: null,
     activePage: 1,
   }

   async fetchData(url) {

    new Promise((success, fail) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
  
      request.addEventListener('load', () => {
        request.status >= 200 && request.status < 400
          ? success(request.responseText)
          : fail(new Error(`Request Failed: ${request.statusText}`));
      });
  
      request.addEventListener('error', () => {
        fail(new Error('Network Error'));
      });
  
      request.send();
    });

   
    const response = await fetch(url)
    const data = await response.json()
  
     this.setState({
      isLoading: false,
      data
    })
  }
  onSort = sortField => {
    
    const cloneData = this.state.data.concat();
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
    let direction = sortType=== 'asc' ? 1 : -1;
    const orderedData = cloneData.sort((a, b) => {
      if (a[sortField] === b[sortField]) { return 0; }
      return a[sortField] > b[sortField] ? direction : direction * -1;
    });

    this.setState({
      data: orderedData,
      sort: sortType,
      sortField
    })
  }

  modeSelectHandler = url => {
   
    this.setState({
      isModeSelected: true,
      isLoading: true,
    })
    this.fetchData(url)
  }

  onRowSelect = row => (
    this.setState({row})
  )
  
  handlePageChange = pageNumber=> {
    
    this.setState({activePage:pageNumber });
  }

 searchHandler = search => {
    this.setState({search, activePage: 1})
  }

  getFilteredData(){
    const {data, search} = this.state

    if (!search) {
      return data
    }
   var result = data.filter(item => {
     return (
       item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
       item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
       item["email"].toLowerCase().includes(search.toLowerCase())
     );
   });
  
    return result
  }


  render() {
    const pageSize = 50;
    
    if(!this.state.isModeSelected){
      return (
        <div className="container">
          <ModeSelector onSelect={this.modeSelectHandler}/>
        </div>
      )
    }
   
    const filteredData = this.getFilteredData();
    const activePage = this.state.activePage;
    const indexOfLastData = activePage * pageSize;
   const displayData = filteredData.slice((indexOfLastData  - pageSize), indexOfLastData);

     
    
    return (
      <div className="">
          {
        this.state.isLoading 
        ? <Loader />
        :
       <React.Fragment>
       <TableSearch onSearch={this.searchHandler}/>
        <Table 
        data={displayData}
        onSort={this.onSort}
        sort={this.state.sort}
        sortField={this.state.sortField}
        onRowSelect={this.onRowSelect}
        />
        </React.Fragment>
      }

{
        this.state.data.length > pageSize
        ?<nav aria-label="Search results pages"><Pagination
        activePage={this.state.activePage}
        itemsCountPerPage={50}
        totalItemsCount={filteredData.length}
        pageRangeDisplayed={5}
        itemsCountPerPage={50}
        onChange={this.handlePageChange}
        itemClass="page-item"
        innerClass={'pagination'}
        linkClass="page-link"
      /></nav> : null
      }

      {
        this.state.row ? <DetailRowView person={this.state.row} /> : null
      }
      </div>
    );
  }
}

export default App;
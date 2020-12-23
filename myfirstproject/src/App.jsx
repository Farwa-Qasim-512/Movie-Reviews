//import React from 'react';
import React from 'react';
import './App.style.css';
import unirest from 'unirest';
import Search from "./components/Search/Search";
import Movie from "./components/Movie/Movie";
//import Movie from "./components/Movie/Movie";

class App extends React.Component {
  state = {
    movies: []
  }

 sendRequest = (title) => {
   const req = unirest("GET", "https://movie-database-imdb-alternative.p.rapidapi.com/");

   req.query({
     "page": "1",
     "r": "json",
     "s": title
   });

   req.headers({
     "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
     "x-rapidapi-key": "d18c64c290msh3678c66d9c22945p198292jsnc8382af2a0a3"
   });


   req.end((res) => {
    if (res.error) throw new Error(res.error);
    const movies = res.body.Search;
    this.setState({movies});
  });
 }

 render() {
  {
    this.state.movies.map((movie) => {
      return <Movie {...movie}/>
    })}
   return (
     <div className="App">
       <header className="App-header">
       <Search handleSendRequest={this.sendRequest}/>
       </header>
     </div>
   );
 }
}

export default App;
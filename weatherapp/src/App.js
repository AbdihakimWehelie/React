import './App.css';
import SearchBar from './components/SearchBar.js';

function App() {




  return (
    <div className="ui container"
    style={
      {backgroundColor:'#26c6da',
        borderRadius: '25px',
        fontSize: '28px',
        textTransform:'capitalize'

    }}>
    <SearchBar/>
    </div>
	)

}

export default App;


//TODO: Find out how many components I neeed
	//What each component will do
	//What tasks does the app need to preform (Display weather based on input)
	//How do I display the results
	//Figure out if a separate component is needed for CSS

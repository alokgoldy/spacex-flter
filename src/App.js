import { useState, useEffect } from "react";
import "./App.css";
import Feed from "./Components/Feed";
import Sidebar from "./Components/Sidebar";
import axios from "axios";

function App() {
  const API_URL = "https://api.spacexdata.com/v3/launches?limit=100";
  const [data, setData] = useState([]);
  const [yearFilter, setYearFilter] = useState(null);
  const [launchSuccessFilter, setLaunchSuccessFilter] = useState(null);
  const [landSuccessFilter, setLandSuccessFilter] = useState(null);

  const fetchData = async () => {
    await axios.get(API_URL)
    .then((response) => {
      setData(response.data);
    }); 
  }
  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const getAPI_URL = () => {
      let url = API_URL;
      if(yearFilter){
        url += "&launch_year=" + yearFilter;
      }
      if(launchSuccessFilter){
        url += "&launch_success=" + launchSuccessFilter;
      }
      if(landSuccessFilter){
        url += "&land_success=" + landSuccessFilter;
      }
      return url;
    }
    
    const updateData = async () => {
      let filterAPI = getAPI_URL();
      await axios.get(filterAPI)
      .then((response) => setData(response.data));
    }
    updateData();
  }, [yearFilter,launchSuccessFilter, landSuccessFilter]);

  

  

  const yearFilterHandler = (year) => {
    if (year === yearFilter) {
      setYearFilter(null);
    } else {
      setYearFilter(year);
    }
  };

  const launchFilterHandler = async (isLaunchSuccess) => {
    if (isLaunchSuccess === launchSuccessFilter) {
      setLaunchSuccessFilter(null);
    } else {
      setLaunchSuccessFilter(isLaunchSuccess);
    }
  };

  const landingFilterHandler = async (isLandSuccess) => {
    if (isLandSuccess === landSuccessFilter) {
      setLandSuccessFilter(null);
    } else {
      setLandSuccessFilter(isLandSuccess);
    }
  };


  return (
    <div className="app"> 
      <header>
        <h1>SpaceX Launch Finder</h1>
      </header>
      <div className="app__body">
        <Sidebar
          yearFilterHandler={yearFilterHandler}
          launchFilterHandler={launchFilterHandler}
          landingFilterHandler={landingFilterHandler}
        />
        <Feed data={data} />
      </div>
      <footer>
        <p>Made with ❤️ by <strong><a href="https://github.com/alokgoldy">Alok Goldy</a></strong></p>
      </footer>
    </div>
  );
}

export default App;

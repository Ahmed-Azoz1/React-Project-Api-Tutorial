import {Container} from "react-bootstrap";
import NavBar from "./components/NavBar";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import axios from "axios"
import { useEffect ,useState} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"

function App() {
  const [movies,setMovies] = useState([])

  // جلب كل الافلام باستخدام Axios
  const getAllMovies = async ()=>{
    const res = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=388eeabb27a03fd6e3a4eecc4231596b&language=ar")
    setMovies(res.data.results)
    setPageCount(res.data.total_pages)
  }
  useEffect(()=>{
    getAllMovies();
  },[])

  // تخزين عدد الصفحات كلها
  const [pageCount,setPageCount]= useState(0)
  // التحكم او التغيير فى الصفحات
  const getPage = async (page)=>{
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=388eeabb27a03fd6e3a4eecc4231596b&language=ar&page=${page}`)
    setMovies(res.data.results)
    setPageCount(res.data.total_pages)
  }
  // للبحث فى api
  const search = async(word)=>{
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=388eeabb27a03fd6e3a4eecc4231596b&query=${word}&language=ar`)
      setMovies(res.data.results)
      setPageCount(res.data.total_pages)
    }
  }

  return (
    <div className="font color-body">
      <NavBar search={search}/>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MoviesList movies={movies} getPage={getPage} pageCount={pageCount}/>}/>
            <Route path="/movie/:id" element={<MovieDetails/>}/>
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
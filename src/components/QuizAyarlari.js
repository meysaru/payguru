import {useState} from 'react';
import QuizSayfasi from "../sayfalar/QuizSayfasi";
import React from "react";
import axios from "axios";
import { MenuItem, TextField} from "@material-ui/core";
import {useEffect} from "react";
import Error from "./Error";

const QuizAyarlari=() => {
    const [questions,setQuestions] = useState([]);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [difficulty, setDifficulty] = useState("");
    //const [currentQuizStep, setCurrentQuizStep] = useState("start");
    const [error, setError] = useState(false);
    const [quizSayfasi, setQuizSayfasi] = useState(false);

    const fetchQuestions = async (category = "", difficulty = "") => {
        const { data } = await axios.get(
            `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&category=${category}&type=multiple`,
        );
        setQuestions(data.results);
    };

    const fetchCategories = async () => {
        const { data } = await axios.get(`https://opentdb.com/api_category.php`);
        setCategories(data.trivia_categories);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = () => {
        if(!category || !difficulty){
            setError("You must select category and difficulty!");
            return;
        }else{
            setError(false);
            /*fetcQuesions un bitmesini beklemeden setQuizSayfasini çağırmış oluyordun*/
            fetchQuestions(category, difficulty).then(() => {
                setQuizSayfasi(true);
            });
        }
    }
    return (
    <div>
        {quizSayfasi ?
            <QuizSayfasi
                questions = {questions}
                category = {category}
            />
            : <div className="card">
                <div>{error && <Error>{error}</Error>}</div>
            <div className='actions'>
                <div id="kategori" className="kategori">
                    <label htmlFor="">Categories</label>
                    <TextField
                        select
                        variant = "outlined"
                        onChange = {(e)=> setCategory(e.target.value)}
                        value = {category}
                        style = {{marginBottom: 10,width:"47%",backgroundColor:"lavender"}}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div id="derece" className="">
                    <label className="labelDifficulty" htmlFor=""> Difficulty </label>
                    <TextField
                        select
                        variant = "outlined"
                        style = {{marginBottom: 10,width:"47%",backgroundColor:"lavender"}}
                        onChange={(e)=>setDifficulty(e.target.value)}
                        value = {difficulty}>
                        <MenuItem key="Easy" value="easy">Easy</MenuItem>
                        <MenuItem key="Medium" value="medium">Medium</MenuItem>
                        <MenuItem key="Hard" value="hard">Hard</MenuItem>
                    </TextField>
                </div>
                <button onClick={handleSubmit} className='btn'>Continue</button>
            </div>
        </div> }
    </div>
        //{modelIsopen ? <Model/> :null}
        // <Model/>
        // <BrowserRouter>
        //  <QuizSayfasi/>
        //  <Route path="" component={} exact={} ></Route>
        //</BrowserRouter>*/

    );
}
export default QuizAyarlari;
// http://localhost:3000
/*
*
* <Link to="./components/QuizSayfasi">
                        <button onClick={handleSubmit} className='btn'>Devam</button>
                    </Link>

                   <Router>
                        <Switch>
                            <Route path="./components/QuizSayfasi">
                                <QuizSayfasi

                                />
                            </Route>
                        </Switch>
                    </Router>
*
* */
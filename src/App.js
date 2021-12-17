import QuizAyarlari from './components/QuizAyarlari';
import './App.css';
import './index.css';
import React from "react";

function App (){
    return (
        <div className="App">
            <div id = "baslik">
                <h1>Quizzz</h1>
                <QuizAyarlari/>
            </div>
        </div>
    );
}

export default App;
// http://localhost:3000
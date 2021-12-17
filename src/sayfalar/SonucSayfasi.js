import React, {useState} from "react";
import QuizAyarlari from "../components/QuizAyarlari";
import '../index.css';

const SonucSayfasi = ({score}) => {
    const [quizAyarlari,setQuizAyarlari] = useState(false);
    const  handleBack = () => {
        setQuizAyarlari(true)
    }
    return (
        <div>
            {quizAyarlari ?
                <QuizAyarlari />
            :
                <div >
                    <div className="card">
                        <h3>SCORE: {score} / 10</h3>
                    </div>

                    <div>
                        <button className="sonraki" onClick={handleBack}>New Quiz</button>
                    </div>

                </div>
            }
        </div>
    );
}
export default SonucSayfasi;

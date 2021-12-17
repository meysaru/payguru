import React, {useEffect, useState} from 'react';
import SonucSayfasi from "../sayfalar/SonucSayfasi";
import './QuizSayfasi.css';
import Error from "../components/Error";

const QuizSayfasi=({questions}) =>{
    //state yapıları
    const [selected, setSelected] = useState();
    const [answers,setAnswers] = useState();
    const [currQues, setCurrQues] = useState(0);
    const [sonucSayfasi,setSonucSayfasi] = useState(false);
    const [score, setScore] = useState(0);
    const [error,setError] = useState(false);

    useEffect(() => {
        setAnswers(
            //Eğer questions true ise cevapları handleShuffle fonksiyonuna yolla
            questions &&
            handleShuffle( [questions[currQues]?.correct_answer,
                ...questions[currQues]?.incorrect_answers])
        );
    }, [currQues,questions]);
     //cevapların karışık gelmesi için
    const handleShuffle = (a) => {
        return a.sort(() => Math.random() - 0.5);
    };

    console.log(answers)
    //Next butonu işlemleri
    const handleNext = () => {
        if (currQues >8 && currQues === 9) {
            setSonucSayfasi(true)
        }else if (selected) {
            setCurrQues(currQues + 1);
            //selected özelliğini sıfırlamış oluyorsun
            //sıfırlamazsan tüm soruları etkiliyor
            setSelected();
        } else setError("You must select an option!");
    };
    //handleCheck seçilen cevabı alıyor. Seçildiği bilgisini state e atıyor
    const handleCheck = (i) => {
        setSelected(i);
        if (i === questions[currQues].correct_answer) setScore(score + 1) ;
        setError(false);
    }
    const  handleSelect = (secilen) => {
        if (selected===secilen && selected === questions[currQues].correct_answer) return "correct"
        else if (selected === secilen && selected !== questions[currQues].correct_answer) return "wrong";
        else if (secilen === questions[currQues].correct_answer) return "correct";
    }
    /*
    const decoder = new TextDecoder('ISO-8859-1');
    let html = decoder.decode(questions[currQues].question);*/
    function characterEncoding(){
        return {
           // __html: html_entity_decode("'", ENT_QUOTES)

        }
    }
    return (
    <div>
        {sonucSayfasi ?
            <SonucSayfasi
                score = {score}
            />
            :
            <div className="pageDiv" characterEncoding= {"<meta charSet=\"unicode\" />"} >
                    <div className="soruSayisi">
                        <div>Question {currQues + 1} </div>
                    </div>
            <div className="question">
                <div>{error && <Error>{error}</Error>}</div>
               <h4>{questions[currQues].question}</h4>
                <div className="options" >
                    {answers && answers.map((a)=>(
                        <button className= {`option  ${selected && handleSelect(a)} `}
                                key={a}
                                onClick={() => handleCheck(a)}
                                disabled={selected}
                        >
                            {a}
                        </button>
                    ))}
                </div>
            </div>
            <button className="sonraki" onClick={handleNext}>
                Next
            </button>
       </div>}
    </div>
    );
}
export default QuizSayfasi;
// http://localhost:3000
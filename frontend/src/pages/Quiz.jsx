import Questions from "../components/Questions";
import '../styles/Quiz.css'
function Quiz()
{
    function onPrev(){
        console.log("on click prev");
    }
    function onNext(){
        console.log("on click next");
    }
    return(
        <>
        <nav>
            <h3>Name of the Exam</h3>
            <h3>Time Left 00:00:00</h3>
        </nav>
        <div className="questionpage">
            <Questions/>
            <div className="grid">
                <button className="Prev-btn" onClick={onPrev}>Previous</button>
                <button className="Next-btn" onClick={onNext}>Next</button>
            </div>
        </div>
        </>
    );
}
export default Quiz;
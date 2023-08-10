import { useEffect, useContext } from "react";
import { differenceInSeconds } from "date-fns";
import { CountdownContainer, Separator } from "./styles"
import { TaskContext } from "../../../../contexts/TasksContext";


export function Countdown() {
    
    const { activeTask, markCurrentTaskAsFinished, amountSecondPassed, setSecondsPassed } = useContext(TaskContext);


    const totalSeconds = activeTask? activeTask.minutesAmount * 60 : 0;
    const currentSeconds = activeTask? totalSeconds - amountSecondPassed : 0;
    const minutosAmount = String(Math.floor(currentSeconds/60)).padStart(2, "0");
    const secondsAmount = String(currentSeconds % 60).padStart(2, "0");

    useEffect(() => {
        let interval: number;

        if (activeTask) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    new Date(activeTask.startDate)
                );
                
                if(secondsDifference <= totalSeconds) {
                    setSecondsPassed(secondsDifference);
                }
                else {
                    setSecondsPassed(totalSeconds);
                    clearInterval(interval);
                    markCurrentTaskAsFinished();
                }}, 1000)
        }

        return () => {
            clearInterval(interval);
        }
    }, [activeTask, totalSeconds, markCurrentTaskAsFinished, setSecondsPassed]);

    useEffect(() => {
        if(activeTask) {
            document.title = `${minutosAmount}:${secondsAmount}`;
        }
    }, [activeTask, minutosAmount, secondsAmount]);
    
    return (
        <CountdownContainer>
            <span>{minutosAmount[0]}</span>
            <span>{minutosAmount[1]}</span>
            <Separator>:</Separator>
            <span>{secondsAmount[0]}</span>
            <span>{secondsAmount[1]}</span>
        </CountdownContainer>
    )
}
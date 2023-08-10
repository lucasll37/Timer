import { createContext, useState, ReactNode, useReducer, useEffect } from "react";
import { tasksReducers } from "../reducers/tasks/reduces";
import { ITask } from "../reducers/tasks/actions";
import {
    interruptCurrentTaskAction,
    markCurrentTaskAsFinishedAction,
    addNewTaskAction
} from "../reducers/tasks/actions";
import { differenceInSeconds } from "date-fns";


interface CreateNewTaskData {
    task: string;
    minutesAmount: number;
}

interface ITaskContext {
    tasks: ITask[];
    activeTask: ITask | undefined;
    activeTaskId: string | null;
    markCurrentTaskAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    CreateNewTask: (data: CreateNewTaskData ) => void;
    StopCountdown: () => void;
    amountSecondPassed: number;
}

export const TaskContext = createContext({} as ITaskContext);

interface TasksContextProviderProps {
    children: ReactNode;
}


export function TasksProvider({ children }: TasksContextProviderProps) {

    const [tasksState, dispatch] = useReducer(
        tasksReducers,
        {tasks: [], activeTaskId: null},
        initilState => {
            const stateJSON = localStorage.getItem('@ignite-timer:Tasks-State-1.0.0');
            if (stateJSON) {
                return JSON.parse(stateJSON);
            }
            else initilState;
    });

    const { tasks, activeTaskId } = tasksState;
    const activeTask = tasks.find(task => task.id === activeTaskId);


    const [amountSecondPassed, setAmountSecondPassed] = useState<number>(() => {
        if(activeTask) {
            return differenceInSeconds(
                new Date(),
                new Date(activeTask.startDate)
            );
        }

        return 0;
    });

    useEffect(() => {
        const stateJSON = JSON.stringify(tasksState);
        localStorage.setItem('@ignite-timer:Tasks-State-1.0.0', stateJSON);
    }, [tasksState])
    
    
    function setSecondsPassed(seconds: number) {
        setAmountSecondPassed(seconds);
    }
    
    function CreateNewTask(data: CreateNewTaskData ) {
        const newTask: ITask = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        
        dispatch(addNewTaskAction(newTask));
        setAmountSecondPassed(0);
    }

    function StopCountdown() {
        dispatch(interruptCurrentTaskAction());
    }

    function markCurrentTaskAsFinished() {
        dispatch(markCurrentTaskAsFinishedAction());
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                activeTask,
                activeTaskId,
                markCurrentTaskAsFinished,
                amountSecondPassed,
                setSecondsPassed,
                CreateNewTask,
                StopCountdown
            }}
        >
            { children }
        </TaskContext.Provider>
    )
}
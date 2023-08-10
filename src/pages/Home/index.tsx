import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form"
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { TaskContext } from "../../contexts/TasksContext";


import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton
} from "./styles";

import { NewTaskForm } from "./components/NewTaskForm";
import { Countdown } from "./components/Countdown";
import { useContext } from "react";


const newTaskValidationSchema = zod.object({
    task: zod.string().min(1, {message: 'Informe a tarefa'}),
    minutesAmount: zod.number()
        .min(1, {message: 'Informe um valor acima de 1 minutos'})
        .max(60, {message: 'Informe um valor abaixo de 60 minutos'})
})

type INewTaskFormData = zod.infer<typeof newTaskValidationSchema>;


export function Home() {

    const {
        activeTaskId,
        CreateNewTask,
        StopCountdown
    } = useContext(TaskContext);

    const newTaskForm = useForm<INewTaskFormData>({
        resolver: zodResolver(newTaskValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const { handleSubmit, watch, reset } = newTaskForm
    
    const isSubmitDisabled = !watch('task');

    function handleCreateNewTask(data: INewTaskFormData) {
        reset();
        CreateNewTask(data);
    }

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewTask)} action="">
                <FormProvider {...newTaskForm}>
                    <NewTaskForm />
                </FormProvider>
                <Countdown />
                {
                    activeTaskId ? (
                        <StopCountdownButton type="button" onClick={StopCountdown}>
                            <HandPalm size={24} />
                            Interromper
                        </StopCountdownButton>
                    ) : (
                        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                            <Play size={24} />
                            Começar
                        </StartCountdownButton>
                    )
                }
            </form>
        </HomeContainer>
    )
}
import { useContext } from "react";
import { TaskContext } from "../../../../contexts/TasksContext";
import { FormContainer, TaskInput, MinutesAmountInput } from "./styles"
import { useFormContext } from "react-hook-form";

export function NewTaskForm() {

    const { activeTaskId } = useContext(TaskContext);
    const { register } = useFormContext();

    return (
        <FormContainer>
            <label htmlFor="">Vou trabalhar em</label>
            <TaskInput
                id="task"
                placeholder="Dê um nome para o seu projeto"
                disabled={!!activeTaskId}
                list="tasks-suggestions"
                {...register("task")}

            />
            <datalist id="tasks-suggestions">
                <option value="Projeto 1" />
            </datalist>
            <label htmlFor="">Durante</label>
            <MinutesAmountInput
                type="number"
                id="minutesAmount"
                placeholder="00"
                disabled={!!activeTaskId}
                {...register("minutesAmount", {valueAsNumber: true})}
                step={1}
                min={1}
                max={60}

            />
            <span>minutos.</span>
        </FormContainer>
    )
}
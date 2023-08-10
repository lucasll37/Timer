export interface ITask {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

export enum ActionsTypes {
    ADD_NEW_TASK = 'ADD_NEW_TASK',
    INTERRUPT_CURRENT_TASK = 'INTERRUPT_CURRENT_TASK',
    MARK_CURRENT_TASK_AS_FINISHED = 'MARK_CURRENT_TASK_AS_FINISHED'
}

export function addNewTaskAction(newTask: ITask) {
    return {
        type: ActionsTypes.ADD_NEW_TASK,
        payload: {newTask}
    }
}

export function interruptCurrentTaskAction() {
    return {
        type: ActionsTypes.INTERRUPT_CURRENT_TASK,
    }
}

export function markCurrentTaskAsFinishedAction() {
    return {
        type: ActionsTypes.MARK_CURRENT_TASK_AS_FINISHED,
    }
}
import { ActionsTypes, ITask } from './actions';
import { produce } from "immer"


interface ITasksState {
    tasks: ITask[];
    activeTaskId: string | null;
}

interface IAction {
    type: ActionsTypes;
    payload?: {
        newTask: ITask;
    };
}

export function tasksReducers(state: ITasksState, action: IAction) {

    switch(action.type) {
        case ActionsTypes.ADD_NEW_TASK:

            return produce(state, draft => {
                if(action.payload) {
                    draft.tasks.push(action.payload.newTask);
                    draft.activeTaskId = action.payload.newTask.id;
                }
            })

        case ActionsTypes.INTERRUPT_CURRENT_TASK: {
  
            const currentTaskIndex = state.tasks.findIndex(task => {
                return task.id == state.activeTaskId;
            });
            
            if(currentTaskIndex >= 0) {
                return produce(state, draft => {
                    draft.activeTaskId = null;
                        draft.tasks[currentTaskIndex].interruptedDate = new Date();
                });
            }
            
            return state;
        }
        
        case ActionsTypes.MARK_CURRENT_TASK_AS_FINISHED: {

            const currentTaskIndex = state.tasks.findIndex(task => {
                task.id === state.activeTaskId;
            });

            if(currentTaskIndex >= 0) {
                return produce(state, draft => {
                    draft.activeTaskId = null;
                    draft.tasks[currentTaskIndex].finishedDate = new Date();
                })
            }

            return state;
        }

        default:
            return state;   
    }
}
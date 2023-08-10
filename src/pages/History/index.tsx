import { HistoryContainer, HistoryList, Status }from './styles';
import { TaskContext } from '../../contexts/TasksContext';
import { useContext } from "react"
import { formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"

export function History() {

    const { tasks } = useContext(TaskContext);

    return (
        <HistoryContainer>
            <h1>Meu Histórico</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map(task => {
                                return (
                                    <tr key={task.id}>
                                        <td>{task.task}</td>
                                        <td>{task.minutesAmount} minutos</td>
                                        <td>{formatDistanceToNow(new Date(task.startDate), {
                                            locale: ptBR
                                        })}</td>
                                        <td>
                                            {
                                                task.finishedDate &&
                                                <Status $statusColor='green'>Concluído</Status>
                                            }
                                            {
                                                task.interruptedDate &&
                                                <Status $statusColor='red'>Interrompido</Status>
                                            }
                                            {
                                                (!task.finishedDate && !task.interruptedDate) &&
                                                <Status $statusColor='yellow'>Em andamento</Status>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}
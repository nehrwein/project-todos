import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import todos from '../reducers/todos'
import Image from '../components/Image'

const ContainerDiv = styled.div `
  height: 57vh;
  max-width: fit-content;
  margin-top: -50px;
  overflow-y:auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    opacity: 0.5;
  }

  @media (min-width: 667px) {
    margin-top: auto;
  }
`
const StyledForm = styled.form `
  width: 80vw;
  max-width: 340px;
  margin-bottom: 10px;
  padding: 5px;
  font-size: 20px;
  border: 1px solid var(--red);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-radius: 5px;
  opacity: ${props => props.completed ? 0.3 : 1};
  background-color: ${props => props.category === 'Study' ? 'var(--lax)' : props.category === 'Work' ? '#6997b0' : props.category === 'Shopping' ? '#9e9dd9' : '#facdc5'};

  & button {
    background-color: transparent;
    border: none;
    font-size: 15px;
    cursor: pointer;
  }

  @media (min-width: 667px) {
    max-width: 400px;
  }

  @media (min-width: 1024px) {
    font-size: 22px;
    margin: 0 20px 10px 20px;
  }
`
const ToDoLabel = styled.label `
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`
const StyledParagraph = styled.p `
  width: 100%;
  font-size: 14px;
  margin-bottom: 0;
`

const ToDos = () => {
  const tasks = useSelector((state) => state.todos.items)
  const noTasks = useSelector((state) => state.todos.items.length === 0)
  const dispatch = useDispatch()

  const trashCanIcon = <FontAwesomeIcon icon={faTrashAlt} />
  /* const editIcon = <FontAwesomeIcon icon={faPen} /> */

  const onToggleIsComplete = (id) => {
    dispatch(todos.actions.toggleIsComplete(id))
  }

  return (
    <ContainerDiv>
      {noTasks && <Image />}
      {tasks.map((task) => (
        <StyledForm 
          key={task.id}
          category={task.category}
          completed={task.isComplete}
        >
          <ToDoLabel
            completed={task.isComplete} 
            htmlFor='completed'>{task.task}
          </ToDoLabel>
          <div>
            <input 
              id='completed'
              type='checkbox' 
              onChange={() => onToggleIsComplete(task.id)}
            />
            {/* <button >{editIcon}</button> */}
            <button onClick={() => dispatch(todos.actions.removeToDo(task.id))}>{trashCanIcon}</button>
          </div>
          <StyledParagraph>{moment(task.newDate).format("D. MM. YYYY")}</StyledParagraph> 
        </StyledForm>
      ))}
    </ContainerDiv>
  )
}

export default ToDos

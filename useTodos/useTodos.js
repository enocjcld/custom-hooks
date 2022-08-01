import React, { useEffect, useReducer } from 'react'
import { todoReducer } from "./todoReducer"

const init = () => {
    // Retorna los objetos gardados en el localstorage del todo, si estos no existen crea un arreglo vacio
    return JSON.parse(localStorage.getItem('todos') ) || [];
}

export const useTodos = ( initialState = [] ) => {

    const [todos, dispatch] = useReducer( todoReducer, initialState, init );

    useEffect( () => {
        localStorage.setItem('todos', JSON.stringify( todos ) ); // Stringify permite guardar las notas en como un arreglo
    }, [todos])

    const handleNewTodo = ( todo ) => {
        
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }

        dispatch( action );
    }

    const handelDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        });
    }

    const handelToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        });
    }

    return {
        todos,
        todosCount: todos.length, 
        pendingTodosCount: todos.filter( todo => !todo.done ).length,
        handleNewTodo,
        handelDeleteTodo,
        handelToggleTodo,
    }
}

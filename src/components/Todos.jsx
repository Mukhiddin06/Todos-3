import { DeleteOutlined, EditOutlined, HeartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Input from 'antd/es/input/Input'
import React, { useReducer } from 'react'


function reducer(state, action) {
    if (action.type == "CREATE") {
        return {
            todos: [...state.todos, action.payload],
            likedList: state.likedList
        }
    } else if (action.type == "LIKED") {
        return {
            todos: state.todos,
            likedList: [...state.likedList, action.payload]
        }
    }else if (action.type == "DELETE"){
        const deleteIndex = state.todos.findIndex(item => item.id == action.payload)
        state.todos.splice(deleteIndex, 1)
        return {
            todos: [...state.todos],
            likedList: state.likedList
        }
    }
}

    const InitialState = {
        todos: [],
        likedList: []
    }
    function Todos() {
        const [data, dispatch] = useReducer(reducer, InitialState)

        function handleSubmit(e) {
            e.preventDefault()
            const newValue = {
                id: data.todos.length + 1,
                value: e.target.todo.value
            }
            dispatch({ type: "CREATE", payload: newValue })
        }
        console.log(data)

        return (
            <>
                <form onSubmit={handleSubmit} className='w-[600px] flex items-center justify-between mx-auto mt-10 bg-slate-100 p-5 rounded-lg'>
                    <Input name='todo' className='w-[80%]' placeholder='Add todo' size='large' allowClear />
                    <Button htmlType='submit' type='primary' size='large'>Submit</Button>
                </form>
                <ul className='w-[600px] mx-auto mt-10 bg-slate-100 space-y-3 p-5 rounded-lg'>
                    {data.todos.map((item, index) => (
                        <li className='p-2 rounded-md flex items-center justify-between bg-slate-300' key={index}>
                            <div>{index + 1}. {item.value}</div>
                            <div className='flex items-center gap-5'>
                                <button onClick={() => dispatch({ type: "LIKED", payload: item })}><HeartOutlined /></button>
                                <button onClick={() => dispatch({ type: "DELETE", payload: item.id })}><DeleteOutlined /></button>
                                <button><EditOutlined /></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </>
        )
    }

    export default Todos
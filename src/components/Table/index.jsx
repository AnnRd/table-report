import { useState } from 'react';
import { Button } from '../Button';
import s from './index.module.css';

export function Table({ tables, users, setTables, setModalData, setIsOpenModal, setUser, setInputValue, setEditableUserData }) {
    const [currentCard, setCurrentCard] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = users.slice(firstItemIndex, lastItemIndex);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const deleteHandler = (index) => {
        setTables(tables.filter((_, tableIndex) => tableIndex !== index))
    }

    const editHandler = (currentUser, currentUserIndex) => {
        setInputValue(currentUser);
        setEditableUserData({
            isEdit: true,
            userIndex: currentUserIndex,
        })
    }

    function buttonHandler (pageNumber) {
        setCurrentPage(pageNumber)
    }

    function toggleModal(user) {
        setModalData(user)
        setIsOpenModal(true)
    }
    
    return (
        <div className={s.tableWrapper}>
          <table>
            {tables.map((table, index) => (
                <th onDoubleClick={() => deleteHandler(index)} onClick={() => editHandler(table, index)} key={index}>{table}</th>
            ))}
            <tbody>
                {currentItems.map((user, index) => (
                    <tr 
                        className={s.separator}
                        key={index}
                    >
                        <td onClick={() => toggleModal(user)} className={s.separator}>{user.id}</td>
                        <td onClick={() => toggleModal(user)} className={s.separator}>{user.name}</td>
                        <td onClick={() => toggleModal(user)} className={s.separator}>{user.value}</td>
                    </tr>
                ))}
            </tbody>
          </table>

            {pageNumbers.map((num) => (
                <button onClick={() => buttonHandler(num)} className={s.paginationButton} key={num}>
                    <a>{num}</a>
                </button>
            ))}
        </div>
    )
}
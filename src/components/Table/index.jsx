import { useState } from 'react';
import { Button } from '../Button';
import s from './index.module.css';

export function Table({ users, setModalData, setIsOpenModal, setUser, setInputValue, setEditableUserData }) {
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
        setUser(users.filter((usr, usrIndex) => usrIndex !== index));
    }

    const editHandler = (currentUser, currentUserIndex) => {
        setInputValue(currentUser);
        setEditableUserData({
            isEdit: true,
            userIndex: currentUserIndex,
        })
    }

    function dragStartHandler(card) {
        setCurrentCard(card);
    }

    function dragEndHandler(event) {
        event.target.style.background = 'white';
    }

    function dragOverHandler(event) {
        event.preventDefault();
        event.target.style.background = 'lightgray';
    }

    function dropHandler(event, card) {
        event.preventDefault();
        event.target.style.background = 'white';

        setUser(users.map((usr, usrIndex) => {
            if (usr.id === card.id) {
                return { ...usr, id: currentCard.id }
            }

            if (usr.id === currentCard.id) {
                return { ...usr, id: card.id }
            }

            return usr
        }))
    }

    function sortCards(a, b) {
        if (a.id > b.id) {
            return 1
        } else {
            return -1
        }
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
            <th>№</th>
            <th>Имя</th>
            <th>Значение</th>
            <th>Действия</th>
            <tbody>
                {currentItems.sort(sortCards).map((user, index) => (
                    <tr 
                        draggable={true} 
                        onDragStart={(event) => dragStartHandler(event, user)}
                        onDragLeave={(event) => dragEndHandler(event)}
                        onDragEnd={(event) => dragEndHandler(event)}
                        onDragOver={(event) => dragOverHandler(event)}
                        onDrop={(event) => dropHandler(event, user)}
                        className={s.separator}
                        key={index}
                    >
                        <td onClick={() => toggleModal(user)} className={s.separator}>{user.id}</td>
                        <td onClick={() => toggleModal(user)} className={s.separator}>{user.name}</td>
                        <td onClick={() => toggleModal(user)} className={s.separator}>{user.value}</td>
                        <td className={s.separator}>
                            <div className={s.buttonWrapper}>
                                <Button buttonType={'edit'} onClick={() => editHandler(user, index)} buttonText={<span>Изменить</span>}/>
                                <Button buttonType={'delete'} onClick={() => deleteHandler(index)} buttonText={<span>Удалить</span>}/>
                            </div>
                        </td>
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
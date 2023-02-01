import { useState } from "react";
import { data } from "../../report-config";
import { Form } from "../Form";
import { Modal } from "../Modal";
import { Table } from "../Table";
import s from './index.module.css';

export function App() {
  const [user, setUser] = useState(data);
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [inputValue, setInputValue] = useState('');
  const [tables, setTables] = useState(['№', 'Имя', 'Значение']);


  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null,
  })

  return (
    <div className={s.wrapper}>
    {isModalOpen && 
        (
          <Modal modalData={modalData} onClose={setIsOpenModal}>
            <h1>Модальное окно</h1>
          </Modal>
        )
      }
      <div className={s.content}>
        <Table tables={tables} users={user} setTables={setTables} setModalData={setModalData} setIsOpenModal={setIsOpenModal} setEditableUserData={setEditableUserData} setInputValue={setInputValue} setUser={setUser}/>
        <div className={s.formWrapper}>
          <Form tables={tables} setTables={setTables} editableUserData={editableUserData} users={user} inputValue={inputValue} setEditableUserData={setEditableUserData} setInputValue={setInputValue} setUser={setUser}/>
        </div>
      </div>
    </div>
  );
}
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

  const [inputValue, setInputValue] = useState({
    name: '',
    value: '',
  });

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
        <Table users={user} setModalData={setModalData} setIsOpenModal={setIsOpenModal} setEditableUserData={setEditableUserData} setInputValue={setInputValue} setUser={setUser}/>
        <div className={s.formWrapper}>
          <Form editableUserData={editableUserData} users={user} inputValue={inputValue} setEditableUserData={setEditableUserData} setInputValue={setInputValue} setUser={setUser}/>
        </div>
      </div>
    </div>
  );
}
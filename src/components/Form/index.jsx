import { Button } from '../Button';
import s from './index.module.css';

export function Form(props) {
    const { tables, inputValue, users, editableUserData: { isEdit, userIndex }, setTables,  setInputValue, setUser, setEditableUserData } = props;
    const isDisabled = !inputValue;

    const formHandler = (event) => {
        event.preventDefault();

        if (isEdit) {
            tables.splice(userIndex, 1, inputValue)

            setTables(setTables)
            setEditableUserData({
                isEdit: false,
                userIndex: null,
            })
        } else {
            setTables((prevState) => [...prevState, inputValue])
        }

        setInputValue('')
    }

    const inputHandler = (event) => {
        setInputValue(event.target.value)
    }

    return (
        <form onSubmit={formHandler}>
          <input value={inputValue} placeholder='Введите name' onChange={inputHandler}/>
          <div className={s.buttonWrapper}>
            <Button isDisabled={isDisabled} buttonType={'add'} buttonText={isEdit ? <span>Сохранить</span> : <span>Добавить</span>}/>
          </div>
        </form>
    )
}
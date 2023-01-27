import { Button } from '../Button';
import s from './index.module.css';

export function Form(props) {
    const { inputValue, users, editableUserData: { isEdit, userIndex }, setInputValue, setUser, setEditableUserData } = props;
    const isDisabled = !inputValue.name || !inputValue.value;

    const formHandler = (event) => {
        event.preventDefault();

        if (isEdit) {
            const editedUser = users;
            editedUser.splice(userIndex, 1, inputValue)

            setUser(editedUser)
            setEditableUserData({
                isEdit: false,
                userIndex: null,
            })
        } else {
            setUser((prevState) => [...prevState, { name: inputValue.name, value: inputValue.value, id: users.length + 1 }]);
        }

        setInputValue({
            name: '',
            value: '',
        })
    }

    const inputHandler = (event) => {
        // [event.target.alt] вместо того, чтобы для каждого input создавать onChange
        // который меняет состояние одного поля
        setInputValue((prevState) => ({...prevState, [event.target.alt]: event.target.value}))
    }

    return (
        <form onSubmit={formHandler}>
          <input value={inputValue.name} alt='name' placeholder='Введите name' onChange={inputHandler}/>
          <input value={inputValue.value} alt='value' placeholder='Введите value' onChange={inputHandler}/>

          <div className={s.buttonWrapper}>
            <Button isDisabled={isDisabled} buttonType={'add'} buttonText={isEdit ? <span>Сохранить</span> : <span>Добавить</span>}/>
          </div>
        </form>
    )
}
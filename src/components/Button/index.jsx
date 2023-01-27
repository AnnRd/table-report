import s from './index.module.css';
import cn from 'classnames';

export function Button({ buttonText, buttonType, isDisabled, onClick}) {
    return <button disabled={isDisabled} type='submit' className={cn(s.button, {
        [s.edit]: buttonType === 'edit',
        [s.delete]: buttonType === 'delete',
        [s.add]: buttonType === 'add',
    })} onClick={onClick}>{buttonText}</button>
}
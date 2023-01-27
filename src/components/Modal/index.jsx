import ReactDOM from "react-dom";
import s from './index.module.css';

export function Modal({children, modalData, onClose}) {
    function closeModal() {
        onClose(false)
        document.body.style.overflow = 'visible'
    }

    document.body.style.overflow = 'hidden';

    return ReactDOM.createPortal(
        <div className={s.modalWrapper}>
            <div className={s.buttonWrapper}>
                <button className={s.closeButton} onClick={closeModal}>
                    <span>Закрыть</span>
                </button>
            </div>
            <div>
                {children}
                <div>
                    {modalData.name}
                </div>
                <div>
                    {modalData.value}
                </div>
            </div>
        </div>, document.getElementById('portal')
    )
}
import './InfoToolTip.css';
import success from '../../images/success.svg';
import error   from '../../images/error.svg';

function InfoTooltip({isOpen, onClose, onCloseOverlayClick, isInfoTooltipStatus, tooltipText}) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} onClick={onCloseOverlayClick}>
      <div className="popup__container popup__container_type_tooltip">
        <img src={isInfoTooltipStatus ? success : error}
             alt={isInfoTooltipStatus ? 'иконка успешной операции' : 'иконка ошибки'} className="popup__image"/>
        <h2 className="popup__title popup__title_type_auth">{tooltipText}</h2>
        <button
          aria-label="Закрыть окно"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export default InfoTooltip;
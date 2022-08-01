import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import css from './button.module.scss';

interface Props {
    icon?: IconDefinition;
    label: string;
    disabled: boolean;
    onClick: () => void;
}

const Button = ({
    icon,
    label,
    onClick,
    disabled
}: Props) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className={css.wrapper}
    >
        {icon && <FontAwesomeIcon icon={icon} />}&nbsp;{label}
    </button>
);

export default Button;
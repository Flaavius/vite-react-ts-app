import { memo } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import css from './status.module.scss';

const statusMap = {
    available: 'Available',
    scheduled: 'Scheduled',
}

const mapStatus = (status: string) => statusMap[status as keyof typeof statusMap] || "-";

interface StatusProps {
    status: 'available' | 'scheduled' | string,
}

const Status = ({ status }: StatusProps) => {
    return (<div  className={css.wrapper} >
    {/* <span className={clsx(css.status, { [css.available]: status === 'available' })} /> */}
    <FontAwesomeIcon icon={faCircle} className={clsx(css.status, { [css.available]: status === 'available' })} />
    {mapStatus(status)}
  </div>)
}

export default memo(Status);
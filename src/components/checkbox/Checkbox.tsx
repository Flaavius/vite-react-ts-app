import { useEffect, useRef } from "react";

interface Props {
    checked?: boolean;
    indeterminate?: boolean;
    onChange?: (value: boolean, ev?: React.ChangeEvent<HTMLInputElement>) => void; 
}

const Checkbox = ({
    indeterminate = false,
    checked = false,
    onChange = () => undefined,
}: Props) => {
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if(ref.current)
            ref.current.indeterminate = indeterminate;
    }, [indeterminate]);
    return (
        <input
            onChange={(ev) => { 
                onChange(ev.target.checked, ev)
            }}
            type="checkbox" ref={ref}
            checked={checked}
        />
    );
}

export default Checkbox;
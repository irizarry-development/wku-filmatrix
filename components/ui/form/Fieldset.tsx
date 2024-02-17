import { ReactNode } from "react";

interface FieldsetProps {
    legendTitle: string;
    legendSubtitle?: string;
    children: ReactNode;
}

export function Fieldset({
    legendTitle,
    legendSubtitle,
    children
}: FieldsetProps) {
    return (
        <fieldset>
            <legend>{legendTitle}</legend>
            {legendSubtitle && <p>{legendSubtitle}</p>}
            {children}
        </fieldset>
    );
}

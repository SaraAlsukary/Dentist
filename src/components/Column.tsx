
import type { JSX } from "react";

interface IProps {
    id: string;
    title: string;
    color: string;
    children: JSX.Element[];
}
function Column({ title, color, children }: IProps) {

    return (
        <div className="col-md-4">
            <h4 className={color}>
                {title} ({children.length})
            </h4>

            <div
                className="p-2 bg-light rounded"
                style={{ minHeight: "250px" }}
            >
                {children}
            </div>
        </div>
    );
}

export default Column;
import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <>
            <h2>Page not found</h2>
            <p>You seem lost, would you like to go back <Link to="/">home</Link>?</p>
        </>
    );
}

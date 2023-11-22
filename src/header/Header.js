import BigSubjectList from "./BigSubjectList";
import UserLinks from "./UserLinks";

export default function Header() {
    return(
        <div className="Header">
            <UserLinks></UserLinks>
            <BigSubjectList></BigSubjectList>
        </div>
    )
}
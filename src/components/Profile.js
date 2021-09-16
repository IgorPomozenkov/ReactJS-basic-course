import { useDispatch, useSelector } from "react-redux"
import { toggleShowName } from "../store/profile/actions"
import './Profile.css'


export default function Profile() {
    const { showName, name } = useSelector(state => state);
    const dispath = useDispatch();

    const setShowName = () => {
        dispath(toggleShowName);
    }

    return (
        <div className="profile">
            <input type="checkbox" id="nameId" value={showName} onChange={setShowName} />
            <label htmlFor="nameId">My name: </label>{showName && <span>{name}</span>}
        </div>
    )
}
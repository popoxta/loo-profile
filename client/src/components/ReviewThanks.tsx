import Cover from "./Cover.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button.tsx";
import Alert from "./Alert.tsx";

export default function ReviewThanks({toggle}: { toggle: () => void }) {
    return (
        <Alert title={'Thanks!'} buttonText={'Go Back'} toggle={toggle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante eu elit pretium
            imperdiet. Nullam in tristique justo. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed lacinia ante eu elit pretium imperdiet. Nullam in tristique justo.
        </Alert>
    )
}
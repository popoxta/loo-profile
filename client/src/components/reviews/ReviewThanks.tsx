import Alert from "../Alert.tsx";

export default function ReviewThanks({toggle}: { toggle: () => void }) {
    return (
        <Alert title={'Thanks!'} buttonText={'Finish'} toggle={toggle} buttonToggle={toggle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia ante eu elit pretium
            imperdiet. Nullam in tristique justo. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed lacinia ante eu elit pretium imperdiet. Nullam in tristique justo.
        </Alert>
    )
}
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faToilet, faStar} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button.tsx";

export default function LooCard() {
    return (
        <div>
            <FontAwesomeIcon icon={faToilet}/>
            <div>
                <div>
                    <h3>Some title</h3>
                    <div>
                        <FontAwesomeIcon icon={faStar}/>
                        <FontAwesomeIcon icon={faStar}/>
                        <FontAwesomeIcon icon={faStar}/>
                        <FontAwesomeIcon icon={faStar}/>
                        <FontAwesomeIcon icon={faStar}/>
                    </div>
                </div>
                <p>123 Something ln, City</p>
                <p>Witty, TX, 82309</p>
                <div>
                    <p>022 302 6406</p>
                    <Button link={'.'}>View</Button>
                </div>
            </div>
        </div>
    )
}
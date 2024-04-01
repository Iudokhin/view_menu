import { useEffect, useState } from "react";
import { ViewMenu } from "./ViewMenu.tsx";


export function ViewMenuBtn() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleModal = () => {
        setIsMenuOpen(prevIsModalOpen => !prevIsModalOpen);
    };

    useEffect(() => {
        const closeMenu = () => {
            setIsMenuOpen(false)
        }

        window.addEventListener('closeCameraViewMenu', closeMenu);

        return () => {
            window.removeEventListener('closeCameraViewMenu', closeMenu);
        };
    }, [])

    return <div>
        < button onClick={ toggleModal } className="btn icon-btn" >
            <i className="icon-point-of-view" ></i>
        </button >
        { isMenuOpen && <ViewMenu toggleModal={ toggleModal } /> }
    </div >
}
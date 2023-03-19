import styles from './hamburgerSVG.module.css'

export interface HamburgerSVGBlock {
    open: boolean
    onToggle: (state: boolean) => void
}

export const HamburgerSVG: React.FC<HamburgerSVGBlock> = ({open, onToggle}) => {
    
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="25px"
            viewBox="0 0 30 25"
            className={styles.svg}
            onClick={() => open?onToggle(false):onToggle(true)}
            data-dropdown
        >
            <defs></defs>
            <g id="Слой_2" data-name="Слой 2">
                <g id="Слой_1-2" data-name="Слой 1">
                    <rect data-dropdown width="30" height="5" rx="2" />
                    <rect data-dropdown y="10" width="30" height="5" rx="2" />
                    <rect data-dropdown y="20" width="30" height="5" rx="2" />
                </g>
            </g>
        </svg>
    )
}

export default HamburgerSVG
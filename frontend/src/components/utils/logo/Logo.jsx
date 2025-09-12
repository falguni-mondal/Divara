import React from 'react'

const Logo = () => {
    return (
        <svg className='w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 496" fill="none">
            <g filter="url(#filter0_n_39_116)">
                <path d="M5.69922 466V464.8H176.699C198.099 464.8 217.899 460 236.099 450.4C254.299 440.6 270.799 427.3 285.599 410.5C300.599 393.5 313.799 374.2 325.199 352.6C336.799 331 346.399 308.3 353.999 284.5C361.799 260.5 367.699 236.6 371.699 212.8C375.699 188.8 377.699 166.2 377.699 145C377.699 131.2 375.999 116.9 372.599 102.1C369.199 87.1 363.699 73.2 356.099 60.4C348.499 47.6 338.299 37.2 325.499 29.2C312.899 21.2 297.299 17.2 278.699 17.2H101.699V16H278.699C311.299 16 339.999 22 364.799 34C389.599 45.8 408.899 63.1 422.699 85.9C436.699 108.7 443.699 136.4 443.699 169C443.699 210 436.699 248.5 422.699 284.5C408.699 320.3 389.399 351.8 364.799 379C340.199 406.2 311.799 427.5 279.599 442.9C247.399 458.3 213.099 466 176.699 466H5.69922ZM59.6992 466L161.699 16H218.699L116.699 466H59.6992Z" fill="#F6F6F6" />
                <path d="M101.699 466V464.8C123.099 464.8 142.899 460 161.099 450.4C179.299 440.6 195.799 427.3 210.599 410.5C225.599 393.5 238.799 374.2 250.199 352.6C261.799 331 271.399 308.3 278.999 284.5C286.799 260.5 292.699 236.6 296.699 212.8C300.699 188.8 302.699 166.2 302.699 145C302.699 131.2 300.999 116.9 297.599 102.1C294.199 87.0999 288.699 73.1999 281.099 60.3999C273.499 47.5999 263.299 37.1999 250.499 29.1999C237.899 21.1999 222.299 17.1999 203.699 17.1999V15.9999C236.299 15.9999 264.999 21.9999 289.799 33.9999C314.599 45.7999 333.899 63.0999 347.699 85.8999C361.699 108.7 368.699 136.4 368.699 169C368.699 210 361.699 248.5 347.699 284.5C333.699 320.3 314.399 351.8 289.799 379C265.199 406.2 236.799 427.5 204.599 442.9C172.399 458.3 138.099 466 101.699 466Z" fill="url(#paint0_linear_39_116)" />
            </g>
            <defs>
                <filter id="filter0_n_39_116" x="5.69922" y="15.9999" width="438" height="450" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="4692" />
                    <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                    <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                    </feComponentTransfer>
                    <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                    <feFlood flood-color="rgba(198, 198, 198, 0.25)" result="color1Flood" />
                    <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                    <feMerge result="effect1_noise_39_116">
                        <feMergeNode in="shape" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
                <linearGradient id="paint0_linear_39_116" x1="235.199" y1="466" x2="235.199" y2="15.9999" gradientUnits="userSpaceOnUse">
                    <stop offset="0.485577" stop-color="#F6F6F6" />
                    <stop offset="0.735577" stop-color="#F6F6F6" stop-opacity="0.63" />
                    <stop offset="1" stop-color="#F6F6F6" stop-opacity="0" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export default Logo
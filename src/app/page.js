import Image from 'next/image'

export default function Home() {
    return (
        <div class="body">
            <div class="left-bar">
                <div class="header">
                    <div class="header-image-logo"></div>
                    <div class="header-logo-container"></div>
                    <div class="lable-app-name"></div>
                    <div class="header-name-container"></div>
                </div>
                <div class="navigation">
                    <div class="nav-1-column">
                        <div class="nav-buttons-container">
                            <div class="nav-button"></div>
                            <div class="nav-button"></div>
                            <div class="nav-button"></div>
                            <div class="nav-button"></div>
                        </div>
                    </div>
                    <div class="nav-2-column">
                        <div class="search-bar"></div>
                        <div class="chat-list">
                            <div class="chat-list-item"></div>
                        </div>
                        <div class="nav-slider-2">
                            <div class="light-blue-selection-slider">
                                <div class="rounded-top"></div>
                                <div class="selection-item-container">
                                    <div class="white-selection-foreground"></div>
                                </div>
                                <div class="rounded-bottom"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-new-chat"></div>
            </div>
            <div class="middle-view"></div>
            <div class="right-bar"></div>
        </div>
    )
}

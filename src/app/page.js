import Image from 'next/image'

export default function Home() {
    return (
        <div class="body">
            <div class="left-bar">
                <div class="header">
                    <div class="header-logo-container">
                        <div class="app-logo"></div>
                    </div>
                    <div class="header-name-container">
                        <div class="lable-app-name">GLYDE</div>
                    </div>
                </div>
                <div class="navigation">
                    <div class="nav-1-column">
                        <div class="nav-buttons-container">
                            <div class="nav-button">
                                <div class="nav-button-image home-button"></div>
                            </div>
                            <div class="nav-button">
                                <div class="nav-button-image profile-button"></div>
                            </div>
                            <div class="nav-button">
                                <div class="nav-button-image friends-button"></div>
                            </div>
                            <div class="nav-button">
                                <div class="nav-button-image settings-button"></div>
                            </div>
                        </div>
                        <div class="nav-slider-1">
                            <div class="nav-1-rounded-top"></div>
                            <div class="nav-1-rounded-bottom"></div>
                        </div>
                    </div>
                    <div class="nav-2-column">
                        <div class="search-bar">
                            <input type="text" class="input-search-bar" placeholder="Search.."></input>
                        </div>
                        <div class="chat-list">
                            <div class="chat-list-item"># McCarthy</div>
                            <div class="chat-list-item"># Work</div>
                            <div class="chat-list-item selected"># James, Me</div>
                            <div class="chat-list-item"># English 101</div>
                            <div class="chat-list-item"># Home</div>
                            <div class="chat-list-item"># Book Club</div>
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

import { useEffect, useRef, useState } from "react";
import { Menu2, ArrowsMaximize, Bookmark, Settings } from "tabler-icons-react";
import Button from "../../../components/Button";
import gsap from "gsap";
import { EpubReader } from "../../epubReader";
import Accordian from "../../../components/Accordian";
import ProgressBar from "../../../components/Progressbar";
import { BW_SFT_EPUB } from "../../../data/supportedFileTypes";

const RightPanel = {
    bookmarkPanel: "BOOKMARK_PANEL",
    settingsPanel: "SETTINGS_PANEL",
};

const Reader = ({ file, fileType }) => {
    const leftPanelRef = useRef();
    const rightPanelRef = useRef();
    const viewRef = useRef();

    const [leftPanelOpen, setLeftPanelOpen] = useState(false);
    const [rightPanelOpen, setRightPanelOpen] = useState(false);
    const [activeRightPanel, setActiveRightPanel] = useState(null);

    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [totalPageNumer, setTotalPageNumer] = useState(2);
    const [toc, setToc] = useState([]);
    const [tocItemClickHandler, setTocItemClickHandler] = useState(()=>{});

    function toggleLeftPanel() {
        if (!leftPanelRef.current) return;
        if (!viewRef.current) return;
        let panelWidth = leftPanelRef.current.getBoundingClientRect().width;
        let viewWidth = viewRef.current.getBoundingClientRect().width;
        if (leftPanelOpen) {
            gsap.to(leftPanelRef.current, { left: -panelWidth, ease: "power4.out" });
            gsap.to(viewRef.current, { left: 0, width: viewWidth + panelWidth, ease: "power4.out" });
        } else {
            gsap.to(leftPanelRef.current, { left: 0, ease: "power4.out" });
            gsap.to(viewRef.current, { left: panelWidth, width: viewWidth - panelWidth, ease: "power4.out" });
        }
        setLeftPanelOpen((s) => !s);
    }

    function toggleRightPanel(activePanel) {
        if (rightPanelOpen && activeRightPanel != activePanel) {
            setActiveRightPanel(activePanel);
            return;
        }
        setActiveRightPanel(activePanel);
        if (!rightPanelRef.current) return;
        if (!viewRef.current) return;
        let panelWidth = rightPanelRef.current.getBoundingClientRect().width;
        let viewWidth = viewRef.current.getBoundingClientRect().width;
        if (rightPanelOpen) {
            gsap.to(rightPanelRef.current, { right: -panelWidth, ease: "power4.out" });
            gsap.to(viewRef.current, { width: viewWidth + panelWidth, ease: "power4.out" });
            setActiveRightPanel(null);
        } else {
            gsap.to(rightPanelRef.current, { right: 0, ease: "power4.out" });
            gsap.to(viewRef.current, { width: viewWidth - panelWidth, ease: "power4.out" });
        }
        setRightPanelOpen((s) => !s);
    }

    function handleMaximize(){
        if(!document.fullscreenElement){
            document.body.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
 

    return (
        <div className="relative h-screen w-screen flex flex-col">
            <div className="w-full h-12 bg-neutral-800 flex justify-between">
                <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center">
                        <Button onClick={toggleLeftPanel} className="w-12 h-12 text-neutral-500" type="icon">
                            <Menu2 size={24} stroke="currentColor" />
                        </Button>
                    </div>
                    <div>
                        <div className="text-xl font-bold text-white leading-none">Book</div>
                        <div className="text-xs text-neutral-500">Author</div>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex items-center justify-center">
                        <Button className="w-12 h-12 text-neutral-500" type="icon" onClick={handleMaximize}>
                            <ArrowsMaximize size={24} stroke="currentColor" />
                        </Button>
                    </div>
                    {/* <div className="flex items-center justify-center">
                        <Button onClick={()=>toggleRightPanel(RightPanel.bookmarkPanel)} className="w-12 h-12 text-neutral-500" type="icon"><Bookmark size={24} stroke="currentColor"/></Button>
                    </div> */}
                    <div className="flex items-center justify-center">
                        <Button
                            onClick={() => toggleRightPanel(RightPanel.settingsPanel)}
                            className="w-12 h-12 text-neutral-500"
                            type="icon"
                        >
                            <Settings size={24} stroke="currentColor" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="relative flex-1 overflow-hidden">
                <div ref={viewRef} className="absolute left-0 top-0 w-full h-full">
                    <div className="relative w-full h-full overflow-hidden">
                        {fileType == BW_SFT_EPUB && (
                            <EpubReader
                                file={file}
                                setToc={setToc}
                                setTotalPageNumer={setTotalPageNumer}
                                setCurrentPageNumber={setCurrentPageNumber}
                                setTocItemClickHandler={setTocItemClickHandler}
                            />
                        )}
                    </div>
                    {/* <div className="absolute bottom-0 left-0 w-full">
                        <div className="text-white text-sm text-right p-1">
                            {currentPageNumber}/{totalPageNumer}
                        </div>
                        <div>
                            <ProgressBar progress={currentPageNumber/totalPageNumer} />
                        </div>
                    </div> */}
                </div>
                <div ref={leftPanelRef} className="absolute -left-full h-full w-80 bg-neutral-800">
                    <div className="w-full h-full overflow-y-auto overflow-x-hidden">
                        {toc.length == 0 ? (
                            <div className="text-white text-center p-4">No Items</div>
                        ) : (
                            <Accordian item={{ isRoot: true, subitems: toc }} onClick={tocItemClickHandler}/>
                        )}
                    </div>
                </div>
                <div ref={rightPanelRef} className="absolute -right-full h-full w-80 bg-neutral-800">
                    {activeRightPanel == RightPanel.bookmarkPanel && <div>bookmark</div>}
                    {activeRightPanel == RightPanel.settingsPanel && <div>settings</div>}
                </div>
            </div>
        </div>
    );
};

export default Reader;

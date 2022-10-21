import Epub from "epubjs";
import { useEffect, useState } from "react";

const EPUB_RENDER_VIEW = "EPUB_RENDER_VIEW" ;

const EpubReader = ({file,setToc,setTocItemClickHandler,setCurrentPageNumber,setTotalPageNumer}) => {

    const [rendition, setRendition] = useState(null);

    useEffect(()=>{
        let fileURL = URL.createObjectURL(file);
        let book = Epub(fileURL,{openAs:"epub"});
        book.ready.then(()=>{
            let _rendition = book.renderTo(EPUB_RENDER_VIEW, { 
                width : "100%",
                height: "100%",
                overflow : "hidden auto",
                stylesheet : {
                    background : "red"
                },
                flow: "scrolled-doc" 
            });
            let displayed = _rendition.display();
            console.log({book,_rendition})
            setRendition(_rendition);    
        });
    },[file])

    function onTocItemClick(tocItem){
        if(!rendition) return;
        rendition.display(tocItem.href)
    }

    useEffect(()=>{
        if(!rendition) return;
        setTotalPageNumer(100);
        
        function handleKeyDown(e){
            switch(e.key){
                case "ArrowRight" : rendition.next(); break ;
                case "ArrowLeft"  : rendition.prev(); break ;
            }
        }

        rendition.book.loaded.navigation.then((nav)=>{
            console.log({nav});
            setToc(nav.toc);
            setTocItemClickHandler(()=>onTocItemClick);
        });

        // rendition.book.ready.then(()=>{
        //     var key = rendition.book.key()+'-locations';
		// 	var stored = localStorage.getItem(key);
		// 	if (stored) {
        //         console.log("Loaded")
		// 		 return rendition.book.locations.load(stored);
		// 	} else {
        //         console.log("generated")
		// 		return rendition.book.locations.generate(200);
		// 	}
        // })
        // .then(locations=>{
        //     rendition.on('relocated', function(location){
        //         console.log(location);
        //         var percent = rendition.book.locations.percentageFromCfi(location.start.cfi);
        //         var percentage = Math.floor(percent * 100);
        //         setCurrentPageNumber(percentage);
        //     });

        //     localStorage.setItem(rendition.book.key()+'-locations', rendition.book.locations.save());
        // });
        
        rendition.on("rendered",(sec,iframe)=>{
            iframe.document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove());
            iframe.document.querySelectorAll('[class],[id]').forEach(item => {item.setAttribute("class","");item.setAttribute("id","")});
            iframe.document.querySelectorAll('a:not([href]').forEach(item => {
                let p = document.createElement("p");
                p.textContent = item.textContent ;
                item.parentNode.replaceChild(p, item);
            })
            var cssLink = document.createElement("link");
            cssLink.href = "../markdown.css"; 
            cssLink.rel = "stylesheet"; 
            cssLink.type = "text/css";
            iframe.document.head.appendChild(cssLink);
        });
        rendition.on("keydown",handleKeyDown);
        window.addEventListener("keydown",handleKeyDown);
        return ()=>{
            rendition.off("keydown",handleKeyDown)
            window.removeEventListener("keydown",handleKeyDown)
        }
    },[rendition])

    return (
        <div id={EPUB_RENDER_VIEW} tabIndex="0" className="w-full h-full relative"></div>
    );
};

export default EpubReader;

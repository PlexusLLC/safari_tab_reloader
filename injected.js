safari.self.addEventListener("message", handleMessage, false);

// alas, can't use these function because reloading the page is async and
// we can't easily know when the page has finished reloading without blocking
// it would be nice if apple would let me put a little img on the tab.
// it would be a tasteful little red dot on the right-hand side...

function setTitleUnread() {
    // if not already, prepend title with [*]
    myTitle = document.title;
    if (! (myTitle.substr(0,4) == "[*] "))
        document.title = "[*] " + myTitle;
    }

function setTitleRead() {
    // if title begins [*], get rid of it
    myTitle = document.title;
    if (myTitle.substr(0,4) == "[*] ")
        document.title = myTitle.substr(4,myTitle.length);
    }

function handleMessage(msgEvent) {

    switch (msgEvent.name) {

        case "setTitleUnread":
            setTitleUnread();
            break;

        case "setTitleRead":
            setTitleRead();
            break;
    } // switch
} // handleMessage

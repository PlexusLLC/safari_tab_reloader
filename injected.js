// here we have a bit of a hack to put an indication on the tab of it being unread.
// it would be nice if apple, would let us play with the chrome of the tabs so i could put a little img on it.
// it would be a tasteful little green diamond on the right-hand side...

if (window.top === window)
    safari.self.addEventListener("message", handleMessage, false);

function handleMessage(msgEvent) {
    // don't run in anything other than the main page
    if (window !== window.top) return;

    switch (msgEvent.name) {

        case "setTitle":
            document.title = msgEvent.message;
            break;
    } // switch
} // handleMessage

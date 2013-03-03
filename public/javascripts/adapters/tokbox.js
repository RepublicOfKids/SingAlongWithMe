/*****************
 Constants
 *****************/

var TOKBOX_API_KEY    = '22954922';
var TOKBOX_SESSION_ID = '1_MX4yMTgwNTk0Mn5-U2F0IEZlYiAxNiAyMzo1NzowNSBQU1QgMjAxM34wLjM3NzU3MzY3fg';
var TOKBOX_TOKEN      = 'T1==cGFydG5lcl9pZD0yMTgwNTk0MiZzaWc9ZTdmNTNmMDgzODI0MmFiZGY4MGE2OTJmODcxMmY4MmUwMGZiMGMzMTpzZXNzaW9uX2lkPTFfTVg0eU1UZ3dOVGswTW41LVUyRjBJRVpsWWlBeE5pQXlNem8xTnpvd05TQlFVMVFnTWpBeE0zNHdMak0zTnpVM016WTNmZyZjcmVhdGVfdGltZT0xMzYxMDg3ODI2JmV4cGlyZV90aW1lPTEzNjExNzQyMjYmcm9sZT1wdWJsaXNoZXImbm9uY2U9Njc2MzI2';
var publisher;

/*****************
 Functions
 *****************/

function sessionConnectedHandler(event) {
    publisher = TB.initPublisher(TOKBOX_API_KEY, 'myPublisherDiv');
    session.publish(publisher);

    // Subscribe to streams that were in the session when we connected
    subscribeToStreams(event.streams);
}

function streamCreatedHandler(event) {
    // Subscribe to any new streams that are created
    subscribeToStreams(event.streams);
}

function subscribeToStreams(streams) {
    for (var i = 0; i < streams.length; i++) {
        // Make sure we don't subscribe to ourself
        if (streams[i].connection.connectionId == session.connection.connectionId) {
	    return;
        }

        // Create the div to put the subscriber element in to
        var div = document.createElement('div');
        div.setAttribute('id', 'stream' + streams[i].streamId);
        document.body.appendChild(div);

        // Subscribe to the stream
        session.subscribe(streams[i], div.id);
    }
}

function sessionConnectedHandler(event) {
    // Put my webcam in a div
    var publishProps = {height:240, width:320};
    publisher = TB.initPublisher(TOKBOX_API_KEY, 'myPublisherDiv', publishProps);
    // Send my stream to the session
    session.publish(publisher);
}
# wc-conduit: RealWorld Conduit Client based on mg-webComponents
 
Rob Tweed <rtweed@mgateway.com>
21 October 2020, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

Twitter: @rtweed

Google Group for discussions, support, advice etc: [http://groups.google.co.uk/group/enterprise-web-developer-community](http://groups.google.co.uk/group/enterprise-web-developer-community)


# About *wc-conduit*

*wc-conduit* is a web browser client for the 
  [RealWorld Conduit](https://medium.com/@ericsimons/introducing-realworld-6016654d36b5)
  application, built using the [mg-webComponents](https://github.com/robtweed/mg-webComponents)
  framework.

It is compatible with any and all of the 
[Conduit back-ends](https://github.com/gothinkster/realworld#backends).

It also supports the optional, alternative WebSocket API interfaces provided by
the [*qewd-conduit*](https://github.com/robtweed/qewd-conduit) back-end


# Installing *wc-conduit*

Unlike most of the other 
[RealWorld front ends](https://github.com/gothinkster/realworld#frontends),
*wc-conduit* does not require any build/bundling step, and can be
used straight of the box.  It's just a matter of copying and moving
files into the correct place on your web server.

## Clone the *wc-conduit* Repository

The first step is to clone this repository to a folder of your
choice on your server, eg:

        git clone https://github.com/robtweed/wc-conduit

In the cloned folder (eg *~/wc-conduit*) you'll find the
following sub-folder structure:

        ~/wc-conduit
           |
           |- conduit-wc
           |     |
           |     |- index.html
           |     |
           |     |- index-ws.html
           |     |
           |     |- js
           |        |
           |        |- app.js
           |        |
           |        |- app-ws.js
           |        |
           |        |- userSettings.js
           |        |
           |        |- ..etc
           |
           |- components
           |     |
           |     |- conduit
           |          |
           }          |- js
           |          |  |
           |          |  |- ...etc
           |          |
           }          |- components
           |             |
           |             |- ...etc
 

## Locate the Destination Folder

The files you cloned need to be moved/copied to your
web server's home/root directory.

Locate your web server's root folder (ie the folder it uses
as the home/root URL), eg:

        /usr/share/nginx/html

         or

        /var/www


If you're using a QEWD Server, its web server root folder is the *www* folder
under the QEWD installation directory, eg:

        ~/qewd/www


## Copy/Move the Files to the Web Server

Copy/move the entire cloned directory to the web server's
root/home directory.

**NOTE:** be careful if you're copying/moving to a QEWD Server which 
will already have a */www/components* directory. You don't want to 
accidently delete its existing contents in the process!

The Web Server folder structure (excluding anything it previously
contained) will now look like this:

        /var/www  (or whatever the web server root directory is)
           |
           |- conduit-wc
           |     |
           |     |- index.html
           |     |
           |     |- index-ws.html
           |     |
           |     |- js
           |        |
           |        |- app.js
           |        |
           |        |- app-ws.js
           |        |
           |        |- userSettings.js
           |        |
           |        |- ..etc
           |
           |- components
           |     |
           |     |- conduit
           |          |
           }          |- js
           |          |  |
           |          |  |- ...etc
           |          |
           }          |- components
           |             |
           |             |- ...etc



## Clone and Install the *mg-webComponents* Module

Finally you need to install a copy of the *mg-webComponents*
module.

First, clone the repository to a folder of your choice eg:

        cd ~
        git clone https://github.com/robtweed/mg-webComponents

Within the folder it created (eg ~/mg-webComponents in the
above example), you'll see a file named:

        mg-webComponents.js

Move/copy this file to you web server's root/home folder,
which should now contain:

        /var/www  (or whatever the web server root directory is)
           |
           |- conduit-wc
           |     |
           |     |- index.html
           |     |
           |     |- index-ws.html
           |     |
           |     |- js
           |        |
           |        |- app.js
           |        |
           |        |- app-ws.js
           |        |
           |        |- userSettings.js
           |        |
           |        |- ..etc
           |
           |- components
           |     |
           |     |- conduit
           |          |
           }          |- js
           |          |  |
           |          |  |- ...etc
           |          |
           }          |- components
           |             |
           |             |- ...etc
           |
           |
           |- mg-webComponents.js


# Configure *wc-conduit*

There are basically two configuration settings you need to
decide on:

- the location of the RealWorld Conduit back-end.  This can
be either locally on the same web server as you installed
*wc-conduit*, or on a remote server, eg the Conduit
demo/reference back-end at:

        https://conduit.productionready.io


  By default, *wc-conduit* will assume you're using a
local back-end.

- a default image URL to use for user profiles that don't
or haven't yet specified an image URL.  By default,
*wc-conduit* will use the image at:

        https://static.productionready.io/images/smiley-cyrus.jpg

To change these settings, find the *userSettings* file under
your web server's root/home directory at:

        /conduit-wc/js/userSettings.js

Simply edit the *host* and/or *defaultImage* property values
within this file and save your changes.


# Running *wc-conduit*

You're now ready to run *wc-conduit*.  In a browser, enter 
the URL:

        http://xx.xx.xx.xx/conduit-wc

Replace *xx.xx.xx.xx* with the IP address/domain name and,
if required, listener port of your Web Server.

You'll now see the normal, expected user interface for the
RealWorld Conduit application.


# Running *wc-conduit* using WebSocket APIs

If you are using the [*qewd-conduit*](https://github.com/robtweed/qewd-conduit)
back-end, you can try out its alternative WebSocket API interface.

In a browser, enter the URL:

        http://xx.xx.xx.xx/conduit-wc/index-ws.html

Replace *xx.xx.xx.xx* with the IP address/domain name and,
if required, listener port of your Web Server.

You'll see the normal, expected user interface of a RealWorld
Front-end, but now all the communication with the back-end is
using WebSocket messages.  This interfacing makes use of
the secure WebSocket messaging interface that is built into
[QEWD](https://github.com/robtweed/qewd), 
the Node.js framework used by *qewd-conduit*.

The key differences between the two versions of the *wc-conduit*
front end are as follows:

- the REST version uses:
  - */www/conduit-wc/index.html* as its web page.
  - */www/conduit-wc/js/app.js* as its loader module.
  - */www/conduit-wc/js/apis-rest.js* for all its REST communication with the back-end

- the WebSocket version uses:
  - */www/conduit-wc/index-ws.html* as its web page.
  - */www/conduit-wc/js/app-ws.js* as its loader module.  You'll notice that
this loads and starts the [*QEWD-Client*](https://github.com/robtweed/qewd-client)
module, which establishes and maintains the WebSocket connection to the *qewd-conduit*
back-end
  - */www/conduit-wc/js/apis-websockets.js* for all its WebSocket communication with the back-end.
You'll see that all the WebSocket messages emulate the structure and packaging of the payloads
used by the equivalent REST APIs.


# Some Information about the Architecture

You'll notice that everything needed by *wc-conduit* is
loaded lazily direct from your web server, as and when
needed.  It's a very fast and lightweight implementation compared
with most others.  It makes use of the WebComponent support
that is now built-in to most modern browsers, and therefore doesn't
need any other heavy-weight framework such as React or Vue.

The *mg-webComponents* module that augments the use of
WebComponents is really very small, and otherwise you'll
find that the entire functionality of the front-end
is defined within the WebComponents in the
*/components/conduit/components* folder.

It's also been implemented as a Single Page Application, and
it minimises the number of round-trips to the back-end for
data.

Feel free to poke around within its internal logic!


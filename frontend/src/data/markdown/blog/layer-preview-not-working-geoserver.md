I encountered this problem when running Geoserver on my local machine with Java version 17. As the documentation states, though in a not very direct way for non-native English speakers, all you need to do is go to your directory where Geoserver is installed and delete a file called marlin-0.9.3.jar.

It is located in the Geoserver directory (eg. C:\Program Files\GeoServer)  and in the following location 

`\webapps\geoserver\WEB-INF\lib\marlin-0.9.3.jar`
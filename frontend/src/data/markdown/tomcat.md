This happens at time when you have installed a java runtime version greater than 11. The tomcat server start script that tries to locate the java location does not include the java runtime version that is running on your Ubuntu installation. The error line should show you the location of the start script that failed. It might look as below;

`Process: 9728 ExecStart=/bin/sh /usr/libexec/tomcat9/tomcat-start.sh  (code=exited, status=1/FAILURE)`

If you open that file, the `tomcat-start.sh` with a text editor such as nano, you'll notice there a line that tries to locate the java runtime. It is might look as below

<Code language="shell">
    /# Find the Java runtime and set JAVA_HOME
    . /usr/libexec/tomcat9/tomcat-locate-java.sh
</Code>

This `tomcat-locate-java.sh` is the file we want to edit. Open it in a text editor such as nano.

Add your java version in the code where it lists the java version. In this case, let us add a java-17 runtime that was installed using the opejdk. In the code below we add `17` just before `11`.

<Code language="shell">
    do
        for java_version in 17 11 10 9 8
</Code>

Then in the loop where it loops through possible java directories, add the correct wildcard that matches your java. We add below java 17 installed through the openjdk project.

<Code language="shell">
    for jvmdir in ..................
                /usr/lib/jvm/java-${java-version}-openjdk-* \
</Code>

The above line was added since my installed java runtime was `java-17-openjdk-amd64`. You see your runtime or java installation by running the command `which java` on a  terminal.

You can then restart the tomcat service.
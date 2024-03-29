[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/kubesphere/s2i-nodejs-container)

NodeJS container images
====================

This repository contains the source for building various versions of
the Node.JS application as a reproducible container image using
[source-to-image](https://github.com/kubesphere/s2ioperator).
Users can choose between RHEL and CentOS based builder images.
The resulting image can be run using [Docker](http://docker.io).

Versions
---------------
Node.JS versions currently provided are:
* [NodeJS 6](6)
* [NodeJS 8](8)

RHEL versions currently supported are:
* RHEL7

CentOS versions currently supported are:
* CentOS7


Installation
---------------
To build a Node.JS image, choose either the CentOS or RHEL based image:

*  **CentOS based image**

    This image is available on DockerHub. To download it run:

    ```
    $ docker pull kubespheredev/nodejs-8-centos7
    ```

    To build a Node.JS image from scratch run:

    ```
    $ git clone --recursive https://github.com/kubesphere/s2i-nodejs-container.git
    $ cd s2i-nodejs-container
    $ git submodule update --init
    $ make build TARGET=centos7 VERSIONS=8
    ```

**Notice: By omitting the `VERSIONS` parameter, the build/test action will be performed
on all provided versions of Node.JS.**


Usage
---------------------------------

For information about usage of Dockerfile for NodeJS 6,
see [usage documentation](6/README.md).
For information about usage of Dockerfile for NodeJS 8,
see [usage documentation](8/README.md).

Test
---------------------
This repository also provides a [S2I](https://github.com/kubesphere/s2ioperator) test framework,
which launches tests to check functionality of a simple Node.JS application built on top of the s2i-nodejs image.

Users can choose between testing a Node.JS test application based on a RHEL or CentOS image.

*  **RHEL based image**

    To test a RHEL7 based Node.JS image, you need to run the test on a properly
    subscribed RHEL machine.

    ```
    $ cd s2i-nodejs-container
    $ git submodule update --init
    $ make test TARGET=rhel7 VERSIONS=8
    ```

*  **CentOS based image**

    ```
    $ cd s2i-nodejs-container
    $ git submodule update --init
    $ make test TARGET=centos7 VERSIONS=8
    ```

**Notice: By omitting the `VERSIONS` parameter, the build/test action will be performed
on all provided versions of Node.JS.**


Repository organization
------------------------
* **`<nodejs-version>`**

    * **Dockerfile**

        CentOS based Dockerfile.

    * **Dockerfile.rhel7**

        RHEL based Dockerfile. In order to perform build or test actions on this
        Dockerfile you need to run the action on a properly subscribed RHEL machine.

    * **`s2i/bin/`**

        This folder contains scripts that are run by [S2I](https://github.com/kubesphere/s2ioperator):

        *   **assemble**

            Used to install the sources into the location where the application
            will be run and prepare the application for deployment (eg. installing
            modules using npm, etc.)

        *   **run**

            This script is responsible for running the application, by using the
            application web server.

        *   **usage***

            This script prints the usage of this image.

    * **`contrib/`**

        This folder contains a file with commonly used modules.

    * **`test/`**

        This folder contains the [S2I](https://github.com/kubesphere/s2ioperator)
        test framework with simple Node.JS echo server.

        * **`test-app/`**

            A simple Node.JS echo server used for testing purposes by the [S2I](https://github.com/kubesphere/s2ioperator) test framework.

        * **run**

            This script runs the [S2I](https://github.com/kubesphere/s2ioperator) test framework.


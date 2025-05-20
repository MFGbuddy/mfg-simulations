# Install script for directory: /Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/Users/aniruddha/Desktop/iiot-sim/target/debug/build/paho-mqtt-sys-9e26a251b8aecd03/out")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "Debug")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

# Set path to fallback-tool for dependency-resolution.
if(NOT DEFINED CMAKE_OBJDUMP)
  set(CMAKE_OBJDUMP "/usr/bin/objdump")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/doc/Eclipse Paho C/samples" TYPE FILE FILES
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/src/samples/MQTTAsync_publish.c"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/src/samples/MQTTAsync_publish_time.c"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/src/samples/MQTTAsync_subscribe.c"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/src/samples/MQTTClient_publish.c"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/src/samples/MQTTClient_publish_async.c"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/src/samples/MQTTClient_subscribe.c"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/src/samples/paho_c_pub.c"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/src/samples/paho_c_sub.c"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/src/samples/paho_cs_pub.c"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/src/samples/paho_cs_sub.c"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/src/samples/pubsub_opts.c"
    )
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/doc/Eclipse Paho C" TYPE FILE FILES
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/CONTRIBUTING.md"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/epl-v20"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/edl-v10"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/README.md"
    "/Users/aniruddha/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/paho-mqtt-sys-0.10.3/paho.mqtt.c/notice.html"
    )
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  # Include the install script for each subdirectory.
  include("/Users/aniruddha/Desktop/iiot-sim/target/debug/build/paho-mqtt-sys-9e26a251b8aecd03/out/build/src/cmake_install.cmake")

endif()

string(REPLACE ";" "\n" CMAKE_INSTALL_MANIFEST_CONTENT
       "${CMAKE_INSTALL_MANIFEST_FILES}")
if(CMAKE_INSTALL_LOCAL_ONLY)
  file(WRITE "/Users/aniruddha/Desktop/iiot-sim/target/debug/build/paho-mqtt-sys-9e26a251b8aecd03/out/build/install_local_manifest.txt"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")
endif()
if(CMAKE_INSTALL_COMPONENT)
  if(CMAKE_INSTALL_COMPONENT MATCHES "^[a-zA-Z0-9_.+-]+$")
    set(CMAKE_INSTALL_MANIFEST "install_manifest_${CMAKE_INSTALL_COMPONENT}.txt")
  else()
    string(MD5 CMAKE_INST_COMP_HASH "${CMAKE_INSTALL_COMPONENT}")
    set(CMAKE_INSTALL_MANIFEST "install_manifest_${CMAKE_INST_COMP_HASH}.txt")
    unset(CMAKE_INST_COMP_HASH)
  endif()
else()
  set(CMAKE_INSTALL_MANIFEST "install_manifest.txt")
endif()

if(NOT CMAKE_INSTALL_LOCAL_ONLY)
  file(WRITE "/Users/aniruddha/Desktop/iiot-sim/target/debug/build/paho-mqtt-sys-9e26a251b8aecd03/out/build/${CMAKE_INSTALL_MANIFEST}"
     "${CMAKE_INSTALL_MANIFEST_CONTENT}")
endif()

#!/bin/sh

clear && cd helm && \
helm upgrade uplights . \
--install \
--namespace uplights \
-f values/test.yaml
# --create-namespace

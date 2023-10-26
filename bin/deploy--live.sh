#!/bin/sh

clear && cd helm && \
helm upgrade uplights . \
--install \
--namespace uplights \
-f values/live.yaml
# --create-namespace

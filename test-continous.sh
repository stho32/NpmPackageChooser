#!/bin/bash
cd Source/
while true; do
    clear
    mocha Tests --recursive
    sleep 5
done
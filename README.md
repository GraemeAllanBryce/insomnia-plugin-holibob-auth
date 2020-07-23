# HOLIBOB Authentication Plugin

This plugin enables HMAC based authentication for various requests based on the URL being called.

## Installation
The plugin must be placed in the plugins folder referenced by Insomnia

## Bokun

All requests to api.bokun.is

headers will be added for 

X-Bukun-Date
X-Bokun-AccessKey
X-Bokun-Signature

Environment variables must be present for 

bokunAccessKey
bokunSecret

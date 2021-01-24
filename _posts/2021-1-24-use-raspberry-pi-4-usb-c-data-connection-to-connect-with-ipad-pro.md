---
title: Use Raspberry Pi 4 USB-C data connection to connect with iPad Pro
date: '2021-01-24T22:57:59.365Z'
tags:
- ipad
- rpi
- zettel
- zettelkasten
- raspberry pi
---
## Turn on SSH and VNC

Click the Raspberry Pi menu icon and choose Preferences > Raspberry Pi Configuration. Click Interfaces and set both SSH and VNC to Enabled. Click OK to close the Raspberry Pi Configuration tool.


## Adjust config

Now you need to adjust the resolution and ensure that dtoverlay=dwc2 is at the end of your config.txt file.
```sh
sudo nano /boot/config.txt
```

Uncomment both framebuffer lines (remove the # before them) and change the resolution to 1024×768.
```sh
framebuffer_width=1024
framebuffer_height=768
```

Head to the end of the config.txt file and ensure that dtoverlay=dwc2 is present:
```sh
[all]
dtoverlay=dwc2
```

Save and close the config.txt file with CTRL+O, then CTRL+X.


## Adjust cmdline

Open the cmdline.txt file:

sudo nano /boot/cmdline.txt
Add a new line below console=serial0, … and add the following:
```sh
modules-load=dwc2
```

## Adjust modules

Next, we adjust the modules file:
```sh
sudo vim /etc/modules
```

Add this command to the end:
```sh
libcomposite
```

Save and close.


## Fix the IP address

Now we need to prevent Raspberry Pi from choosing its internet address. Edit the dhcpcd.conf file:
```sh
sudo vim /etc/dhcpcd.conf
```

Add this to the end of the file: `denyinterfaces usb0`


## Choose an IP range

Install dnsmasq:
```sh
sudo apt install dnsmasq -y
```

Now create a usb file:
```sh
sudo nano /etc/dnsmasq.d/usb
```

And place the following script in it:
```sh
interface=usb0
dhcp-range=10.55.0.2,10.55.0.6,255.255.255.248,1h
dhcp-option=3
leasefile-ro
```

## Choose an address

Now it’s time to pick a static IP address. This can be used to connect to Raspberry Pi from the iPad Pro.
```sh
sudo nano /etc/network/interfaces.d/usb0 
```

And add the following script:
```sh
auto usb0
allow-hotplug usb0
iface usb0 inet static
  address 10.55.0.1
  netmask 255.255.255.248
```

Save and close the file. Our IP address is 10.55.0.1. We will use this (or raspberrypi.local) to SSH and VNC into Raspberry Pi.


## Copy and pate the usb.sh script

Now we need to download and run the usb.sh script on our Raspberry Pi.

```sh
#!/bin/bash
cd /sys/kernel/config/usb_gadget/
mkdir -p pi4
cd pi4
echo 0x1d6b > idVendor # Linux Foundation
echo 0x0104 > idProduct # Multifunction Composite Gadget
echo 0x0100 > bcdDevice # v1.0.0
echo 0x0200 > bcdUSB # USB2
echo 0xEF > bDeviceClass
echo 0x02 > bDeviceSubClass
echo 0x01 > bDeviceProtocol
mkdir -p strings/0x409
echo "fedcba9876543211" > strings/0x409/serialnumber
echo "Ben Hardill" > strings/0x409/manufacturer
echo "PI4 USB Device" > strings/0x409/product
mkdir -p configs/c.1/strings/0x409
echo "Config 1: ECM network" > configs/c.1/strings/0x409/configuration
echo 250 > configs/c.1/MaxPower
# Add functions here
# see gadget configurations below
# End functions
mkdir -p functions/ecm.usb0
HOST="00:dc:c8:f7:75:14" # "HostPC"
SELF="00:dd:dc:eb:6d:a1" # "BadUSB"
echo $HOST > functions/ecm.usb0/host_addr
echo $SELF > functions/ecm.usb0/dev_addr
ln -s functions/ecm.usb0 configs/c.1/
udevadm settle -t 5 || :
ls /sys/class/udc > UDC
ifup usb0
service dnsmasq restart
```
Now make the usb.sh file executable with: sudo chmod +x /root/usb.sh


## Run the script at launch

We’re going ensure the usb.sh script runs when we boot up Raspberry Pi, to ensure we can always access it. Use crontab:
```sh
sudo crontab -e

Add the following line to the end of crontab.
```sh
@reboot bash /root/usb.sh
```

Save and exit.


## Swap to iPad

Shut down Raspberry Pi:
```sh
sudo shutdown -h now
```

Disconnect Raspberry Pi from the power source and connect the USB-C cable to your iPad Pro. It’s a good idea to keep the screen connected while you test everything is working. Not all USB-C cables work, and we didn’t get it to work with the Apple USB-C cable. We’re using an Anker cable. It should reboot as normal (with the screen resolution size from earlier).


## Check the connection

If all is working correctly, you will see your Raspberry Pi as a new Ethernet connection in iPadOS’s Settings app.

You should see a new option, Ethernet, beneath WiFi. Click it to see ‘Pi4 USB Device‘. Click Pi4 and you will see the Pi4 USB Device settings.

You’re now ready to use SSH and VNC to access Raspberry Pi from your iPad Pro.
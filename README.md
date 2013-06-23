znc Cookbook
==============
Install/Configure ZNC IRC bouncer.

Requirements
------------

[runit](https://github.com/cookbooks/runit)

Attributes
----------
default['znc']['data_dir'] = '/etc/znc'
default['znc']['user'] = 'znc'
default['znc']['group'] = 'znc'

default['znc']['conf_dir']        = "#{znc['data_dir']}/configs"
default['znc']['log_dir']         = "#{znc['data_dir']}/moddata/adminlog"
default['znc']['module_dir']      = "#{znc['data_dir']}/modules"
default['znc']['users_dir']       = "#{znc['data_dir']}/users"

default['znc']['port']            = "+7777"
default['znc']['max_buffer_size'] = 500
default['znc']['modules']         = %w{ webadmin adminlog }

Usage
-----
```
$ vagrant up
```
###webadmin
Open browser link to https://localhost:5487 
use g0vznc:g0vznc login

###irc connect
Open irc client link to localhost:5487
/quote PASS g0vznc:g0vznc

Contributing
------------

License and Authors
-------------------
Authors: Yuan Hsiang Cheng (lyforever62@hotmail.com) 
